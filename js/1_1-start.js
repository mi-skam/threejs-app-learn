/// connects to <div id="scene-container"></div>
const container = document.querySelector("#scene-container");

const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");
// camera setup
const fov = 45;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);
// mesh = geometry + material
const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: "grey" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
renderer.render(scene, camera);
