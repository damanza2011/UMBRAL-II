# Umbral · Landing de psicología organizacional

Landing de una sola página para un psicólogo organizacional. Es un **prototipo**: la marca, el nombre, los datos de contacto y las credenciales son de ejemplo y deben reemplazarse antes de publicar. La selección de los 10 referentes y la justificación del elegido están en `BENCHMARK.md`.

## Cómo verla

Abre `index.html` en el navegador. No necesita build, servidor ni dependencias. Para trabajar con recarga automática:

```powershell
npx serve .
```

## Estructura

```
umbral/
├── index.html
├── BENCHMARK.md
├── README.md
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css
    ├── js/app.js
    └── img/
        ├── favicon.svg
        └── og-umbral.jpg
```

## Qué reemplazar antes de publicar

### 1. Marca y nombre
- `UMBRAL` aparece en header, footer, título, OG y JSON-LD.
- En `index.html`, busca `[Nombre del psicólogo]` y pon el nombre real.
- Ajusta el título, la descripción y el canonical si el dominio no será `umbral.co`.

### 2. Contacto
En `assets/js/app.js`, objeto `CONFIG`:

```js
const CONFIG = {
  whatsapp: '573001234567',
  phoneDisplay: '+57 300 123 4567',
  email: 'hola@umbral.co',
  brand: 'Umbral'
};
```

- `whatsapp`: solo dígitos, con indicativo de país (57 para Colombia).
- El número debe tener **WhatsApp activo**.
- Los enlaces `wa.me` del HTML se actualizan solos desde `CONFIG`; los textos visibles (`+57 300 123 4567`, `hola@umbral.co`) hay que cambiarlos en el HTML. Busca `300 123 4567` y `hola@umbral.co`.
- Actualiza también el `telephone` y `email` del JSON-LD.

### 3. Credenciales y enfoque
- La sección “Enfoque” tiene un espacio para el nombre y una lista de principios.
- Agrega formación, especialización, certificaciones y experiencia real. No inventes membresías ni títulos.
- Si el psicólogo tiene foto profesional, reemplaza la ilustración de `about__arch` por una imagen (`<img>` con `alt`) o un fondo.
- Ajusta la cita y el tono a su voz.

### 4. Servicios, sectores y FAQ
- Los seis servicios son un punto de partida; elimina los que no ofrezca y ajusta los entregables.
- Los sectores son ejemplos, no clientes.
- Las respuestas del FAQ deben reflejar su forma real de trabajar, precios y alcance.

### 5. Test de señales
- No es un instrumento psicométrico ni un diagnóstico clínico. Es una guía de conversación.
- Las preguntas y los puntajes están en `assets/js/app.js` (`QUESTIONS` y `BANDS`). Si cambias el número de preguntas, ajusta el total (`QUESTIONS.length * 3`) y los rangos.
- Si el psicólogo no quiere un test, elimina la sección `#test` y sus enlaces.

### 6. Formulario
- No hay backend: el formulario valida y abre WhatsApp con el mensaje armado.
- No almacena datos. Si necesitas CRM o correo, conecta un endpoint propio o un servicio como Formspree.
- El consentimiento menciona la Ley 1581 de 2012. Ajusta el texto con el abogado y publica la política de tratamiento de datos.
- Los enlaces “Política de privacidad” y “Términos de uso” están en `#`; créalos antes de publicar.

### 7. Imagen para compartir
- `assets/img/og-umbral.jpg` es la imagen de Open Graph (1200×630). Reemplázala por una con la marca y el nombre reales.
- Actualiza `og:image` y `twitter:image` si cambia la ruta.

### 8. Quitar el aviso de prototipo
- En el footer: `Prototipo · datos de ejemplo`.
- En `app.js`, el `console.info` de configuración.

## Publicación

Es un sitio estático. Opciones:

1. **Vercel:** arrastra la carpeta `umbral` a un proyecto nuevo, o súbela a GitHub y conéctala. No requiere build.
2. **Netlify:** arrastra la carpeta o conecta el repo.
3. **Hosting tradicional:** sube el contenido por FTP.

Después de publicar:

- Configura el dominio y actualiza `canonical`, `og:url`, `sitemap.xml` y `robots.txt`.
- Verifica el sitio en móvil y escritorio.
- Prueba el test, el formulario y el enlace de WhatsApp en un celular real.
- Agrega Google Analytics o Meta Pixel si se necesita medir campañas.

## Pendientes recomendados

- Foto profesional y logo definitivo.
- Tres testimonios reales con autorización escrita.
- Un caso de estudio con contexto, intervención y resultado (sin datos confidenciales).
- Página de política de privacidad y términos.
- Enlace de agenda (Calendly, Google Calendar) si se prefiere a WhatsApp.
- Certificaciones y formación verificables.
- Revisión de textos con el psicólogo.

## Notas de diseño

- Tipografías: Fraunces (títulos) y Manrope (texto), vía Google Fonts.
- Paleta: papel cálido, verde bosque y arcilla.
- Sin imágenes de stock: la ilustración del enfoque es SVG para evitar fotos genéricas.
- El sitio es responsive, accesible con teclado y respeta `prefers-reduced-motion`.
