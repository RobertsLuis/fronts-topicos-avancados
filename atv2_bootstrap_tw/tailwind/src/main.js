import "./styles.css";

const menuToggle = document.querySelector("#menu-toggle");
const navigationMenu = document.querySelector("#navigation-menu");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigationMenu.classList.add("hidden");
  navigationMenu.classList.remove("flex");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigationMenu.classList.toggle("hidden", isExpanded);
  navigationMenu.classList.toggle("flex", !isExpanded);
});

navigationMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 768px)").addEventListener("change", closeMenu);

const carousel = document.querySelector("#finance-carousel");
const carouselTrack = document.querySelector("#carousel-track");
const slides = [...carouselTrack.children];
const slideIndicators = [...carousel.querySelectorAll("[data-slide-index]")];
const slideStatus = document.querySelector("#slide-status");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentSlide;
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.inert = !isActive;
    const indicator = slideIndicators[slideIndex];
    indicator.setAttribute("aria-current", String(isActive));
    indicator.firstElementChild.classList.toggle("bg-neutral-900", isActive);
    indicator.firstElementChild.classList.toggle("bg-neutral-400", !isActive);
  });
  slideStatus.textContent = `Slide ${currentSlide + 1} de ${slides.length}: ${slides[currentSlide].querySelector("h2").textContent}.`;
}

document
  .querySelector("#previous-slide")
  .addEventListener("click", () => showSlide(currentSlide - 1));
document
  .querySelector("#next-slide")
  .addEventListener("click", () => showSlide(currentSlide + 1));
slideIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => showSlide(index));
});
carousel.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  showSlide(currentSlide + (event.key === "ArrowRight" ? 1 : -1));
});

const transactionForm = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const formStatus = document.querySelector("#form-status");

descriptionInput.addEventListener("input", () => {
  descriptionInput.setCustomValidity(
    descriptionInput.value.trim().length < 2
      ? "Informe uma descrição com pelo menos 2 caracteres."
      : "",
  );
});

transactionForm.addEventListener("input", () => {
  formStatus.textContent = "";
});

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!transactionForm.reportValidity()) return;
  formStatus.textContent =
    "Lançamento validado. Esta demonstração não altera a tabela.";
  transactionForm.reset();
  descriptionInput.setCustomValidity("");
});

const budgetDialog = document.querySelector("#budget-dialog");
const reviewButton = document.querySelector("#open-review");
const reviewStatus = document.querySelector("#review-status");

reviewButton.addEventListener("click", () => {
  budgetDialog.returnValue = "";
  reviewStatus.textContent = "";
  budgetDialog.showModal();
});

budgetDialog.addEventListener("close", () => {
  if (budgetDialog.returnValue === "confirm") {
    reviewStatus.textContent = "Revisão do orçamento confirmada.";
  }
  reviewButton.focus();
});

budgetDialog.addEventListener("click", (event) => {
  if (event.target !== budgetDialog) return;
  const bounds = budgetDialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  ) {
    budgetDialog.close();
  }
});
