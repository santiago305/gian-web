/* =========================================================
   MOTOR DE SCROLL
   Los efectos se registran con AY.scroll.add(fn) y se ejecutan
   una vez por cuadro mientras el usuario hace scroll.
   ========================================================= */
window.AY = window.AY || {};

AY.scroll = (function () {
  var efectos = [], alRedimensionar = [], pendiente = false;

  function actualizar() {
    for (var i = 0; i < efectos.length; i++) efectos[i]();
  }

  function onScroll() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { actualizar(); pendiente = false; });
  }

  function iniciar() {
    if (!AY.utils.reduce) addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", function () {
      alRedimensionar.forEach(function (fn) { fn(); });
      actualizar();
    });
    actualizar();
  }

  return {
    add: function (fn) { efectos.push(fn); },
    onResize: function (fn) { alRedimensionar.push(fn); },
    update: actualizar,
    start: iniciar
  };
})();
