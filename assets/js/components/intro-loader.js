/* =========================================================
   INTRO DE CARGA (solo en el inicio)
   Monograma que se dibuja, nombre letra por letra, barra de
   carga y zoom final. Luego activa la entrada del hero
   (clase "ready" en <body>).
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.introLoader = {
  init: function () {
    var loader = document.getElementById("loader");
    var cfg = AY.config.intro;
    function listo() { document.body.classList.add("ready"); }

    // Páginas sin intro, o intro ya vista en esta visita
    if (!loader || loader.className === "skip") {
      requestAnimationFrame(function () { setTimeout(listo, 120); });
      return;
    }

    var bar = document.getElementById("ldBar"), count = document.getElementById("ldCount");
    var t0 = performance.now(), cargado = document.readyState === "complete", terminado = false;
    addEventListener("load", function () { cargado = true; });

    (function tick(now) {
      var dt = now - t0;
      // Avanza hasta 90% por tiempo; el 10% final espera a que la página cargue
      var p = Math.min(dt / cfg.duracionMinima, 1) * 0.9 +
              ((cargado && dt >= cfg.duracionMinima) || dt >= cfg.duracionMaxima ? 0.1 : 0);
      bar.style.transform = "scaleX(" + p + ")";
      count.textContent = Math.round(p * 100) + "%";

      if (p >= 1 && !terminado) {
        terminado = true;
        setTimeout(function () {
          loader.classList.add("out");
          document.body.classList.remove("loading");
          if (cfg.unaVezPorVisita) { try { sessionStorage.setItem("introVista", "1"); } catch (e) {} }
          setTimeout(listo, 450);
          setTimeout(function () { loader.remove(); }, 1400);
        }, 250);
        return;
      }
      requestAnimationFrame(tick);
    })(t0);
  }
};
