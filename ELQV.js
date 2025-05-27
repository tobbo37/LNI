document.addEventListener("DOMContentLoaded", () => {
  // --- Funcionamiento del acordeón ---
  const accordionToggles = document.querySelectorAll(".accordion-toggle");
  accordionToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const currentItem = toggle.closest(".accordion-item");
      const isActive = currentItem.classList.contains("active");

      // Cierra todos los items
      document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".accordion-content").style.maxHeight = null;
      });

      // Si no estaba activo, lo abre
      if (!isActive) {
        currentItem.classList.add("active");
        const content = currentItem.querySelector(".accordion-content");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // --- Cargar datos guardados en el formulario ---
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const contactoInput = document.getElementById("contacto");

  if (nombreInput) nombreInput.value = localStorage.getItem("nombre") || "";
  if (apellidoInput) apellidoInput.value = localStorage.getItem("apellido") || "";
  if (contactoInput) contactoInput.value = localStorage.getItem("contacto") || "";

  // --- Alternar botones correo/teléfono ---
  const correoBtn = document.getElementById("correoBtn");
  const telefonoBtn = document.getElementById("telefonoBtn");

  if (correoBtn && telefonoBtn && contactoInput) {
    correoBtn.addEventListener("click", () => {
      correoBtn.classList.add("activo");
      telefonoBtn.classList.remove("activo");
      contactoInput.placeholder = "Correo Electrónico";
      contactoInput.type = "text";
    });

    telefonoBtn.addEventListener("click", () => {
      telefonoBtn.classList.add("activo");
      correoBtn.classList.remove("activo");
      contactoInput.placeholder = "Número de Teléfono";
      contactoInput.type = "tel";
    });
  }

  // --- Mostrar mensaje de bienvenida ---
  const mensajeBienvenida = document.getElementById("mensajeBienvenida");
  const mensajeContacto = document.getElementById("mensajeContacto");
  const nombreLS = localStorage.getItem("nombre") || "";
  const apellidoLS = localStorage.getItem("apellido") || "";
  const contactoLS = localStorage.getItem("contacto") || "";

  if (mensajeBienvenida) {
    mensajeBienvenida.textContent = `¡Felicidades ${nombreLS} ${apellidoLS}! Vas a poder acompañar a tu equipo favorito en este mundial de clubes!`;
  }
  if (mensajeContacto) {
    mensajeContacto.textContent = `Vas a estar recibiendo toda la información a ${contactoLS} durante el torneo!`;
  }

  // --- Manejo del formulario de registro ---
  const form = document.getElementById("registroForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const contacto = document.getElementById("contacto").value;

      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("contacto", contacto);

      window.location.href = "recompensa.html";
    });
  }
});
