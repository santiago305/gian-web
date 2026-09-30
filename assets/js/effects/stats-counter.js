/* =========================================================
   EFECTO · Cifras que aparecen y cuentan con el scroll
   HTML: <section class="stats-sec"> ... <div class="stat"><b data-to="50" data-prefix="+">
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.statsCounter = {
  init: function () {
    var u = AY.utils;
    u.all(".stats-sec").forEach(function (sec) {
      var items = u.all(".stat", sec);

      if (u.reduce) {
        items.forEach(function (it) {
          var b = it.querySelector("b");
          it.classList.add("on");
          b.textContent = (b.getAttribute("data-prefix") || "") + b.getAttribute("data-to") + (b.getAttribute("data-suffix") || "");
        });
        return;
      }

      AY.scroll.add(function () {
        var p = u.progress(sec), n = items.length;
        items.forEach(function (it, i) {
          if (p >= 0.08 + i * (0.6 / n) && !it.classList.contains("on")) {
            it.classList.add("on");
            var b = it.querySelector("b");
            u.contar(b, +b.getAttribute("data-to"), 1400);
          }
        });
      });
    });
  }
};
