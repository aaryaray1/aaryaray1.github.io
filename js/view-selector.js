// View Selector System
// Handles switching between constellation view and simplified view

const VIEW_STORAGE_KEY = 'portfolioViewMode';
const VIEW_MODES = {
    CONSTELLATION: 'constellation',
    SIMPLIFIED: 'simplified'
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
    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'viewSelectorModal';
    modal.className = 'view-selector-modal';
    modal.innerHTML = `
        <div class="view-selector-content">
            <h1>Welcome! 🌌</h1>
            <p>Choose your preferred way to explore my portfolio</p>
            
            <div class="view-options">
                <label class="view-option" id="constellationOption">
                    <input type="radio" name="viewMode" value="${VIEW_MODES.CONSTELLATION}" checked>
                    <span class="view-option-icon">✨</span>
                    <div class="view-option-title">Original View</div>
                    <div class="view-option-desc">Constellation-based navigation with an interactive cosmic experience</div>
                </label>
                
                <label class="view-option" id="simplifiedOption">
                    <input type="radio" name="viewMode" value="${VIEW_MODES.SIMPLIFIED}">
                    <span class="view-option-icon">📱</span>
                    <div class="view-option-title">Simplified View</div>
                    <div class="view-option-desc">Card-based layout, recommended for mobile and smaller screens</div>
                </label>
            </div>
            
            <div class="view-selector-buttons">
                <button id="continueBtn">Continue</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Setup event listeners
    const options = document.querySelectorAll('.view-option');
    const continueBtn = document.getElementById('continueBtn');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input').checked = true;
        });
    });
    
    continueBtn.addEventListener('click', () => {
        const selectedMode = document.querySelector('input[name="viewMode"]:checked').value;
        localStorage.setItem(VIEW_STORAGE_KEY, selectedMode);
        
        // Close modal with animation
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            modal.remove();
            applyViewMode(selectedMode);
        }, 300);
    });
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
            constellationView.style.display = 'block';
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
    } else if (currentPage === 'about') {
        // About page doesn't have a view selector, but we can still notify
        // that simplified view is active
        document.body.classList.add('simplified-view-active');
    }
}

/**
 * Determine current page
 */
function getCurrentPage() {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('index') || pathname.endsWith('/')) {
        return 'home';
    } else if (pathname.includes('projects')) {
        return 'projects';
    } else if (pathname.includes('about')) {
        return 'about';
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
 * Toggle view mode (useful for a toggle button if needed later)
 */
function toggleViewMode() {
    const current = getCurrentViewMode();
    const newMode = current === VIEW_MODES.CONSTELLATION ? VIEW_MODES.SIMPLIFIED : VIEW_MODES.CONSTELLATION;
    localStorage.setItem(VIEW_STORAGE_KEY, newMode);
    location.reload();
}

/**
 * Add a view mode toggle button to the page
 */
function addViewToggleButton() {
    // Check if button already exists
    if (document.getElementById('viewToggleBtn')) {
        return;
    }

    const currentMode = getCurrentViewMode();
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'viewToggleBtn';
    toggleBtn.className = 'view-toggle-btn';
    toggleBtn.title = `Switch to ${currentMode === VIEW_MODES.CONSTELLATION ? 'Simplified' : 'Constellation'} View`;
    toggleBtn.innerHTML = currentMode === VIEW_MODES.CONSTELLATION ? '📱' : '✨';
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
