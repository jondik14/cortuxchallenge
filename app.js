/**
 * Morning Melissa - Prototype App Logic
 * Enhanced with filters, multiple task details, and smooth interactions
 */

// Track current state
let currentScreen = 'screen-1';
let isTransitioning = false;
let currentFilter = 'all';
let completedTasks = [];

// Toast messages for different tasks
const toastMessages = {
    gmail: {
        title: 'Access shared',
        message: '<span class="highlight">Alex</span> can now view Latest Timesheet — March 2024'
    },
    xero: {
        title: 'Invoice approved',
        message: 'Payment of <span class="highlight">$4,250.00</span> to TechSupplies Co. is scheduled'
    },
    calendar: {
        title: 'Booking confirmed',
        message: 'Conference Room B is reserved for <span class="highlight">Thursday 2:00 PM</span>'
    },
    drive: {
        title: 'Review completed',
        message: '<span class="highlight">Jessica</span> has been notified of your feedback'
    },
    slack: {
        title: 'Access approved',
        message: '<span class="highlight">Emily</span> will receive her login credentials Monday'
    },
    notion: {
        title: 'Roadmap updated',
        message: 'The <span class="highlight">Product Team</span> has been notified of your changes'
    }
};

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
    // Dashboard -> Detail is forward, Detail -> Dashboard is backward
    if (from === 'screen-1' && to.startsWith('detail-')) return true;
    if (from.startsWith('detail-') && to === 'screen-1') return false;
    if (from.startsWith('detail-') && to === 'screen-3') return true;
    if (from === 'screen-1' && to === 'screen-3') return true;
    return false;
}

/**
 * Navigate to specific task detail
 */
function goToTaskDetail(taskType) {
    showScreen(`detail-${taskType}`);
}

/**
 * Navigate back to Dashboard (Screen 1)
 */
function goToScreen1() {
    showScreen('screen-1');
}

/**
 * Filter tasks by app
 */
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Get the active task list
    const taskList = document.querySelector('.screen.active .task-list');
    if (!taskList) return;
    
    const tasks = taskList.querySelectorAll('.task-item');
    let visibleCount = 0;
    
    tasks.forEach((task, index) => {
        const taskApp = task.dataset.app;
        
        if (filter === 'all' || taskApp === filter) {
            task.classList.remove('hidden');
            // Re-trigger stagger animation
            task.style.animation = 'none';
            task.offsetHeight; // Trigger reflow
            task.style.animation = `rowEnter 180ms ease forwards`;
            task.style.animationDelay = `${visibleCount * 40}ms`;
            task.style.setProperty('--stagger-delay', visibleCount);
            visibleCount++;
        } else {
            task.classList.add('hidden');
        }
    });
    
    // Show empty state if no tasks match
    if (visibleCount === 0) {
        taskList.classList.add('filtered-empty');
    } else {
        taskList.classList.remove('filtered-empty');
    }
}

/**
 * Complete a task action with loading state and completion animation
 */
function completeTask(taskType) {
    const detailScreen = document.getElementById(`detail-${taskType}`);
    const btn = detailScreen.querySelector('.btn-primary');
    const btnText = btn.querySelector('.btn-text');
    const btnSpinner = btn.querySelector('.btn-spinner');
    const originalText = btnText.textContent;
    
    // Show loading state
    btn.disabled = true;
    btnText.textContent = getLoadingText(taskType);
    btnSpinner.classList.remove('hidden');
    
    // Add subtle pulse to button during loading
    btn.style.animation = 'pulse 1.5s ease-in-out infinite';
    
    // Simulate API call delay
    setTimeout(() => {
        // Remove pulse animation
        btn.style.animation = '';
        
        // Mark task as completed
        completedTasks.push(taskType);
        
        // Navigate back to dashboard (screen-1)
        showScreen('screen-1');
        
        // After screen transition, animate the task completion
        setTimeout(() => {
            animateTaskCompletion(taskType);
        }, 300);
        
        // Reset button state for next time (delayed)
        setTimeout(() => {
            btn.disabled = false;
            btnText.textContent = originalText;
            btnSpinner.classList.add('hidden');
        }, 500);
    }, 600);
}

/**
 * Animate task completion on dashboard
 * Shows tick, then fades task away upward
 */
