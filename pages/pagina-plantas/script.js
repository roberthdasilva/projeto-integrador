document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. LÓGICA DOS FILTROS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const plantCards = document.querySelectorAll('.planta-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove classe active de todos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona ao clicado
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                plantCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filter === 'todos' || cardCategory === filter) {
                        card.style.display = 'flex'; // ou 'block', dependendo do seu layout CSS original
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 2. LÓGICA DO POP-UP (Modal)
    // ==========================================
    const popup = document.getElementById("popup-planta");
    const popupClose = document.querySelector(".popup-close");
    const botoesInfo = document.querySelectorAll(".btn-infos");

    // Elementos internos do pop-up
    const popupImg = document.getElementById("popup-img");
    const popupNome = document.getElementById("popup-nome");
    const popupCientifico = document.getElementById("popup-cientifico");
    const popupDescricao = document.getElementById("popup-descricao");
    const popupCuriosidade = document.getElementById("popup-curiosidade");
    const popupCuidados = document.getElementById("popup-cuidados");

    // Dados das plantas
    const dadosPlantas = {
        "Boldo": {
            img: "../../static/boldo.png",
            cientifico: "Plectranthus barbatus",
            descricao: "Planta medicinal muito usada para auxiliar na digestão.",
            curiosidade: "É conhecido como boldo-do-Brasil, diferente do boldo-europeu.",
            cuidados: "Prefere meia-sombra, solo drenado e regas moderadas."
        },

        "Hortelã": {
            img: "../../static/hortela.png",
            cientifico: "Mentha spicata",
            descricao: "Erva aromática usada em chás e pratos culinários.",
            curiosidade: "Espalha-se com facilidade através de rizomas subterrâneos.",
            cuidados: "Gosta de sol indireto, solo úmido e podas frequentes."
        },

        "Capim-santo": {
            img: "../../static/capim-santo.png",
            cientifico: "Cymbopogon citratus",
            descricao: "Erva aromática usada para chás calmantes e refrescantes.",
            curiosidade: "Também é chamado de capim-limão devido ao cheiro cítrico.",
            cuidados: "Precisa de muito sol, solo fértil e regas regulares."
        },

        "Jibóia": {
            img: "../../static/jiboia.png",
            cientifico: "Epipremnum aureum",
            descricao: "Planta ornamental muito usada em interiores.",
            curiosidade: "É uma das plantas mais eficientes em purificação do ar.",
            cuidados: "Tolera baixa luz, regas moderadas e solo bem drenado."
        },

        "Costela-de-adão": {
            img: "../../static/costela-de-adao.png",
            cientifico: "Monstera deliciosa",
            descricao: "Planta de folhagem exótica muito usada em decoração.",
            curiosidade: "Os furos nas folhas ajudam a planta a resistir a ventos fortes na natureza.",
            cuidados: "Prefere meia-sombra, umidade alta e regas espaçadas."
        },

        "Areca-bambu": {
            img: "../../static/areca-bambu.png",
            cientifico: "Dypsis lutescens",
            descricao: "Palmeira ornamental muito usada em jardins e interiores.",
            curiosidade: "É considerada uma das melhores plantas para melhorar a qualidade do ar.",
            cuidados: "Gosta de luz indireta forte e solo levemente úmido."
        },

        "Tomate": {
            img: "../../static/tomate.png",
            cientifico: "Solanum lycopersicum",
            descricao: "Fruto amplamente consumido e cultivado em hortas.",
            curiosidade: "Apesar do uso culinário como legume, botanicamente é um fruto.",
            cuidados: "Precisa de sol pleno, regas frequentes e tutoramento."
        },

        "Cebolinha": {
            img: "../../static/cebolinha.png",
            cientifico: "Allium fistulosum",
            descricao: "Temperinho clássico usado em diversas receitas.",
            curiosidade: "Rebrota várias vezes após o corte, desde que bem cuidada.",
            cuidados: "Sol pleno, regas moderadas e solo rico em matéria orgânica."
        },

        "Manjericão": {
            img: "../../static/manjericao.png",
            cientifico: "Ocimum basilicum",
            descricao: "Erva aromática muito usada na culinária, especialmente em molhos.",
            curiosidade: "Há várias variedades, como manjericão roxo e manjericão italiano.",
            cuidados: "Gosta de muito sol, regas constantes e podas para estimular folhas novas."
        }
    };

    if (popup && botoesInfo.length > 0) {
        // Adicionar evento de clique nos botões "Mais infos"
        botoesInfo.forEach((btn) => {
            btn.addEventListener("click", (evento) => {
                const card = evento.target.closest(".planta-card");
                // Pega o texto do H3 dentro do card
                const nome = card.querySelector("h3").textContent.trim();

                const dados = dadosPlantas[nome];

                if (dados) {
                    // Preenche o pop-up
                    popupImg.src = dados.img;
                    popupNome.textContent = nome;
                    popupCientifico.textContent = dados.cientifico;
                    popupDescricao.textContent = dados.descricao;
                    popupCuriosidade.textContent = dados.curiosidade;
                    popupCuidados.textContent = dados.cuidados;

                    // Mostra o pop-up
                    popup.style.display = "flex";
                } else {
                    console.error("Dados não encontrados para a planta:", nome);
                }
            });
        });

        // Fechar ao clicar no X
        if (popupClose) {
            popupClose.addEventListener("click", () => {
                popup.style.display = "none";
            });
        }

        // Fechar ao clicar fora do conteúdo (no fundo escuro)
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    } else {
        console.warn("Elementos do Pop-up não encontrados no DOM.");
    }

    // ==========================================
    // 3. LÓGICA DO CARROSSEL
    // ==========================================
    const carouselsData = {
        '#carousel-destaque': [
            '../../static/viveiro-img1.png',
            '../../static/viveiro-img3.png',
            '../../static/viveiro-img5.png',
            '../../static/viveiro-img6.png',
            '../../static/viveiro-img4.png',
            '../../static/viveiro-img2.png',
            '../../static/viveiro-img7.png'
        ],
        // Se este ID não existir no HTML, o script irá ignorá-lo sem travar
        '#carousel-viveiro': [
            '../../static/viveiro-img2.png',
            '../../static/viveiro-img4.png'
        ]
    };

    Object.entries(carouselsData).forEach(([selector, images]) => {
        const carouselElement = document.querySelector(selector);

        if (carouselElement) {
            let currentIndex = 0;
            const slides = [];

            // Limpa o carrossel antes de adicionar (evita duplicatas se rodar 2x)
            carouselElement.innerHTML = '';

            images.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.style.backgroundImage = `url('${src}')`;
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

            // Só inicia o intervalo se houver mais de 1 imagem e slides criados
            if (slides.length > 1) {
                setInterval(() => {
                    slides[currentIndex].classList.remove('active');
                    slides[currentIndex].setAttribute('aria-hidden', 'true');

                    currentIndex = (currentIndex + 1) % slides.length;

                    slides[currentIndex].classList.add('active');
                    slides[currentIndex].setAttribute('aria-hidden', 'false');
                }, 4000);
            }
        }
    });
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

        const found = highlightText(document.querySelector('.page-wrapper'), searchTerm);

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