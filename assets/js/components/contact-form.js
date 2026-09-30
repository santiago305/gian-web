/* =========================================================
   COMPONENTE · Formulario de contacto → WhatsApp
   Arma un mensaje con los datos del formulario y abre
   WhatsApp. No necesita servidor.
   ========================================================= */
window.AY = window.AY || {};
AY.modules = AY.modules || {};

AY.modules.contactForm = {
  init: function () {
    var form = document.getElementById("form-contacto");
    if (!form) return;

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var f = new FormData(form);
      var msg = "Hola Alexis, soy " + f.get("nombre") + ".\n" +
        "Negocio: " + f.get("negocio") + " (" + f.get("tipo") + ")\n" +
        "Me interesa: " + f.get("interes") + "\n" +
        (f.get("presupuesto") ? "Presupuesto mensual en anuncios: " + f.get("presupuesto") + "\n" : "") +
        (f.get("mensaje") ? "\n" + f.get("mensaje") : "");
      window.open(AY.utils.waLink(msg), "_blank", "noopener");
    });
  }
};
