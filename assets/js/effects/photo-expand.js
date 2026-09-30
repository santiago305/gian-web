/* =========================================================
   EFECTO · Foto que se expande a pantalla completa
   HTML: <section class="expand-sec"> con .photo y .over-text
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.photoExpand = {
  init: function () {
    var u = AY.utils;
    u.all(".expand-sec").forEach(function (sec) {
      var foto = sec.querySelector(".photo"), texto = sec.querySelector(".over-text");
      AY.scroll.add(function () {
        var p = u.progress(sec);
        var e = 1 - u.ease(u.range(p, 0, 0.6));
        foto.style.clipPath = "inset(" + (e * 16) + "% " + (e * 24) + "% round " + (e * 40) + "px)";
        var t = u.range(p, 0.5, 0.75);
        texto.style.opacity = t;
        texto.style.transform = "translateY(" + ((1 - t) * 40) + "px)";
      });
    });
  }
};