function animateTaskCompletion(taskType) {
    // Find the task in screen-1
    const taskList = document.querySelector('#screen-1 .task-list');
    const task = taskList.querySelector(`.task-item[data-app="${taskType}"]`);
    
    if (!task) return;
    
    // Create completion overlay with tick
    const overlay = document.createElement('div');
    overlay.className = 'task-completion-overlay';
    overlay.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    task.appendChild(overlay);
    
    // Add completing class (green background)
    task.classList.add('completing');
    
    // Trigger reflow to ensure animation plays
    void task.offsetHeight;
    
    // Wait for tick to show, then fade out
    setTimeout(() => {
        // Add exit animation class
        task.classList.add('complete-exit');
        task.classList.remove('completing');
        
        // Remove task from DOM after animation
        setTimeout(() => {
            // Get remaining count before removal
            const remainingBefore = document.querySelectorAll('#screen-1 .task-item').length;
            
            task.remove();
            
            // Update UI with new count (remainingBefore - 1)
            const newCount = remainingBefore - 1;
            updateTaskCountImmediate(newCount);
            
            // Update filter counts
            updateFilterCountsAfterCompletion(taskType);
            
            // Show toast
            showTaskToast(taskType);
            
        }, 800); // Match CSS animation duration
    }, 600); // Show tick for 600ms before fading
}

/**
 * Update the task count in header immediately with a specific number
 */
function updateTaskCountImmediate(count) {
    const subtitle = document.querySelector('#screen-1 .subtitle');
    if (subtitle) {
        const newCount = Math.max(0, count);
        subtitle.innerHTML = `<strong>${newCount} action${newCount !== 1 ? 's' : ''}</strong> need your attention today`;
    }
}

/**
 * Update filter counts after task completion on dashboard
 */
function updateFilterCountsAfterCompletion(taskType) {
    // Update "All" count
    const allFilterBtn = document.querySelector('#screen-1 .filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        const count = allFilterBtn.querySelector('.filter-count');
        const remainingTasks = document.querySelectorAll('#screen-1 .task-item').length;
        if (count) count.textContent = remainingTasks;
    }
    
    // Update specific app count to 0 or hide
    const appFilterBtn = document.querySelector(`#screen-1 .filter-btn[data-filter="${taskType}"]`);
    if (appFilterBtn) {
        const count = appFilterBtn.querySelector('.filter-count');
        if (count) count.textContent = '0';
        appFilterBtn.style.opacity = '0.5';
        appFilterBtn.style.pointerEvents = 'none';
    }
}

/**
 * Get loading text based on task type
 */
function getLoadingText(taskType) {
    const texts = {
        gmail: 'Sharing...',
        xero: 'Approving...',
        calendar: 'Confirming...',
        drive: 'Saving...',
        slack: 'Approving...',
        notion: 'Updating...'
    };
    return texts[taskType] || 'Processing...';
}

/**
 * Legacy: Update filter counts (kept for compatibility)
 * Main logic now in updateFilterCountsAfterCompletion
 */
function updateFilterCounts() {
    // This function is kept for compatibility
    // Main filter update logic is now in updateFilterCountsAfterCompletion
}

/**
 * Show task-specific toast notification
 */
let toastTimeout;

function showTaskToast(taskType) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessages[taskType]) return;
    
    // Set appropriate message
    const message = toastMessages[taskType];
    toastTitle.textContent = message.title;
    toastMessage.innerHTML = message.message;
    
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
 * Show generic toast (legacy support)
 */
function showToast() {
    showTaskToast('gmail');
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
 * Initialize app icon button interactions (removed - using filters instead)
 */
function initAppIconButtons() {
    // App icon buttons removed from header - filters are used instead
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
 * Initialize filter buttons
 */
function initFilters() {
    // Filter buttons are initialized via onclick handlers
    // This function can be extended for additional filter logic
}

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Escape key goes back
    if (e.key === 'Escape') {
        if (currentScreen.startsWith('detail-')) {
            goToScreen1();
        }
    }
    
    // Number keys 1-6 for quick filter
    if (e.key >= '1' && e.key <= '7') {
        const filters = ['all', 'gmail', 'xero', 'calendar', 'drive', 'slack', 'notion'];
        const index = parseInt(e.key) - 1;
        if (filters[index] && currentScreen === 'screen-1') {
            filterTasks(filters[index]);
        }
    }
});

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial screen
    currentScreen = 'screen-1';
    
    // Initialize interactions
    initTaskRows();
    initFilters();
    
    // Log ready state
    console.log('🌅 Morning Melissa Prototype loaded');
    console.log('📱 Click any task to view details');
    console.log('🔍 Use filter bar below header to sort by app');
    console.log('⌨️  Press 1-6 to quick filter, Escape to go back');
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
