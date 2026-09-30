# Web · Alexis Yacila — Trafficker digital

Sitio estático de 6 páginas, hecho con HTML, CSS y JavaScript puro, sin frameworks ni librerías.
No necesita instalar nada: se sube tal cual a GitHub Pages.

## Estructura

```
alexis-yacila-web/
├── index.html            Inicio (incluye la intro de carga)
├── servicios.html        Servicios y embudo
├── metodo.html           Método A, gráficos y caso real
├── planes.html           Planes mensuales (sin precio) y servicios puntuales (con precio)
├── sobre-mi.html         Sobre mí, foto que se expande y cifras
├── contacto.html         Datos de contacto y formulario → WhatsApp
│
└── assets/
    ├── img/
    │   ├── alexis.jpg            Foto en blanco y negro (Sobre mí)
    │   ├── alexis-tablet.webp    Foto con tablet, fondo transparente (Inicio y Contacto)
    │   └── favicon.svg           Monograma A (ícono de la pestaña)
    │
    ├── css/
    │   ├── main.css              Hoja principal: solo importa los módulos, en orden
    │   ├── base/
    │   │   ├── base.css          Colores de marca, tipografía, reset y secciones
    │   │   ├── animations.css    Entrada con desenfoque y aparición al hacer scroll
    │   │   └── responsive.css    Ajustes para celular y tablet (siempre al final)
    │   ├── layout/
    │   │   ├── nav.css           Menú superior y menú móvil
    │   │   └── footer.css        Pie de página y botón flotante de WhatsApp
    │   ├── components/
    │   │   ├── buttons.css       Botones
    │   │   ├── cards.css         Tarjetas en 3 columnas y chips
    │   │   ├── plans.css         Planes y servicios puntuales
    │   │   ├── faq.css           Preguntas frecuentes
    │   │   ├── charts.css        Gráficos de línea y barras
    │   │   └── intro-loader.css  Intro de carga del inicio
    │   ├── sections/
    │   │   ├── hero.css          Hero que se encoge con el scroll
    │   │   ├── text-reveal.css   Texto que se ilumina palabra por palabra
    │   │   ├── photo-float.css   Foto que sube con gráficos flotantes
    │   │   ├── stats.css         Cifras que cuentan
    │   │   ├── horizontal-cards.css  Tarjetas de servicios en horizontal
    │   │   ├── stacked-cards.css Tarjetas del método que se apilan
    │   │   ├── photo-expand.css  Foto que se expande
    │   │   └── cta.css           Llamado final ("Hablemos.")
    │   └── pages/
    │       ├── servicios.css     Detalle de servicios y embudo
    │       └── contacto.css      Datos, formulario y avatar
    │
    └── js/
        ├── config.js             ★ TUS DATOS: WhatsApp, correo, Instagram, menú, intro
        ├── main.js               Arranque: inicia cada módulo en orden
        ├── core/
        │   ├── utils.js          Funciones compartidas (suavizado, contadores, WhatsApp)
        │   └── scroll-engine.js  Motor que ejecuta los efectos al hacer scroll
        ├── components/
        │   ├── layout.js         Genera el menú, el pie de página y el botón de WhatsApp
        │   ├── intro-loader.js   Intro de carga del inicio
        │   ├── reveal.js         Aparición al entrar en pantalla y precios que cuentan
        │   ├── faq.js            Acordeón de preguntas frecuentes
        │   ├── contact-form.js   Formulario que abre WhatsApp con el mensaje armado
        │   └── charts.js         Gráficos de línea y barras (SVG)
        └── effects/
            ├── hero.js
            ├── text-reveal.js
            ├── photo-float.js
            ├── stats-counter.js
            ├── horizontal-cards.js
            ├── stacked-cards.js
            └── photo-expand.js
```

## Cambios frecuentes

| Quiero cambiar…                          | Dónde                                               |
|------------------------------------------|-----------------------------------------------------|
| Número de WhatsApp, correo, Instagram    | `assets/js/config.js` → `contacto`                   |
| Mensaje por defecto de WhatsApp          | `assets/js/config.js` → `mensajeWhatsapp`            |
| Páginas del menú                         | `assets/js/config.js` → `paginas`                    |
| Duración de la intro de carga            | `assets/js/config.js` → `intro`                      |
| Colores de marca                         | `assets/css/base/base.css` → bloque `:root`          |
| Textos, precios, planes                  | Directamente en cada archivo `.html`                 |
| Mensaje de WhatsApp de un botón          | Atributo `data-wa="..."` del botón en el `.html`     |
| Fotos                                    | Reemplaza los archivos en `assets/img/` con el mismo nombre |
| Valores de los gráficos                  | Atributos `data-values`, `data-max`, `data-ticks` en `metodo.html` |
| Desactivar un efecto                     | Comenta su línea en `assets/js/main.js`              |

## Cómo agregar una página nueva

1. Copia una página existente (por ejemplo `servicios.html`) y cámbiale el nombre.
2. Cambia `data-page="..."` en la etiqueta `<body>` por el nombre del archivo nuevo.
3. Agrégala al menú en `assets/js/config.js` → `paginas`.

## Cómo agregar un efecto nuevo

1. Crea `assets/js/effects/mi-efecto.js` con esta forma:
   ```js
   window.AY = window.AY || {};
   AY.modules = AY.modules || {};
   AY.modules.miEfecto = {
     init: function () {
       var u = AY.utils;
       u.all(".mi-seccion").forEach(function (sec) {
         AY.scroll.add(function () {
           var p = u.progress(sec); // 0 → 1 mientras la sección pasa
           // … mueve elementos según p
         });
       });
     }
   };
   ```
2. Añade su `<script>` en las páginas, antes de `main.js`.
3. Añade `"miEfecto"` a la lista de `assets/js/main.js`.
4. Si lleva estilos, crea `assets/css/sections/mi-efecto.css` e impórtalo en `main.css`.

## Ver la web en tu computadora

Haz doble clic en `index.html`. Funciona sin servidor.
La intro de carga se ve una vez por visita. Para verla de nuevo, abre la página en una pestaña nueva.

## Publicar en GitHub Pages

1. Sube TODO el contenido de esta carpeta a la raíz de un repositorio público.
2. En el repositorio: Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. En "Custom domain" escribe tu dominio y activa "Enforce HTTPS".
4. En el panel de tu dominio, agrega estos registros DNS:
   - 4 registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` → `tuusuario.github.io`

## Meta Pixel

Cada página tiene un comentario `<!-- META PIXEL -->` en el `<head>`. Pega ahí el código de tu píxel en las 6 páginas.
