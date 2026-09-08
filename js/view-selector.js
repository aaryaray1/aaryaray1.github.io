// View Selector System
// Handles switching between constellation view and simplified view.

const VIEW_STORAGE_KEY = 'portfolioViewMode';
const VIEW_MODES = {
    CONSTELLATION: 'constellation',
    SIMPLIFIED: 'simplified'
};

// Inline SVG symbols rather than emoji: they inherit the current text colour,
// scale cleanly, and look the same on every platform.
const VIEW_ICONS = {
    [VIEW_MODES.CONSTELLATION]: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M4.5 15.5 10 7.5l4.5 5.5L20 5" opacity="0.55"/>
            <circle cx="4.5" cy="15.5" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="10" cy="7.5" r="2" fill="currentColor" stroke="none"/>
            <circle cx="14.5" cy="13" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="20" cy="5" r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="7" cy="20" r="0.9" fill="currentColor" stroke="none" opacity="0.6"/>
            <circle cx="18" cy="18.5" r="1.1" fill="currentColor" stroke="none" opacity="0.6"/>
        </svg>`,
    [VIEW_MODES.SIMPLIFIED]: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="3.5" y="4" width="17" height="6.5" rx="1.8"/>
            <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.8"/>
            <path d="M6.5 7.25h6M6.5 16.75h6" opacity="0.55"/>
        </svg>`
};

/**
 * Initialize the view selector system
 */
function initViewSelector() {
    const savedView = localStorage.getItem(VIEW_STORAGE_KEY);

    // Check if user has a saved preference
    if (!savedView) {
        showViewSelectorModal();
    } else {
        applyViewMode(savedView);
    }
}

/**
 * Show the view selection modal
 */
