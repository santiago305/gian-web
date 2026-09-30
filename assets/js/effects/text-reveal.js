/* =========================================================
   EFECTO · Texto que se ilumina palabra por palabra
   HTML: <section class="manifest-sec"><p class="manifest" data-accent="palabra,otra">
   Las palabras de data-accent se pintan en naranja.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.textReveal = {
  init: function () {
    var u = AY.utils;
    u.all(".manifest").forEach(function (m) {
      var acentos = (m.getAttribute("data-accent") || "").toLowerCase().split(",");
      var palabras = m.textContent.trim().split(/\s+/).map(function (w) {
        var s = document.createElement("span");
        var limpia = w.toLowerCase().replace(/[.,:;!?]/g, "");
        s.className = "wd" + (acentos.indexOf(limpia) > -1 ? " acc" : "");
        s.textContent = w;
        return s;
      });
      m.textContent = "";
      palabras.forEach(function (s, i) { m.append(s); if (i < palabras.length - 1) m.append(" "); });

      if (u.reduce) { palabras.forEach(function (w) { w.classList.add("lit"); }); return; }

      var sec = m.closest(".manifest-sec");
      AY.scroll.add(function () {
        var p = u.range(u.progress(sec), 0.05, 0.85);
        var encendidas = Math.floor(p * (palabras.length + 1));
        palabras.forEach(function (w, i) { w.classList.toggle("lit", i < encendidas); });
      });
    });
  }
};
