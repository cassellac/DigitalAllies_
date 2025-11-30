// Interactive Floating Shapes
// Inspired by clade.design's parallax background elements

class FloatingShapes {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.shapes = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.animationFrameId = null;
        
        this.init();
    }
    
    init() {
        // Get all shape elements
        this.shapes = Array.from(this.container.querySelectorAll('.floating-shape'));
        
        // Track mouse movement with throttling
        let isMouseMoving = false;
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / this.windowWidth - 0.5) * 2;
            this.mouseY = (e.clientY / this.windowHeight - 0.5) * 2;
            
            // Only update if not already updating
            if (!isMouseMoving) {
                isMouseMoving = true;
                this.updateShapes();
                
                // Use setTimeout to add smooth transition
                setTimeout(() => {
                    isMouseMoving = false;
                }, 16); // ~60fps
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.updateShapes();
        });
        
        // Add scroll listener for additional interactivity
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateShapes();
            }, 50);
        });
    }
    
    updateShapes() {
        // Retired: interactive floating shapes have been replaced by CSS-driven shapes
        // and a small initializer in `assets/js/global.js`.
        // This file is left as a placeholder for historical context and can be
        // safely removed if desired; remove only after verifying sitemaps and
        // references have been updated.

        /* no-op */

