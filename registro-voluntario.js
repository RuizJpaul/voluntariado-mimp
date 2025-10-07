// Multi-step form navigation
let currentStep = 1

function nextStep(step) {
  // Validate current step before proceeding
  if (!validateStep(currentStep)) {
    return
  }

  // Hide current step
  document.getElementById(`step-${currentStep}`).classList.remove("active")
  document.querySelector(`[data-step="${currentStep}"]`).classList.remove("active")

  // Show next step
  currentStep = step
  document.getElementById(`step-${currentStep}`).classList.add("active")
  document.querySelector(`[data-step="${currentStep}"]`).classList.add("active")

  // Update progress indicators
  for (let i = 1; i <= currentStep; i++) {
    document.querySelector(`[data-step="${i}"]`).classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function prevStep(step) {
  // Hide current step
  document.getElementById(`step-${currentStep}`).classList.remove("active")

  // Show previous step
  currentStep = step
  document.getElementById(`step-${currentStep}`).classList.add("active")

  // Update progress indicators
  document.querySelector(`[data-step="${currentStep + 1}"]`).classList.remove("active")

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function validateStep(step) {
  let isValid = true
  const currentStepElement = document.getElementById(`step-${step}`)

  if (step === 1) {
    // Validate personal data
    const requiredFields = [
      "nombres",
      "apellidos",
      "tipoDocumento",
      "numeroDocumento",
      "fechaNacimiento",
      "genero",
      "email",
      "telefono",
      "departamento",
      "provincia",
      "password",
    ]

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId)
      if (!field.value.trim()) {
        field.classList.add("border-red-500")
        isValid = false
      } else {
        field.classList.remove("border-red-500")
      }
    })

    // Validate terms checkbox
    const terminos = document.getElementById("terminos")
    if (!terminos.checked) {
      alert("Debes aceptar los términos y condiciones para continuar")
      isValid = false
    }

    // Validate email format
    const email = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.value && !emailRegex.test(email.value)) {
      email.classList.add("border-red-500")
      alert("Por favor ingresa un correo electrónico válido")
      isValid = false
    }

    // Validate password strength
    const password = document.getElementById("password")
    if (password.value && password.value.length < 8) {
      password.classList.add("border-red-500")
      alert("La contraseña debe tener al menos 8 caracteres")
      isValid = false
    }
  }

  if (step === 2) {
    // Validate at least one cause selected
    const causasChecked = currentStepElement.querySelectorAll('input[name="causas"]:checked')
    if (causasChecked.length === 0) {
      alert("Por favor selecciona al menos una causa de interés")
      isValid = false
    }

    // Validate at least one skill selected
    const habilidadesChecked = currentStepElement.querySelectorAll('input[name="habilidades"]:checked')
    if (habilidadesChecked.length === 0) {
      alert("Por favor selecciona al menos una habilidad")
      isValid = false
    }
  }

  if (step === 3) {
    // Validate frequency selected
    const frecuenciaChecked = currentStepElement.querySelector('input[name="frecuencia"]:checked')
    if (!frecuenciaChecked) {
      alert("Por favor selecciona tu frecuencia de participación")
      isValid = false
    }

    // Validate at least one day selected
    const diasChecked = currentStepElement.querySelectorAll('input[name="dias"]:checked')
    if (diasChecked.length === 0) {
      alert("Por favor selecciona al menos un día disponible")
      isValid = false
    }

    // Validate at least one time slot selected
    const horariosChecked = currentStepElement.querySelectorAll('input[name="horarios"]:checked')
    if (horariosChecked.length === 0) {
      alert("Por favor selecciona al menos un horario disponible")
      isValid = false
    }

    // Validate at least one modality selected
    const modalidadChecked = currentStepElement.querySelectorAll('input[name="modalidad"]:checked')
    if (modalidadChecked.length === 0) {
      alert("Por favor selecciona al menos una modalidad de participación")
      isValid = false
    }
  }

  if (!isValid) {
    alert("Por favor completa todos los campos requeridos antes de continuar")
  }

  return isValid
}

// Interactive cause cards
document.addEventListener("DOMContentLoaded", () => {
  // Cause cards interaction
  const causeCards = document.querySelectorAll(".cause-card")
  causeCards.forEach((card) => {
    card.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]')
      checkbox.checked = !checkbox.checked
      this.classList.toggle("selected", checkbox.checked)
    })
  })

  // Skill tags interaction
  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]')
      checkbox.checked = !checkbox.checked
      this.classList.toggle("selected", checkbox.checked)
    })
  })

  // Day checkboxes interaction
  const dayCheckboxes = document.querySelectorAll(".day-checkbox")
  dayCheckboxes.forEach((day) => {
    day.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]')
      checkbox.checked = !checkbox.checked
      this.classList.toggle("selected", checkbox.checked)
    })
  })

  // Auto-fill summary on step 4
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.id === "step-4" && mutation.target.classList.contains("active")) {
        fillSummary()
      }
    })
  })

  const step4 = document.getElementById("step-4")
  if (step4) {
    observer.observe(step4, { attributes: true, attributeFilter: ["class"] })
  }
})

function fillSummary() {
  // Fill personal info summary
  const nombres = document.getElementById("nombres").value
  const apellidos = document.getElementById("apellidos").value
  if (nombres && apellidos) {
    document.getElementById("resumen-personal").textContent = `${nombres} ${apellidos}`
  }

  // Fill causes summary
  const causasChecked = document.querySelectorAll('input[name="causas"]:checked')
  if (causasChecked.length > 0) {
    const causasText = Array.from(causasChecked)
      .map((c) => {
        const label = c.closest(".cause-card").querySelector("h4").textContent
        return label
      })
      .join(", ")
    document.getElementById("resumen-causas").textContent = causasText
  }

  // Fill skills summary
  const habilidadesChecked = document.querySelectorAll('input[name="habilidades"]:checked')
  if (habilidadesChecked.length > 0) {
    const habilidadesText = Array.from(habilidadesChecked)
      .map((h) => {
        return h.closest(".skill-tag").querySelector("span").textContent
      })
      .slice(0, 5)
      .join(", ")
    document.getElementById("resumen-habilidades").textContent =
      habilidadesText + (habilidadesChecked.length > 5 ? "..." : "")
  }

  // Fill availability summary
  const frecuencia = document.querySelector('input[name="frecuencia"]:checked')
  const diasChecked = document.querySelectorAll('input[name="dias"]:checked')
  if (frecuencia && diasChecked.length > 0) {
    const frecuenciaText = frecuencia.closest("label").querySelector(".font-medium").textContent
    const diasText = Array.from(diasChecked)
      .slice(0, 3)
      .map((d) => d.value)
      .join(", ")
    document.getElementById("resumen-disponibilidad").textContent = `${frecuenciaText} - ${diasText}`
  }
}

// Password strength indicator
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password")
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      const hasMinLength = password.length >= 8
      const hasUpperCase = /[A-Z]/.test(password)
      const hasNumber = /[0-9]/.test(password)

      if (hasMinLength && hasUpperCase && hasNumber) {
        this.classList.remove("border-red-500")
        this.classList.add("border-green-500")
      } else {
        this.classList.remove("border-green-500")
      }
    })
  }
})