function showViewSelectorModal() {
    const modal = document.createElement('div');
    modal.id = 'viewSelectorModal';
    modal.className = 'view-selector-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'viewSelectorTitle');
    modal.innerHTML = `
        <div class="view-selector-content">
            <h1 id="viewSelectorTitle">Welcome</h1>
            <p>Choose how you would like to explore the portfolio. You can switch at any time.</p>

            <div class="view-options">
                <label class="view-option selected" id="constellationOption">
                    <input type="radio" name="viewMode" value="${VIEW_MODES.CONSTELLATION}" checked>
                    <span class="view-option-icon">${VIEW_ICONS[VIEW_MODES.CONSTELLATION]}</span>
                    <span class="view-option-title">Constellation</span>
                    <span class="view-option-desc">Navigate by the stars of a real night-sky constellation.</span>
                </label>

                <label class="view-option" id="simplifiedOption">
                    <input type="radio" name="viewMode" value="${VIEW_MODES.SIMPLIFIED}">
                    <span class="view-option-icon">${VIEW_ICONS[VIEW_MODES.SIMPLIFIED]}</span>
                    <span class="view-option-title">Simplified</span>
                    <span class="view-option-desc">A plain card layout, best on phones and small screens.</span>
                </label>
            </div>

            <div class="view-selector-buttons">
                <button id="continueBtn" type="button">Continue</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    const options = modal.querySelectorAll('.view-option');
    const continueBtn = modal.querySelector('#continueBtn');

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input').checked = true;
        });
    });

    function commit() {
        const selectedMode = modal.querySelector('input[name="viewMode"]:checked').value;
        localStorage.setItem(VIEW_STORAGE_KEY, selectedMode);

        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onKeydown);

        setTimeout(() => {
            modal.remove();
            applyViewMode(selectedMode);
        }, 300);
    }

    function onKeydown(e) {
        if (e.key === 'Enter' || e.key === 'Escape') commit();
    }

    continueBtn.addEventListener('click', commit);
    document.addEventListener('keydown', onKeydown);
    continueBtn.focus();
}

/**
 * Apply the selected view mode
 */
function applyViewMode(viewMode) {
    if (viewMode === VIEW_MODES.SIMPLIFIED) {
        loadSimplifiedView();
    } else {
        loadConstellationView();
    }

    // Add the toggle button after applying view mode
    addViewToggleButton();
}

/**
 * Load the constellation view (original)
 */
function loadConstellationView() {
    const currentPage = getCurrentPage();

    if (currentPage === 'home') {
        // Show constellation container
        const constellationContainer = document.querySelector('.constellation-container');
        if (constellationContainer) {
            constellationContainer.style.display = 'flex';
        }

        const simplifiedContainer = document.getElementById('simplifiedHomeContainer');
        if (simplifiedContainer) {
            simplifiedContainer.style.display = 'none';
        }
    } else if (currentPage === 'projects') {
        // Show projects constellation
        const constellationView = document.querySelector('.constellation-view');
        if (constellationView) {
            constellationView.style.display = 'flex';
            // Re-render if needed
            const svg = document.getElementById('projectsConstellation');
            if (svg && svg.children.length === 0) {
                window.initProjectConstellation?.();
            }
        }
        const gridView = document.querySelector('.projects-grid');
        if (gridView) {
            gridView.style.display = 'none';
        }
        setProjectsSubtitle(VIEW_MODES.CONSTELLATION);
    }
}

/**
 * Load the simplified view
 */
function loadSimplifiedView() {
    const currentPage = getCurrentPage();

    if (currentPage === 'home') {
        // Hide constellation container completely
        const constellationContainer = document.querySelector('.constellation-container');
        if (constellationContainer) {
            constellationContainer.style.display = 'none';
        }

        const simplifiedContainer = document.getElementById('simplifiedHomeContainer');
        if (simplifiedContainer) {
            simplifiedContainer.style.display = 'block';
        }
    } else if (currentPage === 'projects') {
        // Hide constellation view and show grid
        const constellationView = document.querySelector('.constellation-view');
        if (constellationView) {
            constellationView.style.display = 'none';
        }
        const gridView = document.querySelector('.projects-grid');
        if (gridView) {
            gridView.style.display = 'grid';
        }
        setProjectsSubtitle(VIEW_MODES.SIMPLIFIED);
    } else if (currentPage === 'about') {
        // About page doesn't have a view selector, but we can still notify
        // that simplified view is active
        document.body.classList.add('simplified-view-active');
    }
}

/**
 * Update the projects page subheading so it describes whichever view is
 * actually on screen (stars vs. tiles).
 */
function setProjectsSubtitle(viewMode) {
    const subtitle = document.getElementById('projectsSubtitle');
    if (!subtitle) return;

    subtitle.textContent = viewMode === VIEW_MODES.SIMPLIFIED
        ? 'Click on a tile to explore each project'
        : 'Click on a star to explore each project';
}

/**
 * Determine current page
 */
function getCurrentPage() {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('projects')) {
        return 'projects';
    } else if (pathname.includes('about')) {
        return 'about';
    } else if (pathname.includes('index') || pathname.endsWith('/')) {
        return 'home';
    }
    return 'unknown';
}

/**
 * Get current view mode
 */
function getCurrentViewMode() {
    return localStorage.getItem(VIEW_STORAGE_KEY) || VIEW_MODES.CONSTELLATION;
}

/**
 * Toggle view mode
 */
function toggleViewMode() {
    const current = getCurrentViewMode();
    const newMode = current === VIEW_MODES.CONSTELLATION ? VIEW_MODES.SIMPLIFIED : VIEW_MODES.CONSTELLATION;
    localStorage.setItem(VIEW_STORAGE_KEY, newMode);
    location.reload();
}

/**
 * Add a view mode toggle button to the page. The icon shows the view you
 * would switch *to*, not the one you are in.
 */
function addViewToggleButton() {
    if (document.getElementById('viewToggleBtn')) {
        return;
    }

    const target = getCurrentViewMode() === VIEW_MODES.CONSTELLATION
        ? VIEW_MODES.SIMPLIFIED
        : VIEW_MODES.CONSTELLATION;
    const targetName = target === VIEW_MODES.SIMPLIFIED ? 'simplified' : 'constellation';

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'viewToggleBtn';
    toggleBtn.className = 'view-toggle-btn';
    toggleBtn.type = 'button';
    toggleBtn.title = `Switch to ${targetName} view`;
    toggleBtn.setAttribute('aria-label', `Switch to ${targetName} view`);
    toggleBtn.innerHTML = VIEW_ICONS[target];
    toggleBtn.addEventListener('click', toggleViewMode);

    document.body.appendChild(toggleBtn);
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    // Only show modal if we're on home or projects page
    const currentPage = getCurrentPage();
    if (currentPage === 'home' || currentPage === 'projects') {
        initViewSelector();
    }
});

// Make functions available globally
window.portfolioViewSelector = {
    initViewSelector,
    getCurrentViewMode,
    toggleViewMode,
    applyViewMode,
    VIEW_MODES
};
