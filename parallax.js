// parallax.js
window.addEventListener('scroll', function() {
    const intro = document.getElementById('intro');
    const introContent = document.querySelector('.intro-content');
    const scrollPosition = window.scrollY;

    // Parallax effect for background
    intro.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    
    // Calculate opacity based on scroll position
    const maxScroll = window.innerHeight; // Maximum scroll height to trigger fade-out
    const opacity = 1 - Math.min(scrollPosition / maxScroll, 1); // Opacity value between 1 and 0
    introContent.style.opacity = opacity;

    // Check if elements are in viewport and apply the animation
    const planetDescriptions = document.querySelectorAll('.planet-description');
    planetDescriptions.forEach(description => {
        const rect = description.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the element is in the viewport
        if (rect.top < windowHeight && rect.bottom >= 0) {
            description.classList.add('visible');
        }
    });
});
