/* =========================================================
   EFECTO · Tarjetas que se apilan (las de atrás se achican)
   HTML: <div class="stack"> con varias .s-card
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.stackedCards = {
  init: function () {
    var u = AY.utils;
    u.all(".stack").forEach(function (stack) {
      var cards = u.all(".s-card", stack);
      AY.scroll.add(function () {
        cards.forEach(function (c, i) {
          var next = cards[i + 1];
          if (!next) return;
          var top = parseFloat(getComputedStyle(c).top) || 0;
          var o = u.clamp(1 - (next.getBoundingClientRect().top - top) / c.offsetHeight);
          c.style.transform = "scale(" + (1 - o * 0.07) + ")";
          c.style.filter = "brightness(" + (1 - o * 0.35) + ")";
        });
      });
    });
  }
};
