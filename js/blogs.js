// Store original cards array
let originalCards = [];

// Function to sort and filter blog cards
function updateblogDisplay() {
    const sortFilter = document.getElementById('sortFilter');
    const typeFilter = document.getElementById('typeFilter');
    const blogGrid = document.querySelector('.blog-grid');

    const sortValue = sortFilter.value;
    const typeValue = typeFilter.value;

    // If originalCards is empty (first load), store the initial cards
    if (originalCards.length === 0) {
        originalCards = Array.from(blogGrid.querySelectorAll('.blog-card'));
    }

    // Filter cards by type
    let filteredCards = originalCards;
    if (typeValue !== 'all') {
        filteredCards = originalCards.filter(card => card.dataset.type === typeValue);
    }

    // Sort cards by date
    filteredCards.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return sortValue === 'latest' ? dateB - dateA : dateA - dateB;
    });

    // Clear the grid
    while (blogGrid.firstChild) {
        blogGrid.removeChild(blogGrid.firstChild);
    }

    // Add filtered and sorted cards back to the grid
    filteredCards.forEach(card => {
        blogGrid.appendChild(card.cloneNode(true));
    });

    // Reinitialize animations
    setTimeout(() => {
        const currentCards = blogGrid.querySelectorAll('.blog-card');
        currentCards.forEach(card => {
            card.classList.add('animated');
        });
    }, 50);
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    const sortFilter = document.getElementById('sortFilter');
    const typeFilter = document.getElementById('typeFilter');

    // Initialize with default sorting
    updateblogDisplay();

    // Add event listeners for filter changes
    sortFilter.addEventListener('change', updateblogDisplay);
    typeFilter.addEventListener('change', updateblogDisplay);

    // Initialize animations after page load
    setTimeout(() => {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.classList.add('animated');
        });
    }, 300);
});