/* =========================================================
   UTILIDADES compartidas por todos los módulos
   ========================================================= */
window.AY = window.AY || {};

AY.utils = (function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(v, a, b) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 1 : b;
    return Math.min(b, Math.max(a, v));
  }

  // Convierte p (0..1) a un tramo [a, b] → 0..1
  function range(p, a, b) { return clamp((p - a) / (b - a)); }

  // Curva de suavizado (ease-out cúbica)
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  // Progreso de scroll de una sección "sticky": 0 al entrar, 1 al salir
  function progress(el) {
    var r = el.getBoundingClientRect();
    return clamp(-r.top / (r.height - innerHeight));
  }

  function all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  // Contador animado: usa data-prefix y data-suffix del elemento
  function contar(el, hasta, dur) {
    var prefijo = el.getAttribute("data-prefix") || "";
    var sufijo = el.getAttribute("data-suffix") || "";
    var t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = prefijo + Math.round(hasta * ease(p)) + sufijo;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function waLink(mensaje) {
    var c = AY.config;
    return "https://wa.me/" + c.contacto.whatsapp + "?text=" + encodeURIComponent(mensaje || c.mensajeWhatsapp);
  }

  return { reduce: reduce, clamp: clamp, range: range, ease: ease, progress: progress, all: all, contar: contar, waLink: waLink };
})();
