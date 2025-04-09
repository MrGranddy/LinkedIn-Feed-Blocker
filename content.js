// Function to hide the LinkedIn feed
function hideLinkedInFeed() {
    // Target the specific main feed element
    const feedSelectors = [
        'main[aria-label="Main Feed"]'
    ];

    // Function to hide elements matching selectors
    const hideElements = () => {
        feedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    element.style.display = 'none';
                }
            });
        });
    };

    // Initial hide
    hideElements();

    // Create and observe mutations to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        hideElements();
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', hideLinkedInFeed);

// Also run when the page is fully loaded
window.addEventListener('load', hideLinkedInFeed); 