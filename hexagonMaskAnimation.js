const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const hexagonWidth = 86;
const hexagonHeight = 100; 
const halfWidth = hexagonWidth / 2;
const quarterHeight = hexagonHeight / 4;

const frameWidth = 88; // Width of a hexagon
const frameHeight = 100; // Height of a hexagon based on staggering
const staggerAdjustment = frameHeight - (3 * quarterHeight + (frameWidth - hexagonHeight));
const rows = Math.ceil((Math.floor(screenHeight / staggerAdjustment)) * 1.2)
const cols = Math.ceil((Math.floor(screenWidth / frameWidth)) * 1.2)


function addHexagons() {
    const clipPath = document.querySelector("#hexagon-clip");
    const svgNS = "http://www.w3.org/2000/svg";
    const layerBoundaries = initializeLayerBoundaries(rows);
    const xOffset = frameWidth / 2; 
    const yOffset =  frameHeight - (3 * quarterHeight + (frameWidth - hexagonHeight)); // Vertical offset per row

    for (let row = 0; row < rows; row++) {
        let yPosition = row * (frameHeight - (frameHeight - (3 * quarterHeight) - (frameWidth - hexagonWidth))); // Apply vertical staggering
        let isEvenRow = row % 2 === 0;

        for (let col = 0; col < cols; col++) {
            let xPosition = col * frameWidth + (isEvenRow ? xOffset : 0); // Apply horizontal offset to even rows

            // Determine the layer class based on the position
            let layerClass = determineLayerClass(col, row, cols, rows, layerBoundaries);

            // Points for the current hexagon
            let points = generatePointsForHexagon(xPosition, yPosition);

            // Create polygon and append to clipPath
            let polygon = document.createElementNS(svgNS, "polygon");
            polygon.setAttribute("points", points);
            polygon.classList.add(layerClass); // Add the determined layer class
            clipPath.appendChild(polygon);
        }
    }
    
}

function initializeLayerBoundaries(rows) {
    const numberOfLayers = Math.floor((rows - 1) / 2); // Calculate the number of layers
    const layerBoundaries = [];

    for (let i = 1; i <= numberOfLayers; i++) {
        layerBoundaries.push(i * frameWidth); // Each layer boundary increases by frameWidth
    }

    return layerBoundaries;
}

function determineLayerClass(col, row, cols, rows, layerBoundaries) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate the horizontal and vertical positions of the hexagon grid
    const gridWidth = cols * frameWidth;  // Total width of the grid
    const gridHeight = rows * (frameHeight - quarterHeight); // Total height of the grid, accounting for staggering

    // Find the center positions of the grid on the screen
    const gridCenterX = (screenWidth - gridWidth) / 2 + gridWidth / 2;
    const gridCenterY = (screenHeight - gridHeight) / 2 + gridHeight / 2;

    // Determine the column and row of the center hexagon based on the center of the screen
    const centerCol = Math.round(gridCenterX / frameWidth);
    const centerRow = Math.round(gridCenterY / (frameHeight - quarterHeight));

    // Calculate the horizontal and vertical distances based on hexagon grid geometry
    let xDistance = Math.abs(col - centerCol) * frameWidth;
    let yDistance = Math.abs(row - centerRow) * (frameHeight - quarterHeight); 

    // Calculate the Euclidean distance for a hexagonal grid
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    // Determine layer by comparing distance to boundaries
    for (let i = 0; i < layerBoundaries.length; i++) {
        if (distance <= layerBoundaries[i]) {
            return `layer-${i + 1}`;  // Layer names are "layer-1", "layer-2", etc.
        }
    }

    // If no boundary is met, assign to the outermost layer
    return `layer-${layerBoundaries.length + 1}`;
}

function generatePointsForHexagon(x, y) {
    // Generate points for hexagon based on x and y positions
    // This assumes all hexagons are uniform and aligned properly in rows
    return `
        ${x},${y} 
        ${x + halfWidth},${y + quarterHeight} 
        ${x + halfWidth},${y + (3 * quarterHeight)} 
        ${x},${y + hexagonHeight} 
        ${x - halfWidth},${y + (3 * quarterHeight)} 
        ${x - halfWidth},${y + quarterHeight}
    `;
}

const hexagonScaleAnimationTrigger = document.querySelector(".is-third-section")

    // Function to start the main hexagon scaling animation
function startAnimation() {
    const numberOfLayers = initializeLayerBoundaries(rows).length;
    const layers = Array.from({ length: numberOfLayers }, (_, i) => `layer-${i + 1}`);
    const timeline = gsap.timeline({ 
        defaults: { 
            duration: 0.05, 
            ease: "power4.in" 
        }
    });
    const totalDuration = 0.2;

    gsap.set('polygon', {
        scale: 0,
    });

    layers.forEach((layer, index) => {
        const elements = document.querySelectorAll(`#hexagon-clip polygon.${layer}`);
        const staggerDuration = totalDuration / elements.length; // Duration per element

        timeline.fromTo(elements, {scale: 0}, {
            scale: 1,
            stagger: {
                amount: totalDuration - staggerDuration,
                from: "random"
            },
            transformOrigin: "center center",
            ease: "power4.in"
        }, index * totalDuration);
    });
}

// ScrollTrigger to initiate the scaling from 0 to 1
ScrollTrigger.create({
    trigger: hexagonScaleAnimationTrigger, // Replace with your actual trigger selector
    start: "top 60%",
    end: "bottom top",
    onEnter: startAnimation,
    toggleActions: "play none reverse none",
    markers: true
});

// Function to enhance hexagons by scaling from 1 to 1.1
function enhanceHexagons() {
    gsap.to('.polygon', {
        scale: 1.1,
        duration: 0.2,
        ease: "power4.out",
        transformOrigin: "center center",
        stagger: {
            amount: 0.1, // Optional stagger
            from: "center"
        }
    });
}

// ScrollTrigger to initiate the enhancement scaling from 1 to 1.1
ScrollTrigger.create({
    trigger: hexagonScaleAnimationTrigger, // This could be the same or a different element
    start: "top 30%", // Start at a different scroll point
    end: "bottom top",
    onEnter: enhanceHexagons,
    toggleActions: "play none reverse none",
    markers: true
});

document.addEventListener('DOMContentLoaded', function() {
    addHexagons()
    const backgroundImg = document.querySelector('.background-img')
})
