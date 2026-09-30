/* =========================================================
   EFECTO · Foto que sube + tarjetas de gráficos flotantes
   HTML: <section class="photo-sec"> con .ps-person y varias .float
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.photoFloat = {
  init: function () {
    var u = AY.utils;
    u.all(".photo-sec").forEach(function (sec) {
      var persona = sec.querySelector(".ps-person");
      var tarjetas = u.all(".float", sec);

      if (u.reduce) {
        tarjetas.forEach(function (f) { f.style.opacity = 1; f.style.transform = "none"; f.classList.add("on"); });
        return;
      }

      AY.scroll.add(function () {
        var p = u.progress(sec);
        var sube = u.ease(u.range(p, 0, 0.35));
        persona.style.transform = "translateY(" + ((1 - sube) * 45) + "vh) scale(" + (0.9 + sube * 0.1) + ")";
        tarjetas.forEach(function (f, i) {
          var t = u.range(p, 0.3 + i * 0.12, 0.42 + i * 0.12);
          f.style.opacity = t;
          f.style.transform = "translateY(" + ((1 - t) * 40) + "px) scale(" + (0.94 + t * 0.06) + ")";
          f.classList.toggle("on", t > 0.6);
        });
      });
    });
  }
};
