# Mega Whip | Catálogo Digital & APIs

Solução completa desenvolvida para a **Mega Whip Chicotes Elétricos** ([megawhip.com.br](https://megawhip.com.br/)), estruturada em **Monorepo**:
- **Frontend (`/client`)**: Catálogo interativo desenvolvido em **Vite + React + TypeScript** com Vanilla CSS moderno e design system na paleta oficial da empresa.
- **Backend / APIs (`/api`)**: Endpoints desenvolvidos em **Next.js (App Router) + TypeScript** para consulta, filtragem taxonômica, paginação e geração de cotação direta para o WhatsApp comercial.

---

## 🎨 Paleta de Cores e Identidade Visual Mega Whip
- **Verde Mega (Principal):** `#6BB345`
- **Verde Destaque / Glow:** `#7CD450` / `rgba(107, 179, 69, 0.28)`
- **Alerta / Pré-Venda:** `#BE1313`
- **Fundo Industrial (Dark):** `#0B0F14` & `#131A22`
- **Bordas & Superfícies:** `#222E3C` & `#1F2A38`
- **Tipografia:** `Montserrat` (títulos e destaques técnicos) e `Inter` (leitura e especificações)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 20+)
- npm instalado

### 0. Instalar as Dependências (Primeira vez)
Na raiz do projeto (`megawhip`):
```bash
npm run install:all
```
*(ou instale manualmente com `npm --prefix api install` e `npm --prefix client install`)*

### 1. Iniciar Tudo com Um Único Comando (API + Catálogo)
Na raiz do projeto (`megawhip`):
```bash
npm run dev
```
Isso iniciará:
- **API Next.js**: `http://localhost:3000`
- **Catálogo Vite**: `http://localhost:5173` (com proxy automático configurado para `/api`)

### 2. Executar Separadamente

**Para rodar apenas o Catálogo (Vite):**
```bash
npm run dev:client
```
ou dentro da pasta `client`:
```bash
cd client
npm run dev
```

**Para rodar apenas as APIs (Next.js):**
```bash
npm run dev:api
```
ou dentro da pasta `api`:
```bash
cd api
npm run dev
```

---

## 📡 Endpoints da API Next.js (`/api`)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/products` | Lista chicotes com busca (`?search=`), filtros (`?maquina=`, `?modelo=`, `?aplicacao=`, `?tag=`), ordenação e paginação. |
| `GET` | `/api/products/:id` | Detalhes completos do chicote, especificações ISO 6722-1 e produtos relacionados. |
| `GET` | `/api/filters` | Contagem dinâmica de categorias (Máquinas, Modelos compatíveis, Aplicações e Status). |
| `POST` | `/api/quote` | Recebe lista de múltiplos chicotes para cotação e gera mensagem formatada direta para o WhatsApp da fábrica. |

---

## 🛠️ Recursos do Catálogo Frontend (Vite)
1. **Busca Rápida Inteligente**: Pesquisa simultânea por Part Number original (ex: `AXT22357`, `RE594655`), Código Mega Whip (ex: `76.100.183`), Máquina ou Modelo.
2. **Filtros Taxonômicos**: Filtros por Máquinas Agrícolas (Colhedoras de cana, Tratores, Pulverizadores, Plantadeiras), Modelos e Aplicações.
3. **Badges Oficiais**: Destaque visual para "Lançamento" e "Pré-venda".
4. **Ficha Técnica & Galeria com Zoom**: Modal completo com visualização de chicotes e normas de fabricação.
5. **Carrinho de Cotação Multi-Itens**: O cliente corporativo ou usina pode selecionar vários chicotes e disparar a cotação consolidada para o WhatsApp comercial da Mega Whip.
6. **Design Responsivo & Alta Performance**: Totalmente adaptável para celulares, tablets e desktops.
