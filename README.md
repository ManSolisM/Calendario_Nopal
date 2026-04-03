# 🌵 Control Nopal

App React para gestión de entregas de nopal y cobranza.

## Funcionalidades
- Dashboard con resumen de pendientes/cobrado/cajas
- Nueva entrega (cliente, cajas, precio, recordatorio)
- Lista con filtros: todas / pendientes / pagadas
- Editar y marcar como pagada (con confirmación)
- Calendario mensual con detalle por día
- Gráficas de ganancias semana / 6 meses
- Recordatorios automáticos de cobro
- Datos guardados en localStorage

---

## Instalación local

```bash
git clone https://github.com/TU-USUARIO/Calendario_Nopal.git
cd Calendario_Nopal
npm install
npm run dev
```

---

## Desplegar en GitHub Pages

### 1. Crear repo en GitHub
Ve a github.com/new → nombre: `Calendario_Nopal` → Create repository

### 2. Editar package.json
Cambia `TU-USUARIO` por tu usuario real de GitHub:
```json
"homepage": "https://TU-USUARIO.github.io/Calendario_Nopal"
```

### 3. Subir código
```bash
git init
git add .
git commit -m "🌵 Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/Calendario_Nopal.git
git push -u origin main
```

### 4. Desplegar
```bash
npm run deploy
```

### 5. Activar Pages
GitHub repo → Settings → Pages → Source: rama `gh-pages` → Save

Tu app estará en: `https://TU-USUARIO.github.io/Calendario_Nopal/`

### Actualizar después de cambios
```bash
git add . && git commit -m "cambios" && git push && npm run deploy
```

---

## Stack
- React 19 + React Router v7 + Recharts + CSS Modules + Vite + gh-pages


## Visitar Sitio

- Para visualizar el proyecto

```bash
https://mansolism.github.io/Calendario_Nopal/
```