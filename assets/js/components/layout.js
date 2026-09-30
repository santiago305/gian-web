/* =========================================================
   LAYOUT: menú superior, menú móvil, pie de página y botón
   flotante de WhatsApp. Se generan aquí para no repetirlos
   en cada página.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.icons = {
  logo: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#FF5A1F"/><path d="M32 12 L49 50 H40 L32 32 L24 50 H15 Z" fill="#0B0B0B"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>'
};

AY.modules.layout = {
  init: function () {
    var c = AY.config, icons = AY.icons, u = AY.utils;
    var actual = document.body.getAttribute("data-page") || "index.html";

    /* --- Menú superior --- */
    var links = c.paginas.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[0] === actual ? ' class="on"' : "") + ">" + p[1] + "</a>";
    }).join("");

    var nav = document.createElement("header");
    nav.className = "nav";
    nav.innerHTML =
      '<div class="wrap">' +
        '<a href="index.html" class="logo">' + icons.logo + c.marca + "</a>" +
        '<nav class="links">' + links + "</nav>" +
        '<div class="nav-right">' +
          '<a class="pill" data-wa href="#">Hablemos</a>' +
          '<button class="menu-btn" aria-label="Abrir menú"><span></span><span></span></button>' +
        "</div>" +
      "</div>";
    document.body.prepend(nav);

    /* --- Menú móvil --- */
    var menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.innerHTML = c.paginas.map(function (p, i) {
      return '<a href="' + p[0] + '" style="transition-delay:' + (0.05 + i * 0.05) + 's">' + p[1] + "</a>";
    }).join("");
    nav.after(menu);
    nav.querySelector(".menu-btn").addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });

    /* --- Pie de página --- */
    var footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="f-top">' +
          '<div class="f-brand"><a href="index.html" class="logo">' + icons.logo + c.marca + "</a><p>" + c.descripcion + "</p></div>" +
          '<div class="f-cols">' +
            "<div><h4>Páginas</h4>" + c.paginas.map(function (p) { return '<a href="' + p[0] + '">' + p[1] + "</a>"; }).join("") + "</div>" +
            "<div><h4>Contacto</h4>" +
              '<a data-wa href="#">WhatsApp ' + c.contacto.whatsappVisible + "</a>" +
              '<a data-correo href="#">' + c.contacto.correo + "</a>" +
              '<a data-ig href="#">Instagram ' + c.contacto.instagramUsuario + "</a>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="f-bottom"><span>© ' + new Date().getFullYear() + " " + c.marca + " · Trafficker digital</span><span>Precios en USD</span></div>" +
      "</div>";
    document.body.append(footer);

    /* --- Botón flotante de WhatsApp --- */
    var wa = document.createElement("a");
    wa.className = "wa";
    wa.setAttribute("data-wa", "");
    wa.setAttribute("aria-label", "Escríbeme por WhatsApp");
    wa.href = "#";
    wa.innerHTML = icons.whatsapp;
    document.body.append(wa);

    if (u.reduce) wa.classList.add("show");
    else AY.scroll.add(function () { wa.classList.toggle("show", scrollY > innerHeight * 0.9); });

    /* --- Enlaces de contacto en toda la página ---
       data-wa="mensaje opcional" · data-correo · data-ig */
    u.all("[data-wa]").forEach(function (a) {
      a.href = u.waLink(a.getAttribute("data-wa"));
      a.target = "_blank";
      a.rel = "noopener";
    });
    u.all("[data-correo]").forEach(function (a) { a.href = "mailto:" + c.contacto.correo; });
    u.all("[data-ig]").forEach(function (a) { a.href = c.contacto.instagram; a.target = "_blank"; a.rel = "noopener"; });
  }
};
