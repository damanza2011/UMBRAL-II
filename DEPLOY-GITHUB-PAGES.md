# Publicar Umbral en GitHub Pages

Esta guía es para Windows + PowerShell + Git. Sirve para el sitio estático de `umbral/`.

## 0. Qué se sube

Se sube **el contenido de la carpeta**, no el ZIP:

```
umbral/
├── index.html
├── .nojekyll
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── img/
├── README.md
├── BENCHMARK.md
├── robots.txt
└── sitemap.xml
```

`index.html` debe quedar en la **raíz** del repositorio, al mismo nivel de `assets`.

## 1. Descargar y descomprimir

1. Descarga `umbral-landing.zip` desde la tarjeta del chat.
2. Clic derecho → **Extraer todo**.
3. Deja la carpeta en una ruta corta, por ejemplo:

```
C:\SALMAN\umbral
```

4. Abre `index.html` con doble clic. Debe verse la landing.

## 2. Crear el repositorio en GitHub

1. Entra a `https://github.com/new`.
2. **Repository name:** `umbral-psicologia`.
3. **Public** (GitHub Pages gratuito requiere repo público; si es privado necesitas plan Pro/Team o usar Vercel).
4. **No** marques “Add a README file”, “Add .gitignore” ni “Choose a license”. El repo debe quedar vacío.
5. Clic en **Create repository**.
6. Copia la URL HTTPS:

```
https://github.com/TUUSUARIO/umbral-psicologia.git
```

## 3. Subir los archivos con Git

Abre PowerShell **dentro de la carpeta descomprimida**:

```powershell
cd "C:\SALMAN\umbral"
```

Verifica que estás en el lugar correcto:

```powershell
Get-ChildItem
```

Debes ver `index.html`, `assets`, `.nojekyll`, etc.

Inicializa y sube:

```powershell
git init
git add .
git commit -m "Landing Umbral para psicologia organizacional"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/umbral-psicologia.git
git push -u origin main
```

- Si Git te pide autenticación, se abre el navegador con Git Credential Manager. Inicia sesión en GitHub.
- Si el remoto ya existe: `git remote set-url origin https://github.com/TUUSUARIO/umbral-psicologia.git`
- Si el repo ya tenía un README y el push es rechazado: `git pull --rebase origin main` y vuelve a hacer `git push`. No uses `--force` salvo que sepas lo que haces.

## 4. Activar GitHub Pages

1. En el repo: **Settings** → **Pages**.
2. **Build and deployment** → **Source:** *Deploy from a branch*.
3. **Branch:** `main`.
4. **Folder:** `/ (root)`.
5. **Save**.
6. Espera 1–3 minutos. La URL aparece arriba:

```
https://TUUSUARIO.github.io/umbral-psicologia/
```

Si da 404 al principio, espera y refresca. Revisa **Actions** o **Pages** por el estado del build.

## 5. Actualizar la URL en el sitio

Mientras no tengas dominio propio, la URL es la de GitHub Pages. Reemplaza `https://umbral.co` por la tuya en:

- `index.html`: `canonical`, `og:image`, `twitter:image`, JSON-LD.
- `sitemap.xml`: `loc`.
- `robots.txt`: `Sitemap`.

En PowerShell, desde la carpeta:

```powershell
$old = "https://umbral.co"
$new = "https://TUUSUARIO.github.io/umbral-psicologia"

(Get-Content index.html -Raw) -replace [regex]::Escape($old), $new | Set-Content index.html -Encoding UTF8
(Get-Content sitemap.xml -Raw) -replace [regex]::Escape($old), $new | Set-Content sitemap.xml -Encoding UTF8
(Get-Content robots.txt -Raw) -replace [regex]::Escape($old), $new | Set-Content robots.txt -Encoding UTF8
```

Luego:

```powershell
git add .
git commit -m "Actualizar URL de GitHub Pages"
git push
```

GitHub Pages redeploya solo.

## 6. Probar

1. Abre la URL en una ventana incógnito.
2. Verifica que carguen CSS, tipografías e imágenes.
3. Abre el test y completa las 6 preguntas.
4. Envía el formulario: debe abrir WhatsApp con el mensaje.
5. Prueba en el celular.
6. Si algo no carga, revisa que `assets/` esté en la raíz y que `index.html` no esté dentro de una subcarpeta.

## 7. Actualizar el sitio

Cada cambio:

```powershell
git add .
git commit -m "Actualizar datos del psicologo"
git push
```

GitHub Pages publica en 1–2 minutos.

## 8. Dominio propio (opcional)

1. Compra el dominio (por ejemplo `umbralpsicologia.com`).
2. En **Settings → Pages → Custom domain**, escríbelo y guarda.
3. En el DNS del proveedor:
   - `A` para `@` → IPs de GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `CNAME` para `www` → `TUUSUARIO.github.io`.
4. Espera la propagación y activa **Enforce HTTPS**.
5. Vuelve a reemplazar la URL en `canonical`, `og:image`, `sitemap` y `robots`.

## 9. Si el repo debe ser privado

GitHub Pages gratuito no publica repos privados. Opciones:

- Hacer el repo público (el sitio es público de todos modos).
- Usar Vercel o Netlify, que sí permiten repo privado en el plan gratuito.
- Tener GitHub Pro/Team.

## 10. Sobre el PDF

El sitio es HTML. Un PDF no reemplaza `index.html`.

- Para enviar una versión en PDF al psicólogo: abre la landing en Chrome → **Ctrl + P** → **Guardar como PDF**. Ese PDF es solo para compartir, no para Pages.
- Si quieres un PDF descargable dentro de la página (brochure de servicios), se guarda en `assets/docs/` y se enlaza con un botón. Dímelo y lo agregamos.

## Checklist final

- [ ] `index.html` en la raíz del repo.
- [ ] `assets/` en la raíz.
- [ ] `.nojekyll` en la raíz.
- [ ] Repo público.
- [ ] Pages en `main` / root.
- [ ] URL de Pages actualizada en `canonical`, OG, sitemap y robots.
- [ ] Test y formulario probados en celular.
- [ ] Datos reales del psicólogo reemplazados.
- [ ] “Prototipo · datos de ejemplo” eliminado del footer.
