// Global Variables
let map
let currentStoryIndex = 0
let statsAnimated = false
const L = window.L // Declare the L variable

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initMap()
  initCharts()
  observeStats()
  initCarousel()
})

// Map Initialization
function initMap() {
  // Initialize Leaflet map centered on Peru
  map = L.map("map").setView([-9.19, -75.0152], 5)

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map)

  // Sample volunteer opportunities data
  const opportunities = [
    { lat: -12.0464, lng: -77.0428, title: "Apoyo escolar", category: "educacion", city: "Lima", volunteers: 45 },
    { lat: -16.409, lng: -71.5375, title: "Campaña de salud", category: "salud", city: "Arequipa", volunteers: 32 },
    { lat: -13.5319, lng: -71.9675, title: "Reforestación", category: "ambiente", city: "Cusco", volunteers: 28 },
    { lat: -5.1945, lng: -80.6328, title: "Apoyo comunitario", category: "salud", city: "Piura", volunteers: 18 },
    { lat: -11.0191, lng: -74.2236, title: "Educación rural", category: "educacion", city: "Junín", volunteers: 22 },
    { lat: -8.1116, lng: -79.0288, title: "Inclusión social", category: "inclusion", city: "Trujillo", volunteers: 35 },
    { lat: -3.7437, lng: -73.2516, title: "Salud comunitaria", category: "salud", city: "Iquitos", volunteers: 15 },
    {
      lat: -12.5931,
      lng: -69.1892,
      title: "Preservación cultural",
      category: "cultura",
      city: "Madre de Dios",
      volunteers: 12,
    },
  ]

  // Add markers to map
  opportunities.forEach((opp) => {
    const marker = L.circleMarker([opp.lat, opp.lng], {
      radius: 8 + opp.volunteers / 5,
      fillColor: getCategoryColor(opp.category),
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
      className: `marker-${opp.category}`,
    }).addTo(map)

    marker.bindPopup(`
            <div class="p-2">
                <h4 class="font-bold text-gray-900 mb-1">${opp.title}</h4>
                <p class="text-sm text-gray-600 mb-2">${opp.city}</p>
                <p class="text-xs text-gray-500">${opp.volunteers} voluntarios activos</p>
                <button onclick="applyToOpportunity()" class="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors">
                    Ver detalles
                </button>
            </div>
        `)
  })
}

function getCategoryColor(category) {
  const colors = {
    educacion: "#3b82f6",
    salud: "#ef4444",
    ambiente: "#10b981",
    inclusion: "#8b5cf6",
    cultura: "#f59e0b",
  }
  return colors[category] || "#6b7280"
}

