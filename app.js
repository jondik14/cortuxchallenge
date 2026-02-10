/**
 * Morning Melissa - Prototype App Logic
 * Enhanced with smooth animations and micro-interactions
 */

// Track current screen for transition direction
let currentScreen = 'screen-1';
let isTransitioning = false;

/**
 * Navigate to a screen with smooth transition
 */
function showScreen(screenId) {
    if (isTransitioning || screenId === currentScreen) return;
    
    isTransitioning = true;
    
    const currentEl = document.getElementById(currentScreen);
    const targetEl = document.getElementById(screenId);
    
    if (!targetEl) {
        isTransitioning = false;
        return;
    }
    
    // Determine transition direction
    const isForward = isForwardTransition(currentScreen, screenId);
    
    // Prepare target screen
    targetEl.style.display = 'block';
    targetEl.style.opacity = '0';
    targetEl.style.transform = isForward 
        ? 'translateY(12px)' 
        : 'translateY(-8px)';
    targetEl.classList.add('active');
    
    // Trigger reflow
    void targetEl.offsetHeight;
    
    // Animate current screen out
    if (currentEl) {
        currentEl.style.opacity = '0';
        currentEl.style.transform = isForward 
            ? 'translateY(-8px)' 
            : 'translateY(12px)';
        
        setTimeout(() => {
            currentEl.classList.remove('active');
            currentEl.style.display = 'none';
            currentEl.style.transform = '';
        }, 200);
    }
    
    // Animate target screen in
    requestAnimationFrame(() => {
        targetEl.style.opacity = '1';
        targetEl.style.transform = 'translateY(0)';
    });
    
    // Update state
    currentScreen = screenId;
    
    // Reset transition lock
    setTimeout(() => {
        isTransitioning = false;
        // Clear inline styles after animation
        targetEl.style.opacity = '';
        targetEl.style.transform = '';
    }, 260);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Determine if transition is forward or backward based on screen flow
 */
function isForwardTransition(from, to) {
    const order = ['screen-1', 'screen-2', 'screen-3'];
    return order.indexOf(to) > order.indexOf(from);
}

/**
 * Navigate from Dashboard to Task Detail
 */
function goToScreen2() {
    showScreen('screen-2');
}

/**
 * Navigate back to Dashboard (Screen 1)
 */
function goToScreen1() {
    showScreen('screen-1');
}

/**
 * Share access action with loading state and success flow
 */
function shareAccess() {
    const btn = document.querySelector('#screen-2 .btn-primary');
    const btnText = btn.querySelector('.btn-text');
    const btnSpinner = btn.querySelector('.btn-spinner');
    
    // Show loading state
    btn.disabled = true;
    btnText.textContent = 'Sharing...';
    btnSpinner.classList.remove('hidden');
    
    // Add subtle pulse to button during loading
    btn.style.animation = 'pulse 1.5s ease-in-out infinite';
    
    // Simulate API call delay
    setTimeout(() => {
        // Remove pulse animation
        btn.style.animation = '';
        
        // Navigate to screen 3
        showScreen('screen-3');
        
        // Show toast after screen transition starts
        setTimeout(() => {
            showToast();
        }, 150);
        
        // Reset button state for next time (delayed)
        setTimeout(() => {
            btn.disabled = false;
            btnText.textContent = 'Share access';
            btnSpinner.classList.add('hidden');
        }, 500);
    }, 600);
}

/**
 * Toast notification with smooth animation
 */
let toastTimeout;

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Clear any existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto-dismiss after 4 seconds
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 4000);
}

/**
 * Hide toast notification
 */
function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.85; }
    }
`;
document.head.appendChild(style);

/**
 * Initialize app icon button interactions
 */
function initAppIconButtons() {
    const buttons = document.querySelectorAll('.app-icon-btn');
    
    buttons.forEach(btn => {
        // Add ripple effect on click
        btn.addEventListener('click', function(e) {
            // Remove active class from siblings
            buttons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });
}

/**
 * Initialize task row interactions
 */
function initTaskRows() {
    const rows = document.querySelectorAll('.task-item.clickable');
    
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transitionDelay = '0ms';
        });
        
        row.addEventListener('click', function(e) {
            // Add click ripple/feedback
            this.style.transform = 'scale(0.995)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Escape key goes back
    if (e.key === 'Escape') {
        if (currentScreen === 'screen-2') {
            goToScreen1();
        }
    }
    
    // Enter key on focused clickable row
    if (e.key === 'Enter' && document.activeElement?.classList.contains('task-item')) {
        document.activeElement.click();
    }
});

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial screen
    currentScreen = 'screen-1';
    
    // Initialize interactions
    initAppIconButtons();
    initTaskRows();
    
    // Log ready state
    console.log('🌅 Morning Melissa Prototype loaded');
    console.log('📱 Click the first task to begin the flow');
    console.log('⌨️  Press Escape to go back');
});

/**
 * Handle window resize for responsive adjustments
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Adjust any responsive elements if needed
    }, 150);
});

/**
 * Preload images for smoother experience
 */
function preloadImages() {
    const iconPaths = [
        'Icons/inbox.png',
        'Icons/gmail.png',
        'Icons/slack.png',
        'Icons/google_drive.png',
        'Icons/google_calendar.png',
        'Icons/Notion.png',
        'Icons/Xero.png',
        'Icons/plus.png'
    ];
    
    iconPaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// Preload images
preloadImages();
