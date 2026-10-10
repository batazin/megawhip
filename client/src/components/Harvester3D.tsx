import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, Sparkles, Loader2 } from 'lucide-react';
import type { HarvesterHotspot } from '../types/harvester';
import { HARVESTER_HOTSPOTS } from '../types/harvester';

interface Harvester3DProps {
  machineType?: 'cana' | 'graos';
  selectedSpotId: string;
  onSelectSpot: (spot: HarvesterHotspot) => void;
}

export const Harvester3D: React.FC<Harvester3DProps> = ({
  selectedSpotId,
  onSelectSpot,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeXRay, setWireframeXRay] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetLookAt = useRef(new THREE.Vector3(0.2, 1.8, 0));
  const targetCamPos = useRef(new THREE.Vector3(7.8, 3.8, 6.8));
  const isTransitioningCam = useRef(false);

  // References for dynamic animated conduit materials
  const conduitMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Focus camera smoothly on spot
  const focusOnSpot = useCallback((spot: HarvesterHotspot) => {
    const [tx, ty, tz] = spot.position3D;
    targetLookAt.current.set(tx, ty, tz);

    let camOffset = new THREE.Vector3(2.6, 1.6, 3.2);
    if (spot.id === 'corte-base') {
      camOffset = new THREE.Vector3(3.2, 1.4, 2.8);
    } else if (spot.id === 'chassi-dianteiro') {
      camOffset = new THREE.Vector3(2.4, 1.2, 2.6);
    } else if (spot.id === 'bloco-motor') {
      camOffset = new THREE.Vector3(-2.4, 2.0, 2.8);
    } else if (spot.id === 'elevador-descarga') {
      camOffset = new THREE.Vector3(-2.8, 2.2, -3.4);
    } else if (spot.id === 'estrutura-esquerda') {
      camOffset = new THREE.Vector3(1.6, 1.4, 3.2);
    } else if (spot.id === 'caixa-fusiveis') {
      camOffset = new THREE.Vector3(2.2, 1.6, 2.2);
    }

    targetCamPos.current.copy(new THREE.Vector3(tx, ty, tz).add(camOffset));
    isTransitioningCam.current = true;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. RENDERER & SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');

    const width = container.clientWidth || 760;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(7.8, 3.8, 6.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. HDR ENVIRONMENT FOR REALISTIC METALLIC REFLECTIONS ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;

    // --- 3. ORBIT CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't clip under ground
    controls.minDistance = 3.5;
    controls.maxDistance = 18;
    controls.target.set(0.2, 1.8, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // --- 4. STUDIO LIGHTING RIG ---
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    keyLight.position.set(12, 16, 12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xF1F5F9, 1.2);
    fillLight.position.set(-12, 10, -8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x6BB345, 0.4);
    rimLight.position.set(0, 8, -12);
    scene.add(rimLight);

    const ambLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    scene.add(ambLight);

    // --- 5. TURNTABLE STAGE & SOFT GROUND SHADOW ---
    const stageGeo = new THREE.CylinderGeometry(8.5, 8.7, 0.14, 64);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.35,
      metalness: 0.15,
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -0.17;
    stageMesh.receiveShadow = true;
    scene.add(stageMesh);

    // Bezel ring around turntable
    const bezelGeo = new THREE.TorusGeometry(8.6, 0.08, 16, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      roughness: 0.25,
      metalness: 0.75,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.rotation.x = Math.PI / 2;
    bezelMesh.position.y = -0.1;
    scene.add(bezelMesh);

    // Ground shadow
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.09;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // --- 6. LOAD REALISTIC COLHEITADEIRA GLB MODEL ---
    const loader = new GLTFLoader();
    const modelUrl = '/models/harvester.glb';

    let harvesterModel: THREE.Group | null = null;

    loader.load(
      modelUrl,
      (gltf) => {
        harvesterModel = gltf.scene;

        // Model was exported in Z-up coordinate system -> rotate to Three.js Y-up
        harvesterModel.rotation.x = -Math.PI / 2;
        // Center the 9m x 10.4m x 4.8m harvester exactly on the stage
        harvesterModel.position.set(-0.75, 0, 0.15);

        // Enhance materials, enable shadows, calibrate transparent glass
        harvesterModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.envMapIntensity = 1.25;

              // Cab glass transparency
              if (
                mesh.name.toLowerCase().includes('cabglass') ||
                mat.name?.toLowerCase().includes('cabglass')
              ) {
                mat.transparent = true;
                mat.opacity = 0.45;
                mat.roughness = 0.08;
                mat.metalness = 0.1;
              }

              // Body paint rich agricultural sheen
              if (
                mat.name?.toLowerCase().includes('body') ||
                mat.name?.toLowerCase().includes('green')
              ) {
                mat.roughness = Math.max(0.2, mat.roughness * 0.85);
              }
            }
          }
        });

        scene.add(harvesterModel);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(progress);
        }
      },
      (error) => {
        console.error('Erro ao carregar modelo GLB:', error);
        setIsLoading(false);
      }
    );

    // --- 7. ELECTRICAL WIRING CONDUITS (MEGA WHIP HARNESS ROUTES) ---
    const matConduit = new THREE.MeshStandardMaterial({
      color: wireframeXRay ? 0x22C55E : 0x111315,
      emissive: wireframeXRay ? 0x16A34A : 0x000000,
      emissiveIntensity: wireframeXRay ? 1.2 : 0.0,
      roughness: 0.35,
      metalness: 0.25,
    });
    conduitMaterialsRef.current = [matConduit];

    const matDeutschOrange = new THREE.MeshStandardMaterial({
      color: 0xEA580C,
      roughness: 0.35,
    });

    const wiringPaths = [
      // 1. Corte-base to Throat
      [
        new THREE.Vector3(3.59, 2.05, 0.15),
        new THREE.Vector3(2.9, 1.9, 0.15),
        new THREE.Vector3(1.80, 1.75, 0.15),
      ],
      // 2. Throat to Cab/CommandARM central box
      [
        new THREE.Vector3(1.80, 1.75, 0.15),
        new THREE.Vector3(1.4, 2.4, 0.15),
        new THREE.Vector3(1.01, 3.25, 0.15),
      ],
      // 3. Central box to Engine Bay
      [
        new THREE.Vector3(1.01, 3.25, 0.15),
        new THREE.Vector3(0.0, 3.1, 0.6),
        new THREE.Vector3(-1.35, 2.9, 1.05),
      ],
      // 4. Central box to Hydraulic Block
      [
        new THREE.Vector3(1.01, 3.25, 0.15),
        new THREE.Vector3(0.3, 2.2, 1.1),
        new THREE.Vector3(-0.35, 1.6, 1.45),
      ],
      // 5. Engine to Unloader Auger Tube
      [
        new THREE.Vector3(-1.35, 2.9, 1.05),
        new THREE.Vector3(-1.9, 3.3, -1.2),
        new THREE.Vector3(-2.62, 3.55, -2.45),
      ],
    ];

    wiringPaths.forEach((pts) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.045, 12, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, matConduit);
      tubeMesh.castShadow = true;
      scene.add(tubeMesh);

      // Deutsch connectors at extremities
      [pts[0], pts[pts.length - 1]].forEach((pos) => {
        const cMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.08), matDeutschOrange);
        cMesh.position.copy(pos);
        scene.add(cMesh);
      });
    });

    // --- 8. 3D HOTSPOT PINS (1 TO 6) WITH ANIMATED PULSE RINGS ---
    const hotspotItems: {
      group: THREE.Group;
      core: THREE.Mesh;
      ring: THREE.Mesh;
      spot: HarvesterHotspot;
    }[] = [];

    HARVESTER_HOTSPOTS.forEach((spot, idx) => {
      const sGroup = new THREE.Group();
      sGroup.position.set(...spot.position3D);

      // Core Sphere
      const coreGeo = new THREE.SphereGeometry(0.2, 20, 20);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x6BB345,
        emissive: 0x367C2B,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.userData = { spot };
      sGroup.add(core);

      // Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.28, 0.42, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6BB345,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      sGroup.add(ring);

      // Number Badge Sprite (1 to 6)
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 128;
      bCanvas.height = 128;
      const bCtx = bCanvas.getContext('2d');
      if (bCtx) {
        bCtx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        bCtx.shadowBlur = 8;
        bCtx.fillStyle = '#0F172A';
        bCtx.beginPath();
        bCtx.arc(64, 64, 48, 0, Math.PI * 2);
        bCtx.fill();

        bCtx.lineWidth = 6;
        bCtx.strokeStyle = '#6BB345';
        bCtx.stroke();

        bCtx.shadowBlur = 0;
        bCtx.fillStyle = '#FFFFFF';
        bCtx.font = 'bold 58px Inter, sans-serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText(String(idx + 1), 64, 66);
      }
      const numSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(bCanvas), depthTest: false })
      );
      numSprite.scale.set(0.52, 0.52, 1);
      numSprite.position.set(0, 0.42, 0);
      sGroup.add(numSprite);

      scene.add(sGroup);
      hotspotItems.push({ group: sGroup, core, ring, spot });
    });

    // --- 9. RAYCASTER TO CLICK ON HOTSPOTS IN 3D ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = hotspotItems.map((h) => h.core);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const clicked = intersects[0].object.userData.spot as HarvesterHotspot;
        if (clicked) {
          onSelectSpot(clicked);
          focusOnSpot(clicked);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // --- 10. ANIMATION LOOP ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera transition (Lerp)
      if (isTransitioningCam.current) {
        camera.position.lerp(targetCamPos.current, 0.08);
        controls.target.lerp(targetLookAt.current, 0.08);

        if (
          camera.position.distanceTo(targetCamPos.current) < 0.05 &&
          controls.target.distanceTo(targetLookAt.current) < 0.05
        ) {
          isTransitioningCam.current = false;
        }
      }

      // Hotspots pulsing animation
      hotspotItems.forEach(({ ring, core, spot }) => {
        const isSelected = spot.id === selectedSpotId;
        const pulse = 1 + Math.sin(elapsed * 4 + spot.position3D[0]) * 0.22;
        ring.scale.set(pulse, pulse, pulse);
        ring.quaternion.copy(camera.quaternion);

        const rMat = ring.material as THREE.MeshBasicMaterial;
        const cMat = core.material as THREE.MeshStandardMaterial;

        if (isSelected) {
          rMat.color.setHex(0x0F172A);
          rMat.opacity = 1.0;
          cMat.emissive.setHex(0x22C55E);
          cMat.emissiveIntensity = 1.5;
        } else {
          rMat.color.setHex(0x6BB345);
          rMat.opacity = 0.75;
          cMat.emissive.setHex(0x367C2B);
          cMat.emissiveIntensity = 0.6;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, [autoRotate, onSelectSpot, focusOnSpot, selectedSpotId, wireframeXRay]);

  // Update controls auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Update conduit wires illumination
  useEffect(() => {
    conduitMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(wireframeXRay ? 0x22C55E : 0x111315);
      mat.emissive.setHex(wireframeXRay ? 0x16A34A : 0x000000);
      mat.emissiveIntensity = wireframeXRay ? 1.2 : 0.0;
    });
  }, [wireframeXRay]);



  // Clean minimal Toolbar
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '560px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'grab',
          background: '#FFFFFF',
        }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            zIndex: 20,
          }}
        >
          <Loader2 size={36} color="#367C2B" className="animate-spin" />
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>
              Carregando Colheitadeira 3D...
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
              Modelo oficial com Plataforma Draper e Fiação Elétrica
            </p>
          </div>
          <div
            style={{
              width: '200px',
              height: '6px',
              background: '#E2E8F0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${loadingProgress || 50}%`,
                height: '100%',
                background: '#367C2B',
                borderRadius: '999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Clean Floating Action Buttons Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {/* Wireframe / Electrical Harness toggle */}
        <button
          type="button"
          onClick={() => setWireframeXRay(!wireframeXRay)}
          title="Destacar chicotes elétricos em modo Raio-X"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: wireframeXRay ? '#F0FDF4' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: wireframeXRay ? '1px solid #16A34A' : '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: wireframeXRay ? '#15803D' : '#334155',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
          }}
        >
          <Sparkles size={14} color={wireframeXRay ? '#16A34A' : '#64748B'} />
          <span>{wireframeXRay ? 'Raio-X Ativo' : 'Iluminar Fiação'}</span>
        </button>

        {/* Auto-Rotation 360 toggle */}
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          title="Alternar rotação contínua da máquina"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#334155',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
          }}
        >
          <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} />
          <span>{autoRotate ? 'Pausar Giro' : 'Girar 360°'}</span>
        </button>
      </div>
    </div>
  );
};

export default Harvester3D;
