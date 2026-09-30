/* =========================================================
   EFECTO · Hero que se encoge y desvanece al hacer scroll
   HTML: <section class="hero-scroll"> con .hero-inner, .halo y .scroll-cue
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.hero = {
  init: function () {
    var u = AY.utils;
    u.all(".hero-scroll").forEach(function (sec) {
      var inner = sec.querySelector(".hero-inner");
      var halo = sec.querySelector(".halo");
      var cue = sec.querySelector(".scroll-cue");

      AY.scroll.add(function () {
        var p = u.progress(sec);
        inner.style.transform = "scale(" + (1 - p * 0.22) + ") translateY(" + (-p * 40) + "px)";
        inner.style.opacity = 1 - u.range(p, 0.25, 0.85);
        if (cue && document.body.classList.contains("ready")) cue.style.opacity = 1 - u.range(p, 0, 0.15);
        if (halo) {
          halo.style.opacity = 1 - u.range(p, 0.1, 0.9);
          halo.style.transform = "translate(-50%,-30%) scale(" + (1 + p * 0.6) + ")";
        }
      });
    });
  }
};
