/**
 * Archived Asset: floating-shapes.js
 * Original Path: /assets/js/floating-shapes.js
 * Archived On: 2025-10-29
 * Reason: Gradient aesthetic paused for brand-aligned, flat background pass
 * To Re-enable:
 *   - Re-add <script> tag or import to bundle in HTML files
 *   - Add .floating-shapes-container to target sections
 *   - Confirm prefers-reduced-motion guards remain intact
 */

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
        this.shapes.forEach((shape) => {
            const speed = parseFloat(shape.dataset.speed) || 0.5;
            const rotation = parseFloat(shape.dataset.rotation) || 0;
            
            // Calculate parallax movement based on mouse position
            const moveX = this.mouseX * speed * 25;
            const moveY = this.mouseY * speed * 25;
            
            // Calculate rotation if enabled
            const rotateZ = rotation ? this.mouseX * rotation * 8 : 0;
            
            // Apply transform smoothly
            shape.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotateZ(${rotateZ}deg)`;
        });
    }
}

// Initialize floating shapes on all containers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-floating-shapes]');
    containers.forEach(container => {
        new FloatingShapes(container.id);
    });
});
