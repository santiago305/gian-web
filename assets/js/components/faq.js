/* =========================================================
   COMPONENTE · Preguntas frecuentes (acordeón)
   HTML: <div class="qa"><button>Pregunta<span class="pl"></span></button>
         <div class="ans"><div><p>Respuesta</p></div></div></div>
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.faq = {
  init: function () {
    var u = AY.utils;
    u.all(".qa button").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function () {
        var qa = b.parentElement, estaba = qa.classList.contains("open");
        u.all(".qa").forEach(function (q) {
          q.classList.remove("open");
          q.querySelector("button").setAttribute("aria-expanded", "false");
        });
        if (!estaba) { qa.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
      });
    });
  }
};
