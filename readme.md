# 📂 Ecosistema de Landings Hispano & Cultural Brain

Este repositorio contiene las **landings estáticas** y recursos asociados para los dominios:
- **hispan.io** → Landing de Hispano + subpáginas
- **culturalbrain.net** → Landing de Cultural Brain + subpáginas
- **culturalbrain.app** → Aplicación PythonAnywhere (fuera de este repo)

---

## 📁 Estructura de Carpetas

```bash
repo-ecosistema-landings/
│
├── hispano/                        # Landing y páginas asociadas a hispan.io
│   ├── landings/                   # HTML de páginas principales
│   │   ├── landing_hispano.html
│   │   ├── landing_hispano_pn.html
│   │   ├── landing_cb_pixel.html   # Cultural Pixel (Culture Sight)
│   │   └── landing_cb_app.html     # App / Platform
│   │
│   └── public/
│       └── resources/              # Recursos estáticos (PDFs, imágenes, docs)
│           ├── whitepaper_*.pdf
│           ├── report_*.pdf
│           └── ...
│
├── culturalbrain/                  # Landing y páginas asociadas a culturalbrain.net
│   ├── landings/
│   │   ├── landing_culturalbrain.html
│   │   ├── landing_cb_about.html
│   │   ├── landing_cb_pricing.html
│   │   └── landing_cb_resources.html
│   │
│   └── public/
│       └── resources/
│           ├── insights_*.pdf
│           ├── playbook_*.pdf
│           └── ...
│
├── .gitignore                      # Ignorar node_modules, cachés, logs
├── vercel.json                     # Configuración de despliegue en Vercel
└── README.md                       # Este documento
```

---

## ⚙️ Archivos Clave

### 1. `vercel.json`
Define cómo Vercel debe servir las rutas:
```json
{
  "version": 2,
  "routes": [
    { "src": "/", "dest": "/hispano/landings/landing_hispano.html" },
    { "src": "/culture-sight", "dest": "/hispano/landings/landing_cb_pixel.html" },
    { "src": "/rkb", "dest": "/hispano/landings/landing_hispano_pn.html" },
    { "src": "/about", "dest": "/culturalbrain/landings/landing_cb_about.html" },
    { "src": "/pricing", "dest": "/culturalbrain/landings/landing_cb_pricing.html" },
    { "src": "/resources", "dest": "/culturalbrain/landings/landing_cb_resources.html" }
  ]
}
```

### 2. `.gitignore`
Ignorar lo innecesario:
```gitignore
# Node
node_modules/
.vercel/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Sistemas
.DS_Store
Thumbs.db
```

### 3. `README.md`
Este archivo, con la documentación completa.

---

## 🚀 Deploy

1. Prepara tu estructura local tal cual la anterior.
2. Haz **commit & push** al branch `main` en GitHub.
3. Vercel auto-detectará cambios y publicará en los dominios asignados.

---

## 📌 Notas Finales
- Cada carpeta `resources/` debe contener sus PDFs/whitepapers listos para descarga.
- Si se agregan nuevas landings, deben declararse en `vercel.json`.
- Cultural Brain App (PythonAnywhere) **no está en este repo**: solo la landing y satélites.
