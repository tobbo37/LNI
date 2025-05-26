// Script para funcionamiento del acordeón de preguntas frecuentes
document.addEventListener("DOMContentLoaded", () => {
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
  });
  

  
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos guardados
    document.getElementById("nombre").value = localStorage.getItem("nombre") || "";
    document.getElementById("apellido").value = localStorage.getItem("apellido") || "";
    document.getElementById("contacto").value = localStorage.getItem("contacto") || "";

    // Alternar botones
    const correoBtn = document.getElementById("correoBtn");
    const telefonoBtn = document.getElementById("telefonoBtn");
    const contactoInput = document.getElementById("contacto");

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
  });

  document.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("nombre") || "";
    const apellido = localStorage.getItem("apellido") || "";
    const contacto = localStorage.getItem("contacto") || "";

    const mensajeBienvenida = document.getElementById("mensajeBienvenida");
    const mensajeContacto = document.getElementById("mensajeContacto");

    mensajeBienvenida.textContent = `¡Felicidades ${nombre} ${apellido}! Vas a poder acompañar a tu equipo favorito en este mundial de clubes!`;
    mensajeContacto.textContent = `Vas a estar recibiendo toda la información a ${contacto} durante el torneo!`;
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos previos
    document.getElementById("nombre").value = localStorage.getItem("nombre") || "";
    document.getElementById("apellido").value = localStorage.getItem("apellido") || "";
    document.getElementById("contacto").value = localStorage.getItem("contacto") || "";
  
    // Alternar botones
    const correoBtn = document.getElementById("correoBtn");
    const telefonoBtn = document.getElementById("telefonoBtn");
    const contactoInput = document.getElementById("contacto");
  
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
  
    const form = document.getElementById("registroForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que se recargue la página
  
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const contacto = document.getElementById("contacto").value;
  
      // Guardar en localStorage
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("contacto", contacto);
  
      // Redirigir
      window.location.href = "recompensa.html";
    });
  });
  
  function redirectBasedOnWidth() {
    const isDesktop = window.innerWidth > 768;
    const currentPage = window.location.pathname;

    if (isDesktop && !currentPage.includes("index2.html")) {
      window.location.href = "index2.html";
    } else if (!isDesktop && !currentPage.includes("index.html")) {
      window.location.href = "index.html";
    }
  }

  // Ejecuta al cargar
  redirectBasedOnWidth();

  // Vuelve a evaluar si se cambia el tamaño
  window.addEventListener("resize", () => {
    redirectBasedOnWidth();
  });