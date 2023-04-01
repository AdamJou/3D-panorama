import * as THREE from "./js/three.module.js";
import { OrbitControls } from "./js/OrbitControls.js";

// Select the container for the scene
const container = document.getElementById("container");

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Import your image in "load"
const loader = new THREE.TextureLoader();
const texture = loader.load("https://i.ibb.co/qj9fDN2/scifi.jpg");

const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

controls.rotateSpeed = 0.3;
const h1 = document.querySelector("h1");
const p = document.querySelector("p");
const a = document.querySelector("a");

function onWindowResize() {
  if (window.innerWidth < 768) {
    // Set the font size on mobile device
    h1.style.fontSize = "5em";
    console.log(h1.style.fontSize);
    p.style.fontSize = "2.5em";
    a.style.fontSize = "1em";
  }
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
onWindowResize();
window.addEventListener("resize", onWindowResize, false);

// Animation loop
let lastTime = 0;
const rotationSpeed = 0.00005;

function animate(time) {
  const delta = time - lastTime;
  lastTime = time;
  requestAnimationFrame(animate);

  sphere.rotation.y += rotationSpeed * delta;

  controls.update();
  renderer.render(scene, camera);
}

animate(0);
