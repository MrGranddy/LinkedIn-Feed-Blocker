// Function to inject CSS immediately
function injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
        main[aria-label="Main Feed"],
        div[data-test-id="main-feed"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
        }
    `;
    
    // Try to inject at the very top of the document
    if (document.documentElement) {
        document.documentElement.insertBefore(style, document.documentElement.firstChild);
    } else if (document.head) {
        document.head.appendChild(style);
    }
}

// Function to hide the LinkedIn feed element (as backup)
function hideLinkedInFeed() {
    const feedSelectors = [
        'main[aria-label="Main Feed"]',
        'div[data-test-id="main-feed"]'
    ];

    const hideElements = () => {
        feedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    element.style.display = 'none';
                    element.style.visibility = 'hidden';
                    element.style.opacity = '0';
                    element.style.height = '0';
                    element.style.overflow = 'hidden';
                    element.style.pointerEvents = 'none';
                }
            });
        });
    };

    // Initial hide
    hideElements();

    // Only start observing if document.body exists
    if (document.body) {
        const observer = new MutationObserver((mutations) => {
            hideElements();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Run immediately
injectCSS();
hideLinkedInFeed();

// Also run when document is ready
document.addEventListener('DOMContentLoaded', () => {
    injectCSS();
    hideLinkedInFeed();
}); 