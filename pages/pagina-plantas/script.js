// =======================================================
// === SCRIPT DE FILTRAGEM PARA A PÁGINA DE PLANTAS ======
// =======================================================

document.addEventListener('DOMContentLoaded', function() {
    
    const filtrosContainer = document.querySelector('.filtros-container');
    
    if (!filtrosContainer) {
        return; 
    }

    const filterButtons = document.querySelectorAll('.filtro-btn');
    const plantCards = document.querySelectorAll('.planta-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
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
});