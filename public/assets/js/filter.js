/**
 * Script Filtering and Sorting
 * Scholar's Study - Dark Academia Portfolio
 */

document.addEventListener('DOMContentLoaded', function () {
    const scriptsGrid = document.getElementById('scripts-grid');
    const noResults = document.getElementById('no-results');
    const sortSelect = document.getElementById('filter-sort');
    const typeSelect = document.getElementById('filter-type');
    const tagsContainer = document.getElementById('filter-tags');
    const resetButton = document.getElementById('filter-reset');

    if (!scriptsGrid) return;

    // Get all script cards
    const scriptCards = Array.from(scriptsGrid.querySelectorAll('.script-card'));

    // Extract unique types and tags from cards
    const allTypes = new Set();
    const allTags = new Set();

    scriptCards.forEach(card => {
        const type = card.dataset.type;
        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];

        if (type) allTypes.add(type);
        tags.forEach(tag => allTags.add(tag.trim()));
    });

    // Populate type dropdown
    if (typeSelect && allTypes.size > 0) {
        allTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            typeSelect.appendChild(option);
        });
    }

    // Create tag filter buttons
    if (tagsContainer && allTags.size > 0) {
        allTags.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.className = 'tag-filter';
            tagButton.textContent = tag;
            tagButton.dataset.tag = tag;
            tagButton.setAttribute('aria-pressed', 'false');
            tagsContainer.appendChild(tagButton);
        });
    }

    // State
    let selectedTags = new Set();
    let selectedType = 'all';
    let currentSort = 'date-desc';

    // Apply filters and sorting
    function applyFiltersAndSort() {
        let visibleCount = 0;

        scriptCards.forEach(card => {
            const cardType = card.dataset.type || '';
            const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(t => t.trim()) : [];

            const typeMatch = selectedType === 'all' || cardType === selectedType;
            const tagMatch = selectedTags.size === 0 ||
                Array.from(selectedTags).every(tag => cardTags.includes(tag));

            if (typeMatch && tagMatch) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        sortCards();

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    function sortCards() {
        const visibleCards = scriptCards.filter(card => card.style.display !== 'none');

        visibleCards.sort((a, b) => {
            switch (currentSort) {
                case 'date-desc':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'date-asc':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                case 'title-asc':
                    return a.dataset.title.localeCompare(b.dataset.title);
                case 'title-desc':
                    return b.dataset.title.localeCompare(a.dataset.title);
                default:
                    return 0;
            }
        });

        visibleCards.forEach(card => {
            scriptsGrid.appendChild(card);
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            currentSort = this.value;
            applyFiltersAndSort();
        });
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', function () {
            selectedType = this.value;
            applyFiltersAndSort();
        });
    }

    if (tagsContainer) {
        tagsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('tag-filter')) {
                const tag = e.target.dataset.tag;

                if (selectedTags.has(tag)) {
                    selectedTags.delete(tag);
                    e.target.classList.remove('active');
                    e.target.setAttribute('aria-pressed', 'false');
                } else {
                    selectedTags.add(tag);
                    e.target.classList.add('active');
                    e.target.setAttribute('aria-pressed', 'true');
                }

                applyFiltersAndSort();
            }
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', function () {
            selectedTags.clear();
            selectedType = 'all';
            currentSort = 'date-desc';

            if (sortSelect) sortSelect.value = 'date-desc';
            if (typeSelect) typeSelect.value = 'all';

            document.querySelectorAll('.tag-filter').forEach(tag => {
                tag.classList.remove('active');
                tag.setAttribute('aria-pressed', 'false');
            });

            applyFiltersAndSort();
        });
    }

    // Initial sort
    applyFiltersAndSort();
});
