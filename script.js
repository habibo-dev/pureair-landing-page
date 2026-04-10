// script.js
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

menuBtn.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  menuBtn.setAttribute("aria-expanded", String(isActive));
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Smooth scroll fallback + better control
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Form handling
const orderForm = document.getElementById("orderForm");
const formMessage = document.getElementById("formMessage");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const state = document.getElementById("state").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const dzPhoneRegex = /^0[5-7][0-9]{8}$/; // مثال: 05xxxxxxxx

  if (!name || !state || !phone) {
    formMessage.textContent = "يرجى ملء جميع الحقول.";
    formMessage.style.color = "#dc2626";
    return;
  }

  if (!dzPhoneRegex.test(phone)) {
    formMessage.textContent = "يرجى إدخال رقم هاتف جزائري صحيح (مثال: 05xxxxxxxx).";
    formMessage.style.color = "#dc2626";
    return;
  }

  formMessage.textContent = "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا لتأكيد الطلب.";
  formMessage.style.color = "#0f9d58";
  orderForm.reset();
});
