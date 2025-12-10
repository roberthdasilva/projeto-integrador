// =======================================================
// === SCRIPT DE FILTRAGEM PARA A PÁGINA DE PLANTAS ======
// =======================================================

document.addEventListener('DOMContentLoaded', function () {

    const filtrosContainer = document.querySelector('.filtros-container');

    if (!filtrosContainer) {
        return;
    }

    const filterButtons = document.querySelectorAll('.filtro-btn');
    const plantCards = document.querySelectorAll('.planta-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            plantCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filter === 'todos' || cardCategory === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    const carouselsData = {
        '#carousel-destaque': [
            'static/viveiro-img1.png',
            'static/viveiro-img3.png',
            'static/viveiro-img5.png',
            'static/viveiro-img6.png',
            'static/viveiro-img4.png',
            'static/viveiro-img2.png',
            'static/viveiro-img7.png'
        ],
        '#carousel-viveiro': [
            'static/viveiro-img2.png',
            'static/viveiro-img4.png',
            'static/viveiro-img6.png',
            'static/viveiro-img7.png',
            'static/viveiro-img3.png',
            'static/viveiro-img1.png',
            'static/viveiro-img5.png',
        ]
    };

    // Itera sobre os dados e inicializa cada carrossel
    Object.entries(carouselsData).forEach(([selector, images]) => {
        const carouselElement = document.querySelector(selector);

        if (carouselElement) {
            let currentIndex = 0;
            const slides = [];

            // Cria e adiciona os slides no contêiner
            images.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.style.backgroundImage = `url('${src}')`;

                // Atributos para acessibilidade
                slide.setAttribute('role', 'img');
                slide.setAttribute('aria-label', `Slide ${index + 1}`);

                if (index === 0) {
                    slide.classList.add('active');
                    slide.setAttribute('aria-hidden', 'false');
                } else {
                    slide.setAttribute('aria-hidden', 'true');
                }

                carouselElement.appendChild(slide);
                slides.push(slide);
            });

            function showNextImage() {
                if (slides.length <= 1) return; // Não roda o carrossel se tiver 1 ou 0 imagens
                slides[currentIndex].classList.remove('active');
                slides[currentIndex].setAttribute('aria-hidden', 'true');

                currentIndex = (currentIndex + 1) % images.length;

                slides[currentIndex].classList.add('active');
                slides[currentIndex].setAttribute('aria-hidden', 'false');
            }

            // Troca a imagem a cada 4 segundos
            setInterval(showNextImage, 4000);
        }
    });
});