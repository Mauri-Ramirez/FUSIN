// src/scripts/servicesModal.js
import { servicios } from "../data/services.js";

export function initServicesModal() {
  console.log("🚀 Modal dinámico inicializado");

  // Estado global
  let currentIndex = 0;

  // Elementos del modal
  const modal = document.getElementById("service-modal");
  const backdrop = document.getElementById("service-modal-backdrop");
  const closeBtn = document.getElementById("service-modal-close");
  const imgEl = document.getElementById("service-modal-img");
  const titleEl = document.getElementById("service-modal-title");
  const descEl = document.getElementById("service-modal-desc");
  const dialog = document.getElementById("service-modal-dialog");

  // Botones de navegación
  const prevBtn = document.getElementById("service-modal-prev");
  const nextBtn = document.getElementById("service-modal-next");

  const openButtons = document.querySelectorAll(".open-service-modal");

  function openModal(index) {
    const s = servicios[index];
    if (!s) return console.error("❌ Servicio no encontrado", index);

    currentIndex = index; // guardamos el índice actual

    // Poblar modal
    imgEl.src = s.imgModal || "";
    imgEl.alt = s.title || "Imagen del servicio";
    titleEl.textContent = s.title || "";
    descEl.innerHTML = Array.isArray(s.desc)
      ? `<ul class="list-disc list-inside space-y-2">${s.desc
          .map((d) => `<li>${d}</li>`)
          .join("")}</ul>`
      : s.desc || "";

    // Mostrar modal
    modal.classList.remove("hidden");

    // Animar backdrop
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");

    // Animar diálogo
    requestAnimationFrame(() => {
      dialog.classList.remove("opacity-0", "scale-95");
      dialog.classList.add("opacity-100", "scale-100");
    });

    document.documentElement.style.overflow = "hidden"; // bloquear scroll
  }

  function closeModal() {
    // Animar diálogo
    dialog.classList.remove("opacity-100", "scale-100");
    dialog.classList.add("opacity-0", "scale-95");

    // Animar backdrop
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
      document.documentElement.style.overflow = ""; // restaurar scroll
    }, 300); // debe coincidir con duration-300
  }

  // Funciones de navegación
  function showNext() {
    const newIndex = (currentIndex + 1) % servicios.length;
    openModal(newIndex);
  }

  function showPrev() {
    const newIndex =
      (currentIndex - 1 + servicios.length) % servicios.length;
    openModal(newIndex);
  }

  // Listeners
  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("👉 Click en botón, index:", btn.dataset.index);
      openModal(parseInt(btn.dataset.index));
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });
}
