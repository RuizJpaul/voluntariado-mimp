// Search functionality
const searchInput = document.getElementById("searchInput")
const locationFilter = document.getElementById("locationFilter")
const sortFilter = document.getElementById("sortFilter")
const opportunitiesContainer = document.getElementById("opportunitiesContainer")

// Filter sidebar toggle for mobile
const filterBtn = document.getElementById("filterBtn")
const filterSidebar = document.getElementById("filterSidebar")

filterBtn?.addEventListener("click", () => {
  filterSidebar.classList.toggle("hidden")
})

// Clear filters
document.getElementById("clearFilters")?.addEventListener("click", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false
  })
  document.querySelectorAll('input[type="radio"][value="all"]').forEach((radio) => {
    radio.checked = true
  })
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.value = ""
  })
})

// Search and filter functionality
function filterOpportunities() {
  const searchTerm = searchInput?.value.toLowerCase() || ""
  const location = locationFilter?.value || ""
  const cards = document.querySelectorAll(".opportunity-card")

  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || ""
    const description = card.querySelector("p")?.textContent.toLowerCase() || ""
    const cardLocation = card.querySelector(".fa-map-marker-alt")?.nextElementSibling?.textContent.toLowerCase() || ""

    const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm)
    const matchesLocation = !location || cardLocation.includes(location.toLowerCase())

    if (matchesSearch && matchesLocation) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

searchInput?.addEventListener("input", filterOpportunities)
locationFilter?.addEventListener("change", filterOpportunities)

// Sort functionality
sortFilter?.addEventListener("change", (e) => {
  const sortValue = e.target.value
  const cards = Array.from(document.querySelectorAll(".opportunity-card"))

  cards.sort((a, b) => {
    if (sortValue === "recommended") {
      const matchA = Number.parseInt(a.querySelector(".bg-green-500, .bg-amber-500")?.textContent) || 0
      const matchB = Number.parseInt(b.querySelector(".bg-green-500, .bg-amber-500")?.textContent) || 0
      return matchB - matchA
    } else if (sortValue === "urgent") {
      const urgentA = a.querySelector(".bg-red-100") ? 1 : 0
      const urgentB = b.querySelector(".bg-red-100") ? 1 : 0
      return urgentB - urgentA
    }
    return 0
  })

  cards.forEach((card) => opportunitiesContainer?.appendChild(card))
})

// Favorite functionality
document.querySelectorAll(".fa-heart").forEach((icon) => {
  icon.closest("button")?.addEventListener("click", function (e) {
    e.preventDefault()
    const heartIcon = this.querySelector(".fa-heart")
    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far")
      heartIcon.classList.add("fas")
      heartIcon.classList.add("text-primary")
    } else {
      heartIcon.classList.remove("fas")
      heartIcon.classList.add("far")
      heartIcon.classList.remove("text-primary")
    }
  })
})

// Apply button functionality
document.querySelectorAll('button:contains("Postularme")').forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault()
    const card = this.closest(".opportunity-card")
    const title = card.querySelector("h3")?.textContent

    // Show confirmation
    if (confirm(`¿Deseas postularte a "${title}"?`)) {
      this.textContent = "Postulación Enviada"
      this.classList.remove("bg-primary", "hover:bg-red-700")
      this.classList.add("bg-green-600", "cursor-not-allowed")
      this.disabled = true

      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      successMsg.textContent = "¡Postulación enviada exitosamente!"
      document.body.appendChild(successMsg)

      setTimeout(() => {
        successMsg.remove()
      }, 3000)
    }
  })
})

// View details functionality
document.querySelectorAll('button:contains("Ver detalles")').forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault()
    const card = this.closest(".opportunity-card")
    const title = card.querySelector("h3")?.textContent
    alert(`Mostrando detalles de: ${title}\n\nEsta funcionalidad se implementará con el backend.`)
  })
})

// Category filter functionality
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(
      (cb) => cb.value,
    )

    const cards = document.querySelectorAll(".opportunity-card")

    if (selectedCategories.length === 0) {
      cards.forEach((card) => (card.style.display = "block"))
      return
    }

    cards.forEach((card) => {
      const badges = Array.from(card.querySelectorAll(".px-2.py-1")).map((badge) => badge.textContent.toLowerCase())

      const hasMatch = selectedCategories.some((category) => badges.some((badge) => badge.includes(category)))

      card.style.display = hasMatch ? "block" : "none"
    })
  })
})

// Modality filter
document.querySelectorAll('input[name="modality"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const modality = e.target.value
    const cards = document.querySelectorAll(".opportunity-card")

    if (modality === "all") {
      cards.forEach((card) => (card.style.display = "block"))
      return
    }

    cards.forEach((card) => {
      const badges = Array.from(card.querySelectorAll(".px-2.py-1")).map((badge) => badge.textContent.toLowerCase())

      const hasModality = badges.some((badge) => badge.includes(modality))
      card.style.display = hasModality ? "block" : "none"
    })
  })
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

// Animate cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0"
      entry.target.style.transform = "translateY(20px)"
      setTimeout(() => {
        entry.target.style.transition = "all 0.5s ease-out"
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }, 100)
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".opportunity-card").forEach((card) => {
  observer.observe(card)
})
