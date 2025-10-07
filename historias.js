// Filter stories by type
function filterStories(type) {
  const cards = document.querySelectorAll(".story-card")
  const buttons = document.querySelectorAll(".filter-btn")

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active", "border-red-600", "text-red-600", "bg-red-50"))
  event.target.classList.add("active", "border-red-600", "text-red-600", "bg-red-50")

  // Filter cards
  cards.forEach((card) => {
    if (type === "todos" || card.dataset.type === type) {
      card.style.display = "block"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 10)
    } else {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      setTimeout(() => {
        card.style.display = "none"
      }, 300)
    }
  })
}

// Filter by category
function filterByCategory() {
  const category = document.getElementById("categoryFilter").value
  const cards = document.querySelectorAll(".story-card")

  cards.forEach((card) => {
    if (category === "todas" || card.dataset.category === category) {
      card.style.display = "block"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 10)
    } else {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      setTimeout(() => {
        card.style.display = "none"
      }, 300)
    }
  })
}

// Story data
const stories = {
  featured: {
    title: "De la ciudad a la sierra: Enseñando esperanza",
    author: "María Fernández",
    role: "Voluntaria desde 2023",
    image: "/peruvian-volunteer-teaching-children-in-rural-scho.jpg",
    avatar: "/peruvian-woman-smiling-portrait.jpg",
    content: `
            <p class="mb-4">Cuando María Fernández decidió dejar su cómodo trabajo como profesora en Lima para dedicar seis meses a enseñar en una escuela rural de Ayacucho, muchos pensaron que estaba loca. Pero para ella, era la oportunidad de su vida para hacer una diferencia real.</p>
            
            <p class="mb-4">"Llegué a la comunidad de San José de Secce en marzo de 2023. Era un lugar remoto, sin internet, con electricidad limitada y condiciones muy diferentes a las que estaba acostumbrada", recuerda María. "Pero lo que encontré allí fue algo que nunca imaginé: niños con una sed de aprender increíble y una comunidad que me recibió como familia."</p>
            
            <p class="mb-4">Durante su estadía, María no solo enseñó matemáticas y comunicación, sino que también implementó un programa de lectura que transformó la biblioteca escolar en el corazón de la comunidad. "Organizamos círculos de lectura donde los niños compartían historias con sus padres. Ver a familias enteras reunidas alrededor de un libro fue mágico."</p>
            
            <p class="mb-4">El impacto fue mutuo. "Yo fui a enseñar, pero terminé aprendiendo mucho más de lo que di. Aprendí sobre resiliencia, sobre comunidad, sobre lo que realmente importa en la vida. Los niños me enseñaron que la felicidad no está en las cosas materiales, sino en las conexiones humanas."</p>
            
            <p class="mb-4">Hoy, María ha regresado a Lima, pero mantiene contacto constante con la comunidad. Ha organizado donaciones de libros, ha conectado a la escuela con otras organizaciones y planea regresar cada año. "San José de Secce cambió mi vida. Ahora sé que mi propósito es seguir construyendo puentes entre la ciudad y las comunidades rurales."</p>
            
            <p class="font-semibold text-red-600">Su mensaje para futuros voluntarios: "No esperen el momento perfecto. El voluntariado no es solo dar, es intercambiar, es crecer juntos. Dense la oportunidad de transformar vidas, empezando por la suya propia."</p>
        `,
  },
  story1: {
    title: "Una nueva oportunidad de vida",
    author: "Rosa Quispe",
    role: "Beneficiaria - Puno",
    image: "/elderly-peruvian-woman-smiling-healthy.jpg",
    avatar: "/elderly-peruvian-woman.jpg",
    content: `
            <p class="mb-4">Doña Rosa Quispe, de 68 años, vivía con dolor crónico en sus rodillas desde hacía más de una década. En su comunidad de Puno, el acceso a atención médica especializada era casi imposible.</p>
            
            <p class="mb-4">"No podía caminar bien, me dolía todo el tiempo. Pensé que así iba a vivir el resto de mi vida", cuenta con los ojos húmedos. Todo cambió cuando una brigada de voluntarios médicos llegó a su comunidad.</p>
            
            <p class="mb-4">Los voluntarios no solo le brindaron atención médica gratuita, sino que coordinaron su tratamiento y seguimiento. "Me operaron de las rodillas sin cobrarme nada. Los doctores voluntarios venían cada mes a ver cómo seguía."</p>
            
            <p class="mb-4">Hoy, doña Rosa camina sin dolor y ha vuelto a tejer, su pasión de toda la vida. "Ahora puedo jugar con mis nietos, puedo trabajar en mi telar. Los voluntarios me devolvieron mi vida. Que Dios los bendiga siempre."</p>
        `,
  },
  story2: {
    title: "Limpiando nuestras playas",
    author: "Carlos Mendoza",
    role: "Voluntario - Tumbes",
    image: "/young-people-cleaning-beach-peru.jpg",
    avatar: "/young-peruvian-man-smiling.jpg",
    content: `
            <p class="mb-4">Carlos Mendoza tenía solo 22 años cuando decidió que era hora de hacer algo por las playas de su querido Tumbes. "Veía cómo cada año había más basura, más plástico. Me dolía el alma."</p>
            
            <p class="mb-4">Comenzó solo, limpiando los fines de semana. Publicaba fotos en redes sociales mostrando el antes y después. "Al principio era yo solo con mis bolsas. Pero la gente empezó a unirse."</p>
            
            <p class="mb-4">En seis meses, Carlos había creado un movimiento. Su campaña "Tumbes Limpio" movilizó a más de 200 voluntarios en un solo día, recolectando más de 2 toneladas de basura de las playas.</p>
            
            <p class="mb-4">"Lo más bonito no fueron solo las playas limpias, sino ver a familias enteras, niños, abuelos, todos trabajando juntos por un mismo objetivo. Eso es comunidad, eso es Perú."</p>
            
            <p class="mb-4">Hoy, "Tumbes Limpio" es una organización reconocida que realiza limpiezas mensuales y programas educativos en escuelas. "Empezó con un joven y una bolsa. Ahora somos cientos cambiando nuestra región."</p>
        `,
  },
  story3: {
    title: "Centro comunitario que transforma",
    author: "Manos Unidas",
    role: "Organización - Villa El Salvador",
    image: "/community-center-peru-children-activities.jpg",
    avatar: null,
    content: `
            <p class="mb-4">La ONG "Manos Unidas" nació en 2018 con un sueño: crear un espacio donde las familias de Villa El Salvador pudieran encontrar apoyo, educación y esperanza.</p>
            
            <p class="mb-4">"Comenzamos en un local prestado con solo 5 voluntarios", cuenta Patricia Rojas, fundadora de la organización. "Hoy tenemos un centro comunitario que atiende a más de 500 familias cada mes."</p>
            
            <p class="mb-4">El centro ofrece talleres gratuitos de computación, inglés, arte y oficios. También cuenta con un comedor comunitario, apoyo psicológico y asesoría legal. "Queremos ser un espacio integral donde las personas encuentren herramientas para mejorar su calidad de vida."</p>
            
            <p class="mb-4">Lo más impactante es que el 80% del personal son voluntarios de la misma comunidad. "Muchos llegaron como beneficiarios y ahora son voluntarios que ayudan a otros. Ese es el verdadero círculo virtuoso del voluntariado."</p>
            
            <p class="mb-4">El centro ha sido reconocido por el municipio y ha inspirado la creación de espacios similares en otros distritos. "Demostramos que cuando una comunidad se organiza y trabaja unida, los cambios son posibles."</p>
        `,
  },
  story4: {
    title: "Tecnología para todos",
    author: "Luis Torres",
    role: "Voluntario - Lima",
    image: "/technology-workshop-peru-students-computers.jpg",
    avatar: "/young-peruvian-man-with-glasses.jpg",
    content: `
            <p class="mb-4">Luis Torres es ingeniero de sistemas y trabaja en una empresa tecnológica en Lima. Pero los sábados por la mañana, lo encontrarás en un centro comunitario de San Juan de Lurigancho enseñando programación a jóvenes de bajos recursos.</p>
            
            <p class="mb-4">"Yo crecí en este mismo distrito. Sé lo difícil que es acceder a educación tecnológica de calidad cuando no tienes recursos", explica Luis. "Quería devolver algo de lo que la vida me dio."</p>
            
            <p class="mb-4">Su programa "Código para Todos" ha capacitado a más de 150 jóvenes en los últimos dos años. "Enseñamos desde lo básico hasta desarrollo web. Varios de mis estudiantes ya están trabajando como programadores."</p>
            
            <p class="mb-4">Lo que más le emociona son las historias de transformación. "Tengo un estudiante que era vendedor ambulante y ahora trabaja en una startup. Otro está estudiando ingeniería de sistemas en la universidad. Ver esos cambios no tiene precio."</p>
            
            <p class="mb-4">Luis ha inspirado a otros profesionales de tecnología a unirse. "Ahora somos 8 voluntarios. Queremos expandirnos a más distritos. La tecnología puede ser el gran igualador social si la hacemos accesible para todos."</p>
        `,
  },
  story5: {
    title: "Rescatando nuestras raíces",
    author: "Comunidad Cusco",
    role: "Beneficiarios - Cusco",
    image: "/peruvian-children-traditional-dance-costumes.jpg",
    avatar: "/peruvian-child-smiling.jpg",
    content: `
            <p class="mb-4">En una pequeña comunidad cerca de Cusco, un grupo de niños está aprendiendo las danzas tradicionales que sus abuelos bailaban, gracias a voluntarios dedicados a preservar la cultura andina.</p>
            
            <p class="mb-4">"Nuestros hijos estaban perdiendo la conexión con nuestras tradiciones", explica Don Martín, líder comunitario. "Los voluntarios llegaron y crearon una escuela de danzas tradicionales completamente gratuita."</p>
            
            <p class="mb-4">Cada fin de semana, 40 niños aprenden danzas como el Qhapaq Qolla, el Waca Waca y la Contradanza. Los voluntarios no solo enseñan los pasos, sino también el significado cultural e histórico de cada danza.</p>
            
            <p class="mb-4">"Mi hija ahora conoce las historias de sus ancestros", cuenta doña Juana con orgullo. "Baila con el traje tradicional que yo usaba cuando era niña. Es como si el tiempo se conectara."</p>
            
            <p class="mb-4">El grupo ha participado en festivales regionales y ha ganado varios reconocimientos. Pero lo más importante es que ha reavivado el orgullo cultural en toda la comunidad. "Nuestros niños ahora valoran de dónde vienen. Eso no tiene precio."</p>
        `,
  },
  story6: {
    title: "Sanando con el corazón",
    author: "Ana Vargas",
    role: "Voluntaria - Loreto",
    image: "/medical-volunteers-peru-rural-clinic.jpg",
    avatar: "/peruvian-nurse-woman-smiling.jpg",
    content: `
            <p class="mb-4">Ana Vargas es enfermera en un hospital de Lima, pero una vez al mes viaja a comunidades remotas de Loreto para brindar atención médica como voluntaria.</p>
            
            <p class="mb-4">"La primera vez que fui, quedé impactada", recuerda Ana. "Había personas que nunca habían visto a un médico, niños con enfermedades tratables que se complicaban por falta de atención. Supe que tenía que seguir yendo."</p>
            
            <p class="mb-4">Durante sus viajes, Ana y su equipo de voluntarios atienden entre 80 y 100 pacientes por día. "Hacemos de todo: curaciones, vacunaciones, control prenatal, educación en salud. Trabajamos desde que sale el sol hasta que se oculta."</p>
            
            <p class="mb-4">Lo que más la motiva son las relaciones que construye. "Ya conozco a las familias, sé los nombres de los niños, celebro cuando nacen bebés sanos. No es solo medicina, es amor y compromiso."</p>
            
            <p class="mb-4">Ana ha inspirado a otros profesionales de salud a unirse. "Ahora somos un equipo de 15 voluntarios. Hemos atendido a más de 5,000 personas en dos años. Cada viaje me recuerda por qué elegí ser enfermera."</p>
        `,
  },
}

// Open story modal
function openStoryModal(storyId) {
  const story = stories[storyId]
  if (!story) return

  document.getElementById("modalTitle").textContent = story.title
  document.getElementById("modalImage").src = story.image
  document.getElementById("modalAuthor").textContent = story.author
  document.getElementById("modalRole").textContent = story.role
  document.getElementById("modalContent").innerHTML = story.content

  if (story.avatar) {
    document.getElementById("modalAvatar").src = story.avatar
  } else {
    document.getElementById("modalAvatar").style.display = "none"
  }

  document.getElementById("storyModal").classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

// Close story modal
function closeStoryModal() {
  document.getElementById("storyModal").classList.add("hidden")
  document.body.style.overflow = "auto"
}

// Close modal on outside click
document.getElementById("storyModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeStoryModal()
  }
})

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".story-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    setTimeout(() => {
      card.style.transition = "all 0.5s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })
})
