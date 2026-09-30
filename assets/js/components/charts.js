/* =========================================================
   COMPONENTE · Gráficos de línea y barras (SVG, sin librerías)
   HTML: <div class="chart" data-chart="line|bars"
              data-values="100,92,81" data-max="120" data-ticks="0,40,80,120">
   Se dibujan al entrar en pantalla y muestran el valor al pasar el mouse.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.charts = (function () {
  var NS = "http://www.w3.org/2000/svg";
  var COLOR_LINEA = "#FF5A1F";

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  var idGradiente = 0;

  function dibujar(box) {
    var reduce = AY.utils.reduce;
    var tipo = box.getAttribute("data-chart");
    var vals = box.getAttribute("data-values").split(",").map(Number);
    var max = +box.getAttribute("data-max");
    var ticks = box.getAttribute("data-ticks").split(",").map(Number);
    var etiqueta = box.getAttribute("data-label") || "Semana";

    var W = 560, H = 300, L = 42, R = 14, T = 14, B = 34;
    var iw = W - L - R, ih = H - T - B, n = vals.length;
    var y = function (v) { return T + ih - (v / max) * ih; };

    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img" }, box);
    var titulo = box.parentElement.querySelector("h3");
    svg.setAttribute("aria-label", (titulo ? titulo.textContent + ": " : "") + vals.join(", "));

    /* Cuadrícula y eje Y */
    var grid = el("g", { "class": "grid" }, svg), axis = el("g", { "class": "axis" }, svg);
    ticks.forEach(function (t) {
      el("line", { x1: L, x2: W - R, y1: y(t), y2: y(t) }, grid);
      el("text", { x: L - 10, y: y(t) + 4, "text-anchor": "end" }, axis).textContent = t;
    });

    /* Tooltip */
    var tip = document.createElement("div");
    tip.className = "tip";
    box.appendChild(tip);
    function mostrar(i, xPx, yPx) {
      tip.innerHTML = etiqueta + " " + (i + 1) + " · <b>" + vals[i] + "</b>";
      var s = svg.getBoundingClientRect().width / W;
      tip.style.left = (xPx * s) + "px";
      tip.style.top = (yPx * s) + "px";
      tip.classList.add("show");
    }
    function ocultar() { tip.classList.remove("show"); }

    var zonas = el("g", {}, svg);

    if (tipo === "line") {
      var paso = iw / (n - 1);
      var xs = vals.map(function (_, i) { return L + i * paso; });
      var gid = "grad-linea-" + (++idGradiente);
      el("defs", {}, svg).innerHTML =
        '<linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + COLOR_LINEA + '" stop-opacity=".28"/>' +
        '<stop offset="1" stop-color="' + COLOR_LINEA + '" stop-opacity="0"/></linearGradient>';

      var d = xs.map(function (x, i) { return (i ? "L" : "M") + x + " " + y(vals[i]); }).join(" ");
      el("path", { d: d + " L" + xs[n - 1] + " " + y(0) + " L" + L + " " + y(0) + " Z", fill: "url(#" + gid + ")", "class": "area" }, svg);
      var guia = el("line", { "class": "xh", y1: T, y2: T + ih }, svg);
      var linea = el("path", { d: d, "class": "line" }, svg);

      var largo = linea.getTotalLength();
      linea.style.strokeDasharray = largo;
      linea.style.strokeDashoffset = reduce ? 0 : largo;
      linea.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1)";

      var puntos = xs.map(function (x, i) {
        return el("circle", { cx: x, cy: y(vals[i]), r: 5, "class": "dot" + (i === 0 || i === n - 1 ? " end" : "") }, svg);
      });

      xs.forEach(function (x, i) {
        el("text", { x: x, y: H - 10, "text-anchor": "middle" }, axis).textContent = "S" + (i + 1);
        el("rect", { x: x - paso / 2, y: T, width: paso, height: ih, fill: "transparent" }, zonas)
          .addEventListener("pointerenter", function () {
            guia.setAttribute("x1", x); guia.setAttribute("x2", x); guia.classList.add("show");
            puntos.forEach(function (p, j) { p.classList.toggle("hl", j === i); });
            mostrar(i, x, y(vals[i]) - 8);
          });
      });
      zonas.addEventListener("pointerleave", function () {
        guia.classList.remove("show");
        puntos.forEach(function (p) { p.classList.remove("hl"); });
        ocultar();
      });
      box._animar = function () { linea.style.strokeDashoffset = 0; };

    } else {
      var banda = iw / n, ancho = banda * 0.56;
      var barras = vals.map(function (v, i) {
        var x = L + i * banda + (banda - ancho) / 2, top = y(v), h = y(0) - top, r = Math.min(4, ancho / 2);
        var ruta = "M" + x + " " + (top + h) + " V" + (top + r) + " Q" + x + " " + top + " " + (x + r) + " " + top +
                   " H" + (x + ancho - r) + " Q" + (x + ancho) + " " + top + " " + (x + ancho) + " " + (top + r) + " V" + (top + h) + " Z";
        var b = el("path", { d: ruta, "class": "bar" }, svg);
        b.style.transitionDelay = (i * 70) + "ms";
        el("text", { x: x + ancho / 2, y: H - 10, "text-anchor": "middle" }, axis).textContent = "S" + (i + 1);
        el("rect", { x: L + i * banda, y: T, width: banda, height: ih, fill: "transparent" }, zonas)
          .addEventListener("pointerenter", function () {
            barras.forEach(function (bb, j) { bb.classList.toggle("dim", j !== i); });
            mostrar(i, x + ancho / 2, top - 6);
          });
        return b;
      });
      zonas.addEventListener("pointerleave", function () {
        barras.forEach(function (bb) { bb.classList.remove("dim"); });
        ocultar();
      });
    }

    svg.appendChild(zonas); // encima de todo para capturar el mouse
  }

  return {
    init: function () {
      var u = AY.utils;
      var cajas = u.all("[data-chart]");
      if (!cajas.length) return;

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (e.target._animar) e.target._animar();
          io.unobserve(e.target);
        });
      }, { threshold: 0.35 });

      cajas.forEach(function (box) {
        dibujar(box);
        if (u.reduce) box.classList.add("in"); else io.observe(box);
      });
    }
  };
})();
