/* =========================================================
   EFECTO · Tarjetas que avanzan de lado mientras bajas
   HTML: <section class="h-sec"> ... <div class="h-track"> con .card
   La altura de la sección se calcula según el ancho de las tarjetas.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.horizontalCards = {
  init: function () {
    var u = AY.utils;
    u.all(".h-sec").forEach(function (sec) {
      var track = sec.querySelector(".h-track"), max = 0;

      function medir() {
        max = Math.max(0, track.scrollWidth - innerWidth);
        sec.style.height = (max + innerHeight * 1.4) + "px";
      }
      medir();
      AY.scroll.onResize(medir);

      AY.scroll.add(function () {
        var p = u.range(u.progress(sec), 0.1, 0.95);
        track.style.transform = "translate3d(" + (-p * max) + "px,0,0)";
      });
    });
  }
};
