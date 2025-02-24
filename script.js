document.addEventListener('DOMContentLoaded', () => {
    // Slider de servicios
    // Configura las interacciones para el slider de servicios en la sección "Servicios"
    const cards = document.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateSlider() {
        // Actualiza la visualización del slider, mostrando solo la card activa y su punto correspondiente
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => {
        // Navega al servicio anterior en el slider (usamos ? para evitar errores si no existe)
        currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        // Navega al siguiente servicio en el slider (usamos ? para evitar errores si no existe)
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot?.addEventListener('click', () => {
            // Permite cambiar al servicio correspondiente al hacer clic en un punto (usamos ? para evitar errores)
            currentIndex = index;
            updateSlider();
        });
    });

    // Smooth scroll para enlaces del menú
    // Habilita un desplazamiento suave hacia las secciones al hacer clic en enlaces con #hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // NUEVO: Menú hamburguesa (agregado para la versión móvil)
    // Configura el comportamiento del menú hamburguesa en dispositivos móviles, verificando si los elementos existen
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');

    if (menuToggle && nav && hamburger) { // Verifica que los elementos existan antes de añadir eventos
        menuToggle.addEventListener('click', () => {
            // Alterna la visibilidad del menú al hacer clic en el ícono hamburguesa
            nav.classList.toggle('active');
            // Cambia el ícono entre hamburguesa (☰) y cierre (✖) según el estado del menú
            if (nav.classList.contains('active')) {
                hamburger.textContent = '✖'; // Ícono de cierre (X) cuando el menú está abierto
            } else {
                hamburger.textContent = '☰'; // Ícono de hamburguesa cuando el menú está cerrado
            }
        });

        // NUEVO: Cerrar menú al hacer clic en un enlace
        // Cierra el menú hamburguesa automáticamente al hacer clic en cualquier enlace dentro de él
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.textContent = '☰'; // Restaura el ícono hamburguesa después de cerrar
            });
        });
    }
});