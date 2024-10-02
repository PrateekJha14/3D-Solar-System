// Function to initialize a Three.js scene on a specific canvas
function initPlanetCanvas(planetId, texture, radius, position, ringsTexture = null) {
    const canvas = document.querySelector(`#${planetId}-canvas`);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

    // Adjust the camera position to look a bit from behind
    camera.position.set(radius, radius / 2, 2.5 * radius);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Configure lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load the space background texture
    const loader = new THREE.TextureLoader();
    loader.load('texture/space-bg.jpg', function(texture) {
        scene.background = texture;
    });

    // Create the planet
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(texture),
    });

    const planetMesh = new THREE.Mesh(geometry, material);
    planetMesh.position.set(position.x, position.y, position.z);
    scene.add(planetMesh);

    let ringMesh;
    // Add rings for Saturn
    if (ringsTexture) {
        const ringGeometry = new THREE.RingGeometry(radius * 1.4, radius * 1.8, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(ringsTexture),
            side: THREE.DoubleSide,
            transparent: true,
        });

        ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2; // Rotate to make it horizontal
        ringMesh.rotation.y = Math.PI / 4; // Tilt the rings along the y-axis
        ringMesh.rotation.z = Math.PI / 8; // Tilt the rings along the z-axis

        // Position the rings relative to the planet
        ringMesh.position.set(position.x, position.y - radius * 0.1, position.z); // Slightly downwards

        scene.add(ringMesh);
    }

    function animate() {
        requestAnimationFrame(animate);
        planetMesh.rotation.y += 0.01;

        // Update the ring position to match the planet's position without rotating
        if (ringMesh) {
            ringMesh.position.copy(planetMesh.position);
            ringMesh.position.y -= radius * 0.1; // Keep the offset downwards
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize the canvas elements for each planet
window.onload = function() {
    // Initialize planets with their textures, radius, position, and optional rings
    initPlanetCanvas('sun', 'texture/sun_hd.jpg', 1.0,{x: 0, y: 0, z: 0})
    initPlanetCanvas('mercury', 'texture/mercurymap.jpg', 0.5, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('venus', 'texture/venusmap.jpg', 0.58, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('earth', 'texture/earthmap1k.jpg', 0.6, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('mars', 'texture/marsmap1k.jpg', 0.55, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('jupiter', 'texture/jupiter.jpg', 0.7, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('saturn', 'texture/saturnmap.jpg', 0.68, { x: 0, y: 0, z: 0 }, 'texture/saturnringcolor.png');
    initPlanetCanvas('uranus', 'texture/uranusmap.jpg', 0.64, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('neptune', 'texture/neptunemap.jpg', 0.62, { x: 0, y: 0, z: 0 });
    initPlanetCanvas('pluto', 'texture/plutomap2k.jpg', 0.3, { x: 0, y: 0, z: 0 });
}