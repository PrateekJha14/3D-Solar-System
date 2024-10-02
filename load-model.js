import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// Global variables
let scene, camera, renderer, controls;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune;

// Orbit parameters
const orbitRadii = {
  mercury: 50,
  venus: 60,
  earth: 70,
  mars: 80,
  jupiter: 100,
  saturn: 120,
  uranus: 140,
  neptune: 160
};

const revolutionSpeeds = {
  mercury: 2,
  venus: 1.5,
  earth: 1,
  mars: 0.8,
  jupiter: 0.7,
  saturn: 0.6,
  uranus: 0.5,
  neptune: 0.4
};

// Function to initialize the Three.js scene
function initSolarSystem() {
  // Create the scene
  scene = new THREE.Scene();

  // Create the camera
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('solar-system-container').appendChild(renderer.domElement);

  // Create controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;

  // Set the camera position
  camera.position.z = 100;

  // Add a skybox
  function createSkyBox() {
    const skyboxImagepaths = ['./texture/skybox/space_ft.png', './texture/skybox/space_bk.png', './texture/skybox/space_up.png', './texture/skybox/space_dn.png', './texture/skybox/space_rt.png', './texture/skybox/space_lf.png'];
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);
  }
  createSkyBox();

  // Load planet textures
  function loadPlanetTexture(texture, radius, widthSegments, heightSegments, meshType) {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const loader = new THREE.TextureLoader();
    const planetTexture = loader.load(texture);
    const material = meshType === 'standard' ? new THREE.MeshStandardMaterial({ map: planetTexture }) : new THREE.MeshBasicMaterial({ map: planetTexture });
    return new THREE.Mesh(geometry, material);
  }

  // Create and add planets
  function addPlanets() {
    planet_earth = loadPlanetTexture("./texture/solarSystem/earth_hd.jpg", 4, 100, 100, 'standard');
    planet_sun = loadPlanetTexture("./texture/solarSystem/sun_hd.jpg", 20, 100, 100, 'basic');
    planet_mercury = loadPlanetTexture("./texture/solarSystem/mercury_hd.jpg", 2, 100, 100, 'standard');
    planet_venus = loadPlanetTexture("./texture/solarSystem/venus_hd.jpg", 3, 100, 100, 'standard');
    planet_mars = loadPlanetTexture("./texture/solarSystem/mars_hd.jpg", 3.5, 100, 100, 'standard');
    planet_jupiter = loadPlanetTexture("./texture/solarSystem/jupiter_hd.jpg", 10, 100, 100, 'standard');
    planet_saturn = loadPlanetTexture("./texture/solarSystem/saturn_hd.jpg", 8, 100, 100, 'standard');
    planet_uranus = loadPlanetTexture("./texture/solarSystem/uranus_hd.jpg", 6, 100, 100, 'standard');
    planet_neptune = loadPlanetTexture("./texture/solarSystem/neptune_hd.jpg", 5, 100, 100, 'standard');

    // Add planets to the scene
    scene.add(planet_earth);
    scene.add(planet_sun);
    scene.add(planet_mercury);
    scene.add(planet_venus);
    scene.add(planet_mars);
    scene.add(planet_jupiter);
    scene.add(planet_saturn);
    scene.add(planet_uranus);
    scene.add(planet_neptune);
  }
  addPlanets();

  // Add lighting
  function addLighting() {
    const sunLight = new THREE.PointLight(0xffffff, 1, 0);
    sunLight.position.copy(planet_sun.position); // Position the light at the Sun's position
    scene.add(sunLight);
  }
  addLighting();

  // Create orbit rings
  function createRings() {
    for (const planet in orbitRadii) {
      const innerRadius = orbitRadii[planet];
      const outerRadius = innerRadius - 0.1;
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 100);
      const material = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    }
  }
  createRings();

  // Animate the planets
  function animatePlanets(time) {
    const orbitSpeedMultiplier = 0.0005;

    function updatePlanet(planet, speed, radius) {
      const angle = time * orbitSpeedMultiplier * speed;
      planet.position.x = planet_sun.position.x + radius * Math.cos(angle);
      planet.position.z = planet_sun.position.z + radius * Math.sin(angle);
    }

    updatePlanet(planet_mercury, revolutionSpeeds.mercury, orbitRadii.mercury);
    updatePlanet(planet_venus, revolutionSpeeds.venus, orbitRadii.venus);
    updatePlanet(planet_earth, revolutionSpeeds.earth, orbitRadii.earth);
    updatePlanet(planet_mars, revolutionSpeeds.mars, orbitRadii.mars);
    updatePlanet(planet_jupiter, revolutionSpeeds.jupiter, orbitRadii.jupiter);
    updatePlanet(planet_saturn, revolutionSpeeds.saturn, orbitRadii.saturn);
    updatePlanet(planet_uranus, revolutionSpeeds.uranus, orbitRadii.uranus);
    updatePlanet(planet_neptune, revolutionSpeeds.neptune, orbitRadii.neptune);
  }

  // Animation loop
  function animate(time) {
    requestAnimationFrame(animate);

    // Rotate the planets
    const rotationSpeed = 0.003;
    planet_earth.rotation.y += rotationSpeed;
    planet_sun.rotation.y += rotationSpeed;
    planet_mercury.rotation.y += rotationSpeed;
    planet_venus.rotation.y += rotationSpeed;
    planet_mars.rotation.y += rotationSpeed;
    planet_jupiter.rotation.y += rotationSpeed;
    planet_saturn.rotation.y += rotationSpeed;
    planet_uranus.rotation.y += rotationSpeed;
    planet_neptune.rotation.y += rotationSpeed;

    animatePlanets(time);

    controls.update();
    renderer.render(scene, camera);
  }
  animate(0);

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Add click event listener to button
document.getElementById('load-solar-system-btn').addEventListener('click', function() {
  // Clear any existing content
  document.getElementById('solar-system-section').innerHTML = '';

  // Create container for 3D model
  const container = document.createElement('div');
  container.id = 'solar-system-container';
  document.getElementById('solar-system-section').appendChild(container);

  // Initialize and load the solar system model
  initSolarSystem();
});

document.getElementById('back-to-main-btn').addEventListener('click', function() {
    window.location.href = 'index.html'; 
  });
