/* =========================================================
   COMPONENTE · Aparición al entrar en pantalla
   Cualquier elemento con class="fade" aparece al verse.
   style="--d:.2s" le da un retraso. Los precios con
   data-price="180" cuentan desde 0.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.reveal = {
  init: function () {
    var u = AY.utils;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (!u.reduce) {
          e.target.querySelectorAll("[data-price]").forEach(function (b) {
            u.contar(b, +b.getAttribute("data-price"), 1300);
          });
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    u.all(".fade").forEach(function (el) { io.observe(el); });
  }
};
