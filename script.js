
    
        // Slider Functionality
        const slider = document.getElementById('skillsSlider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const sliderDots = document.getElementById('sliderDots');
        const slides = document.querySelectorAll('.skill-slide');
        
        let currentIndex = 0;
        const slideWidth = 300 + 20; // width + gap
        const visibleSlides = Math.min(3, Math.floor(slider.parentElement.offsetWidth / slideWidth));
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            sliderDots.appendChild(dot);
        });
        
        // Update dots
        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, slides.length - visibleSlides));
            slider.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - visibleSlides) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0); // Loop back to start
            }
        });
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(slides.length - visibleSlides); // Loop to end
            }
        });
        
        // Auto-advance slides (optional)
        let slideInterval = setInterval(() => {
            if (currentIndex < slides.length - visibleSlides) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
        
        // Pause auto-advance on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (currentIndex < slides.length - visibleSlides) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0);
                }
            }, 5000);
        });
        
        // Responsive adjustments
        window.addEventListener('resize', () => {
            const newVisibleSlides = Math.min(3, Math.floor(slider.parentElement.offsetWidth / slideWidth));
            if (currentIndex > slides.length - newVisibleSlides) {
                goToSlide(slides.length - newVisibleSlides);
            }
        });