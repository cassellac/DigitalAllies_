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
        
        this.init();
    }
    
    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / this.windowWidth - 0.5) * 2;
            this.mouseY = (e.clientY / this.windowHeight - 0.5) * 2;
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        });
        
        // Get all shape elements
        this.shapes = Array.from(this.container.querySelectorAll('.floating-shape'));
        
        // Start animation loop
        this.animate();
    }
    
    animate() {
        this.shapes.forEach((shape) => {
            const speed = parseFloat(shape.dataset.speed) || 0.5;
            const rotation = parseFloat(shape.dataset.rotation) || 0;
            
            // Calculate parallax movement based on mouse position
            const moveX = this.mouseX * speed * 20;
            const moveY = this.mouseY * speed * 20;
            
            // Calculate rotation if enabled
            const rotateZ = rotation ? this.mouseX * rotation * 10 : 0;
            
            // Apply transform
            shape.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotateZ(${rotateZ}deg)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize floating shapes on all containers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-floating-shapes]');
    containers.forEach(container => {
        new FloatingShapes(container.id);
    });
});
