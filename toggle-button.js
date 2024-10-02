window.addEventListener('scroll', function() {
    const solarSystemSection = document.getElementById('solar-system-section');
    const backToMainBtn = document.getElementById('back-to-main-btn');
    const rect = solarSystemSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the solar system section is in view
    if (rect.top < windowHeight && rect.bottom >= 0) {
        backToMainBtn.style.display = 'block'; // Show the button
    } else {
        backToMainBtn.style.display = 'none'; // Hide the button
    }
});

document.getElementById('back-to-main-btn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to top smoothly
});
