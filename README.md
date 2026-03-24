# arturobarrios.com

Sitio web personal de **Rafael Arturo Barrios Islas** — Consultor Estratégico & Desarrollador Digital.

> "No solo te digo qué hacer — lo construimos juntos."

---

## 🌐 URL en producción

[https://arturobarrios.com](https://arturobarrios.com)

---

## 🗂️ Estructura del repositorio

```
arturobarrios.com/
│
├── index.html                  # Landing page principal
├── README.md                   # Este archivo
│
├── assets/
│   └── img/
│       └── foto-perfil.jpg     # Foto profesional (referencia externa para producción)
│
├── privacy/
│   └── index.html              # → arturobarrios.com/privacy
│
├── terms/
│   └── index.html              # → arturobarrios.com/terms
│
├── data-deletion/
│   └── index.html              # → arturobarrios.com/data-deletion
│
└── [futuras secciones]
    ├── diagnostico/            # → arturobarrios.com/diagnostico
    ├── demo-whatsapp/          # → arturobarrios.com/demo-whatsapp
    └── clientes/               # → arturobarrios.com/clientes
```

---

## 🎨 Diseño & Especificaciones

HTML + CSS + JS vanilla — sin frameworks, sin dependencias, sin build step.

### Paleta de colores

| Variable         | Hex                   | Uso                             |
|------------------|-----------------------|---------------------------------|
| `--ink`          | `#0e1520`             | Texto principal, fondos oscuros |
| `--ink-mid`      | `#3a4557`             | Texto secundario                |
| `--ink-dim`      | `#7a8799`             | Texto terciario                 |
| `--cream`        | `#f7f4ef`             | Fondo general                   |
| `--white`        | `#ffffff`             | Fondos de tarjetas              |
| `--copper`       | `#b5692a`             | Acento principal, CTAs          |
| `--copper-light` | `#d4854a`             | Acento secundario               |
| `--blue`         | `#1a3a6b`             | Hero derecho, fondos oscuros    |
| `--blue-mid`     | `#2a5298`             | Énfasis, servicio 1             |
| `--teal`         | `#1a7a6b`             | Servicio 2 (WhatsApp)           |
| `--border`       | `rgba(14,21,32,0.09)` | Bordes sutiles                  |

### Tipografía

| Fuente       | Uso                      | Pesos         |
|--------------|--------------------------|---------------|
| **Fraunces** | Títulos, display, quotes | 300, 600      |
| **Epilogue** | Cuerpo, UI, nav          | 300, 400, 500 |

### Secciones

| Sección   | Anchor ID    | Descripción                                          |
|-----------|--------------|------------------------------------------------------|
| Nav       | —            | Fija, blur backdrop, CTA "Hablemos"                  |
| Hero      | —            | Flex 2 col: texto izq + foto der sobre fondo azul    |
| Banda     | —            | Barra oscura con 4 puntos clave de valor             |
| Sobre mí  | `#sobre-mi`  | Credenciales + quote card + stats                    |
| Servicios | `#servicios` | 3 tarjetas: Web & Apps, WhatsApp, Automatización     |
| Proceso   | `#proceso`   | 4 pasos sobre fondo oscuro                           |
| Contacto  | `#contacto`  | CTA + card con selector interactivo de servicio      |
| Footer    | —            | Logo + links + copyright                             |

### Copy de servicios

**01 · Páginas Web & Aplicaciones**
Ecosistemas digitales que organizan la oferta, capturan leads y automatizan el flujo de clientes. Stack: Next.js + Vercel sin costos de servidor.

**02 · Automatización de WhatsApp**
Bots 24/7 que califican prospectos, confirman citas y reactivan contactos dormidos. Integración con sitio web y CRM.

**03 · Automatización de Procesos**
Mapeo + eliminación de cuellos de botella. Meta: de ~10 hrs admin/semana a menos de 1 hr.

---

## 🔒 Páginas legales (Meta / Facebook)

| Página                  | Ruta             | Campo en Meta Developer Console |
|-------------------------|------------------|----------------------------------|
| Política de privacidad  | `/privacy`       | Privacy Policy URL               |
| Términos de servicio    | `/terms`         | Terms of Service URL             |
| Eliminación de datos    | `/data-deletion` | User Data Deletion URL           |

Correo de contacto en páginas legales: **arturo.barrios@arturobarrios.com**

---

## 🚀 Despliegue en Vercel

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
# Vercel detecta el push y despliega automáticamente
```

| Parámetro         | Valor                 |
|-------------------|-----------------------|
| Framework         | None (HTML estático)  |
| Build command     | *(vacío)*             |
| Output directory  | `.` (raíz del repo)   |
| Dominio           | arturobarrios.com     |

### Foto de perfil en producción

La foto está embebida en base64 en `index.html` para funcionar standalone.
Para optimizar en producción, reemplazar por referencia externa:

```html
<img src="assets/img/foto-perfil.jpg"
     style="width:100%;height:100%;object-fit:cover;object-position:center 15%;">
```

---

## ✅ Checklist

- [x] Landing page completa con foto
- [x] `/privacy` — Política de privacidad
- [x] `/terms` — Términos de servicio
- [x] `/data-deletion` — Eliminación de datos (Facebook)
- [x] README con especificaciones
- [ ] Configurar URLs legales en Meta Developer Console
- [ ] Verificar email arturo.barrios@arturobarrios.com activo
- [ ] Añadir links reales de LinkedIn y WhatsApp en footer
- [ ] Crear páginas internas por servicio
- [ ] Implementar `/diagnostico` (generador de leads)

---

## 📬 Contacto

**Rafael Arturo Barrios Islas**
- 🌐 arturobarrios.com
- 📧 arturo.barrios@arturobarrios.com
- 📱 +52 55 5502 7042

---

*© 2026 Rafael Arturo Barrios Islas*
