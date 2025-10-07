import { Chart } from "@/components/ui/chart"
// Volunteer Growth Chart
const volunteerGrowthCtx = document.getElementById("volunteerGrowthChart")
if (volunteerGrowthCtx) {
  new Chart(volunteerGrowthCtx, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      datasets: [
        {
          label: "Voluntarios Activos",
          data: [8234, 8567, 9123, 9678, 10234, 10789, 11234, 11678, 12123, 12456, 12789, 12847],
          borderColor: "#E63946",
          backgroundColor: "rgba(230, 57, 70, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
          beginAtZero: false,
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            callback: (value) => value.toLocaleString(),
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

// Category Chart (Doughnut)
const categoryCtx = document.getElementById("categoryChart")
if (categoryCtx) {
  new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: ["Educación", "Medio Ambiente", "Salud", "Desarrollo Comunitario", "Derechos Humanos"],
      datasets: [
        {
          data: [145678, 98234, 87456, 76543, 45678],
          backgroundColor: ["#457B9D", "#2A9D8F", "#E63946", "#F4A261", "#E76F51"],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "#1D3557",
          padding: 12,
          titleColor: "#fff",
          bodyColor: "#fff",
          callbacks: {
            label: (context) => {
              const label = context.label || ""
              const value = context.parsed.toLocaleString()
              return `${label}: ${value} horas`
            },
          },
        },
      },
    },
  })
}

// Regional Chart (Bar)
const regionalCtx = document.getElementById("regionalChart")
if (regionalCtx) {
  new Chart(regionalCtx, {
    type: "bar",
    data: {
      labels: ["Lima", "Arequipa", "Cusco", "La Libertad", "Piura", "Otras"],
      datasets: [
        {
          label: "Voluntarios",
          data: [4523, 2134, 1876, 1543, 1234, 1537],
          backgroundColor: ["#457B9D", "#2A9D8F", "#E63946", "#F4A261", "#E76F51", "#264653"],
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1D3557",
          padding: 12,
          titleColor: "#fff",
          bodyColor: "#fff",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#e5e7eb",
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

// Export report functionality
document.querySelector('button:contains("Exportar Reporte")')?.addEventListener("click", () => {
  alert("Generando reporte en PDF...\n\nEsta funcionalidad se implementará con el backend.")
})

// Animate stats on scroll
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
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

// Observe all stat cards
document.querySelectorAll(".grid > div").forEach((card) => {
  observer.observe(card)
})

// Smooth scroll
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

// Real-time updates simulation (optional)
setInterval(() => {
  // Simulate real-time data updates
  const randomIncrease = Math.floor(Math.random() * 5)
  // This would be replaced with actual WebSocket or API calls
}, 30000) // Update every 30 seconds
