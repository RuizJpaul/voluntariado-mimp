// Multi-step form navigation for organizations
let currentStepOrg = 1

function nextStepOrg(step) {
  // Validate current step before proceeding
  if (!validateStepOrg(currentStepOrg)) {
    return
  }

  // Hide current step
  document.getElementById(`step-${currentStepOrg}`).classList.remove("active")
  document.querySelector(`[data-step="${currentStepOrg}"]`).classList.remove("active")

  // Show next step
  currentStepOrg = step
  document.getElementById(`step-${currentStepOrg}`).classList.add("active")
  document.querySelector(`[data-step="${currentStepOrg}"]`).classList.add("active")

  // Update progress indicators
  for (let i = 1; i <= currentStepOrg; i++) {
    document.querySelector(`[data-step="${i}"]`).classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function prevStepOrg(step) {
  // Hide current step
  document.getElementById(`step-${currentStepOrg}`).classList.remove("active")

  // Show previous step
  currentStepOrg = step
  document.getElementById(`step-${currentStepOrg}`).classList.add("active")

  // Update progress indicators
  document.querySelector(`[data-step="${currentStepOrg + 1}"]`).classList.remove("active")

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function validateStepOrg(step) {
  let isValid = true
  const currentStepElement = document.getElementById(`step-${step}`)

  if (step === 1) {
    // Validate organization data
    const requiredFields = [
      "nombreOrg",
      "tipoOrg",
      "ruc",
      "anioFundacion",
      "mision",
      "telefonoOrg",
      "emailOrg",
      "direccion",
      "departamentoOrg",
      "provinciaOrg",
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

    // Validate RUC format (11 digits)
    const ruc = document.getElementById("ruc")
    if (ruc.value && !/^\d{11}$/.test(ruc.value)) {
      ruc.classList.add("border-red-500")
      alert("El RUC debe tener 11 dígitos")
      isValid = false
    }

    // Validate email format
    const email = document.getElementById("emailOrg")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.value && !emailRegex.test(email.value)) {
      email.classList.add("border-red-500")
      alert("Por favor ingresa un correo electrónico válido")
      isValid = false
    }
  }

  if (step === 2) {
    // Validate representative data
    const requiredFields = [
      "nombresRep",
      "apellidosRep",
      "tipoDocRep",
      "numeroDocRep",
      "cargoRep",
      "emailRep",
      "telefonoRep",
      "username",
      "passwordOrg",
      "confirmPasswordOrg",
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

    // Validate password match
    const password = document.getElementById("passwordOrg")
    const confirmPassword = document.getElementById("confirmPasswordOrg")
    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("border-red-500")
      alert("Las contraseñas no coinciden")
      isValid = false
    }

    // Validate password strength
    if (password.value && password.value.length < 8) {
      password.classList.add("border-red-500")
      alert("La contraseña debe tener al menos 8 caracteres")
      isValid = false
    }

    // Validate terms checkbox
    const terminos = document.getElementById("terminosOrg")
    if (!terminos.checked) {
      alert("Debes aceptar los términos y condiciones para continuar")
      isValid = false
    }
  }

  if (step === 3) {
    // Validate at least one area selected
    const areasChecked = currentStepElement.querySelectorAll('input[name="areasOrg"]:checked')
    if (areasChecked.length === 0) {
      alert("Por favor selecciona al menos un área de trabajo")
      isValid = false
    }

    // Validate alcance selected
    const alcanceChecked = currentStepElement.querySelector('input[name="alcance"]:checked')
    if (!alcanceChecked) {
      alert("Por favor selecciona el alcance geográfico de tu organización")
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

  // Auto-fill summary on step 4
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.id === "step-4" && mutation.target.classList.contains("active")) {
        fillSummaryOrg()
      }
    })
  })

  const step4 = document.getElementById("step-4")
  if (step4) {
    observer.observe(step4, { attributes: true, attributeFilter: ["class"] })
  }
})

function fillSummaryOrg() {
  // Fill organization summary
  const nombreOrg = document.getElementById("nombreOrg").value
  if (nombreOrg) {
    document.getElementById("resumen-org").textContent = nombreOrg
  }

  // Fill representative summary
  const nombresRep = document.getElementById("nombresRep").value
  const apellidosRep = document.getElementById("apellidosRep").value
  const cargoRep = document.getElementById("cargoRep").value
  if (nombresRep && apellidosRep) {
    document.getElementById("resumen-rep").textContent = `${nombresRep} ${apellidosRep} - ${cargoRep}`
  }

  // Fill areas summary
  const areasChecked = document.querySelectorAll('input[name="areasOrg"]:checked')
  if (areasChecked.length > 0) {
    const areasText = Array.from(areasChecked)
      .map((a) => {
        const label = a.closest(".cause-card").querySelector("h4").textContent
        return label
      })
      .join(", ")
    document.getElementById("resumen-areas").textContent = areasText
  }
}

// Password strength indicator
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("passwordOrg")
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

  // Real-time password match validation
  const confirmPasswordInput = document.getElementById("confirmPasswordOrg")
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", function () {
      const password = document.getElementById("passwordOrg").value
      if (this.value === password) {
        this.classList.remove("border-red-500")
        this.classList.add("border-green-500")
      } else {
        this.classList.remove("border-green-500")
        this.classList.add("border-red-500")
      }
    })
  }
})

// RUC validation
document.addEventListener("DOMContentLoaded", () => {
  const rucInput = document.getElementById("ruc")
  if (rucInput) {
    rucInput.addEventListener("input", function () {
      // Only allow numbers
      this.value = this.value.replace(/\D/g, "")

      // Validate length
      if (this.value.length === 11) {
        this.classList.remove("border-red-500")
        this.classList.add("border-green-500")
      } else {
        this.classList.remove("border-green-500")
      }
    })
  }
})
