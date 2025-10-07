import { Chart } from "@/components/ui/chart"
// Activity Chart
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("activityChart")
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
          {
            label: "Horas de Voluntariado",
            data: [12, 19, 15, 25, 32, 28],
            borderColor: "#E63946",
            backgroundColor: "rgba(230, 57, 70, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1D3557",
            padding: 12,
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#E63946",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#f3f4f6",
            },
            ticks: {
              callback: (value) => value + "h",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })
  }
})

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Download certificate functionality
document.querySelectorAll('button[class*="download"]').forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault()
    // Simulate certificate download
    alert("Descargando certificado... Esta funcionalidad se implementará con el backend.")
  })
})

// Confirm attendance functionality
document.querySelectorAll('button:contains("Confirmar Asistencia")').forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault()
    this.textContent = "Confirmado"
    this.classList.remove("bg-primary", "hover:bg-red-700")
    this.classList.add("bg-green-600", "cursor-not-allowed")
    this.disabled = true
  })
})

// Profile picture upload
document
  .querySelector(".fa-camera")
  ?.closest("button")
  .addEventListener("click", () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = document.querySelector('img[alt="Foto de perfil"]')
          if (img) {
            img.src = event.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  })

// Animate stats on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0"
      entry.target.style.transform = "translateY(20px)"
      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease-out"
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }, 100)
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".grid > div").forEach((card) => {
  observer.observe(card)
})
