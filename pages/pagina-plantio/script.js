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

    // --- FUNCIONALIDADE DE BUSCA ---
    const searchInput = document.querySelector('.busca input');
    const searchButton = document.querySelector('.botao-busca');

    function removeHighlights() {
        const highlightedElements = document.querySelectorAll('span.highlight');
        highlightedElements.forEach(el => {
            const parent = el.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize(); // Junta nós de texto adjacentes
            }
        });
    }

    function highlightText(element, searchTerm) {
        if (!element || !searchTerm.trim()) return false;

        const regex = new RegExp(searchTerm, 'gi');
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodesToProcess = [];

        while (node = walker.nextNode()) {
            if (regex.test(node.nodeValue)) {
                nodesToProcess.push(node);
            }
        }

        if (nodesToProcess.length === 0) {
            return false;
        }

        nodesToProcess.forEach(textNode => {
            const parent = textNode.parentNode;
            if (!parent) return;

            const parts = textNode.nodeValue.split(regex);
            const matches = textNode.nodeValue.match(regex);

            parts.forEach((part, index) => {
                if (part) {
                    parent.insertBefore(document.createTextNode(part), textNode);
                }
                if (index < matches.length) {
                    const highlightSpan = document.createElement('span');
                    highlightSpan.className = 'highlight';
                    highlightSpan.textContent = matches[index];
                    parent.insertBefore(highlightSpan, textNode);
                }
            });
            parent.removeChild(textNode);
        });

        return true;
    }

    function performSearch() {
        removeHighlights();
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "") {
            return;
        }

        const found = highlightText(document.querySelector('main'), searchTerm);

        if (found) {
            const firstHighlight = document.querySelector('.highlight');
            if (firstHighlight) {
                firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            alert('Nenhum resultado encontrado.');
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o comportamento padrão do formulário
            performSearch();
        }
    });
});