function filterMap(category) {
  // Update active button
  document.querySelectorAll(".map-filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  // Filter markers (simplified - in production would actually filter)
  console.log("[v0] Filtering map by category:", category)
}

// Charts Initialization
function initCharts() {
  // ODS Chart
  const odsCtx = document.getElementById("odsChart")
  if (odsCtx) {
    new Chart(odsCtx, {
      type: "bar",
      data: {
        labels: ["ODS 1", "ODS 3", "ODS 4", "ODS 5", "ODS 10", "ODS 13", "ODS 17"],
        datasets: [
          {
            label: "Horas de voluntariado",
            data: [12500, 18200, 25600, 15800, 14200, 8900, 22400],
            backgroundColor: ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"],
            borderRadius: 6,
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
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#9ca3af",
            },
            grid: {
              color: "#374151",
            },
          },
          x: {
            ticks: {
              color: "#9ca3af",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    })
  }

  // Region Chart
  const regionCtx = document.getElementById("regionChart")
  if (regionCtx) {
    new Chart(regionCtx, {
      type: "doughnut",
      data: {
        labels: ["Lima", "Arequipa", "Cusco", "Piura", "La Libertad", "Otras"],
        datasets: [
          {
            data: [4200, 1800, 1500, 1200, 1100, 5620],
            backgroundColor: ["#ef4444", "#f59e0b", "#fbbf24", "#10b981", "#3b82f6", "#8b5cf6"],
            borderWidth: 0,
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
              color: "#9ca3af",
              padding: 15,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    })
  }
}

// Stats Counter Animation
function observeStats() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats()
          statsAnimated = true
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelectorAll("[data-count]")[0]?.closest("section")
  if (statsSection) {
    observer.observe(statsSection)
  }
}

function animateStats() {
  document.querySelectorAll("[data-count]").forEach((element) => {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target.toLocaleString("es-PE")
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current).toLocaleString("es-PE")
      }
    }, 16)
  })
}

// Stories Carousel
function initCarousel() {
  updateCarousel()
}

function nextStory() {
  const track = document.getElementById("storiesTrack")
  const stories = track.children
  const totalStories = stories.length

  currentStoryIndex = (currentStoryIndex + 1) % totalStories
  updateCarousel()
}

function previousStory() {
  const track = document.getElementById("storiesTrack")
  const stories = track.children
  const totalStories = stories.length

  currentStoryIndex = (currentStoryIndex - 1 + totalStories) % totalStories
  updateCarousel()
}

function updateCarousel() {
  const track = document.getElementById("storiesTrack")
  const cardWidth = track.children[0].offsetWidth
  const offset = -currentStoryIndex * cardWidth
  track.style.transform = `translateX(${offset}px)`
}

// Modal Functions
function openRegisterModal() {
  document.getElementById("modalOverlay").classList.remove("hidden")
  document.getElementById("registerModal").classList.remove("hidden")
  document.getElementById("loginModal").classList.add("hidden")
}

function openLoginModal() {
  document.getElementById("modalOverlay").classList.remove("hidden")
  document.getElementById("loginModal").classList.remove("hidden")
  document.getElementById("registerModal").classList.add("hidden")
}

function openOrgRegisterModal() {
  alert(
    "Registro de organizaciones: En esta sección las organizaciones validarían su identidad ante el MIMP para poder publicar convocatorias.",
  )
}

function closeModals(event) {
  if (!event || event.target.id === "modalOverlay") {
    document.getElementById("modalOverlay").classList.add("hidden")
    document.getElementById("registerModal").classList.add("hidden")
    document.getElementById("loginModal").classList.add("hidden")
  }
}

function handleRegister(event) {
  event.preventDefault()
  alert(
    '¡Registro exitoso! En producción, aquí se crearía tu perfil "Mi Huella Solidaria" y realizarías el test de afinidad.',
  )
  closeModals()
}

function handleLogin(event) {
  event.preventDefault()
  alert("¡Bienvenido de vuelta! Accediendo a tu perfil...")
  closeModals()
}

// Chatbot Functions
function toggleChatbot() {
  const widget = document.getElementById("chatbotWidget")
  widget.classList.toggle("hidden")
}

function sendChatMessage() {
  const input = document.getElementById("chatInput")
  const message = input.value.trim()

  if (message) {
    addChatMessage(message, "user")
    input.value = ""

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "¡Claro! Puedo ayudarte a encontrar oportunidades de voluntariado según tus intereses. ¿Qué causa te apasiona más?",
        "Para postular a una convocatoria, primero debes crear tu perfil. ¿Te gustaría que te guíe en el proceso?",
        "Actualmente tenemos 342 convocatorias activas en todo el Perú. ¿En qué región te encuentras?",
        "Tu certificado se genera automáticamente cuando completas tus horas de voluntariado. ¿Necesitas más información?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addChatMessage(randomResponse, "bot")
    }, 1000)
  }
}

function addChatMessage(message, sender) {
  const messagesContainer = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = "flex gap-2"

  if (sender === "bot") {
    messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span>🤖</span>
            </div>
            <div class="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p class="text-sm text-gray-800">${message}</p>
            </div>
        `
  } else {
    messageDiv.className = "flex gap-2 justify-end"
    messageDiv.innerHTML = `
            <div class="bg-red-600 text-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p class="text-sm">${message}</p>
            </div>
        `
  }

  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function handleChatKeypress(event) {
  if (event.key === "Enter") {
    sendChatMessage()
  }
}

// Utility Functions
function scrollToMap() {
  document.getElementById("mapa").scrollIntoView({ behavior: "smooth" })
}

function findOpportunities() {
  const selectedCauses = []
  document.querySelectorAll(".cause-checkbox:checked").forEach((checkbox) => {
    selectedCauses.push(checkbox.value)
  })

  if (selectedCauses.length === 0) {
    alert("Por favor selecciona al menos una causa de tu interés")
    return
  }

  console.log("[v0] Selected causes:", selectedCauses)
  alert(
    `¡Perfecto! Encontramos ${Math.floor(Math.random() * 20) + 10} oportunidades que coinciden con tus intereses en ${selectedCauses.join(", ")}. Crea tu perfil para postular.`,
  )
}

function applyToOpportunity(id) {
  alert(
    'Para postular a esta convocatoria, primero debes crear tu perfil "Mi Huella Solidaria" y completar el test de afinidad.',
  )
  openRegisterModal()
}

function viewAllOpportunities() {
  alert(
    "Aquí se mostraría el catálogo completo de convocatorias con filtros avanzados por región, causa, modalidad y fecha.",
  )
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  menu.classList.toggle("hidden")
}

// Responsive carousel adjustment
window.addEventListener("resize", () => {
  updateCarousel()
})
