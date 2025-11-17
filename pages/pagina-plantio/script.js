document.addEventListener('DOMContentLoaded', () => {
    // --- CARROSSÉIS DE IMAGENS ---
    // Mapeia os seletores dos carrosséis para suas respectivas listas de imagens
    const carouselsData = {
        '#carousel-destaque': [
            '../../static/roca-img1.png',
            '../../static/roca-img2.png',
            '../../static/roca-img3.png',
        ],
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