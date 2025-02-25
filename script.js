document.addEventListener('DOMContentLoaded', () => {
    // Slider de servicios
    // Configura las interacciones para el slider de servicios en la sección "Servicios"
    const cards = document.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let touchStartX = 0; // Para rastrear el inicio del toque
    let touchMoveX = 0; // Para rastrear el movimiento del toque

    function updateSlider() {
        // Actualiza la visualización del slider, mostrando solo la card activa y su punto correspondiente
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // NUEVO: Muestra/Oculta flechas y asegura que los puntos sean visibles en móviles
        // Oculta la flecha izquierda en la primera card y la derecha en la última
        prevBtn.classList.toggle('hidden', currentIndex === 0); // Oculta flecha izquierda en la primera card
        nextBtn.classList.toggle('hidden', currentIndex === cards.length - 1); // Oculta flecha derecha en la última card
    }

    function handleSwipe() {
        // Determina si el deslizamiento fue significativo (50px como umbral)
        // Permite navegar entre cards en móviles mediante gestos táctiles
        const threshold = 50;
        if (touchMoveX - touchStartX > threshold) {
            // Deslizamiento hacia la derecha (anterior)
            currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        } else if (touchMoveX - touchStartX < -threshold) {
            // Deslizamiento hacia la izquierda (siguiente)
            currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        }
        updateSlider();
    }

    // Eventos para arrastrar en móviles
    // Permite deslizar las cards horizontalmente en dispositivos táctiles
    const slider = document.querySelector('.services-slider');
    slider?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; // Registra la posición inicial del toque
    });

    slider?.addEventListener('touchmove', (e) => {
        touchMoveX = e.touches[0].clientX; // Actualiza la posición del toque mientras se mueve
    });

    slider?.addEventListener('touchend', () => {
        handleSwipe(); // Procesa el deslizamiento al soltar el dedo
    });

    prevBtn?.addEventListener('click', () => {
        // Navega al servicio anterior en el slider mediante clic en la flecha izquierda
        currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        updateSlider();
    });

    nextBtn?.addEventListener('click', () => {
        // Navega al siguiente servicio en el slider mediante clic en la flecha derecha
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot?.addEventListener('click', () => {
            // Permite cambiar al servicio correspondiente al hacer clic en un punto
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

    // Menú hamburguesa
    // Configura el comportamiento del menú hamburguesa en dispositivos móviles, verificando si los elementos existen
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');

    if (menuToggle && nav && hamburger) {
        menuToggle.addEventListener('click', () => {
            // Alterna la visibilidad del menú al hacer clic en el ícono hamburguesa
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                hamburger.textContent = '✖'; // Ícono de cierre (X) cuando el menú está abierto
            } else {
                hamburger.textContent = '☰'; // Ícono de hamburguesa cuando el menú está cerrado
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Cierra el menú hamburguesa automáticamente al hacer clic en cualquier enlace dentro de él
                nav.classList.remove('active');
                hamburger.textContent = '☰'; // Restaura el ícono hamburguesa después de cerrar
            });
        });
    }
});