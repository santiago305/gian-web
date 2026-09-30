/* =========================================================
   CONFIGURACIÓN · Alexis Yacila
   Edita aquí tus datos y el menú. Se actualizan en toda la web.
   ========================================================= */
window.AY = window.AY || {};

AY.config = {
  marca: "Alexis Yacila",
  descripcion: "Trafficker digital experto en Meta, Google y TikTok Ads. Estrategia que convierte tu pauta en clientes.",

  contacto: {
    whatsapp: "51939780945",              // código de país + número, sin espacios ni "+"
    whatsappVisible: "+51 939 780 945",
    correo: "alexisyacila309@gmail.com",
    instagram: "https://www.instagram.com/alexisyacila.ads/",
    instagramUsuario: "@alexisyacila.ads"
  },

  // Mensaje por defecto al abrir WhatsApp (cada botón puede tener el suyo con data-wa="...")
  mensajeWhatsapp: "Hola Alexis, vi tu web y quiero información sobre tus servicios.",

  // Páginas del menú: [archivo, nombre visible]
  paginas: [
    ["index.html", "Inicio"],
    ["servicios.html", "Servicios"],
    ["metodo.html", "Método"],
    ["planes.html", "Planes"],
    ["sobre-mi.html", "Sobre mí"],
    ["contacto.html", "Contacto"]
  ],

  // Intro de carga del inicio
  intro: {
    duracionMinima: 2000,   // ms
    duracionMaxima: 4500,   // ms (si la página tarda, no espera más que esto)
    unaVezPorVisita: true
  }
};
