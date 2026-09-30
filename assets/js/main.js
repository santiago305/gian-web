/* =========================================================
   MAIN · Punto de arranque
   Inicia cada módulo en orden. Para desactivar uno, bórralo
   de la lista (o comenta la línea).
   ========================================================= */
(function () {
  var orden = [
    "layout",          // menú, pie de página, botón de WhatsApp
    "introLoader",     // intro de carga del inicio + entrada del hero
    "hero",            // hero que se encoge con el scroll
    "textReveal",      // texto que se ilumina palabra por palabra
    "photoFloat",      // foto que sube + gráficos flotantes
    "statsCounter",    // cifras que cuentan
    "horizontalCards", // tarjetas de servicios en horizontal
    "stackedCards",    // tarjetas del método que se apilan
    "photoExpand",     // foto que se expande (sobre mí)
    "charts",          // gráficos de línea y barras
    "reveal",          // aparición al entrar en pantalla
    "faq",             // preguntas frecuentes
    "contactForm"      // formulario → WhatsApp
  ];

  orden.forEach(function (nombre) {
    var m = AY.modules[nombre];
    if (!m) return;
    try { m.init(); }
    catch (e) { console.error("Error en el módulo " + nombre + ":", e); }
  });

  AY.scroll.start();
})();
