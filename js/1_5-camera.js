// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {
  // Get a reference to the container element that will hold our scene
  container = document.querySelector("#scene-container");

  // create a Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}
function createCamera() {
  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 5;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(-4, 4, 10);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // bright sky color
    0x202020, // dim ground color
    5 // intensity
  );

  const directLight = new THREE.DirectionalLight(0xffffff, 5);
  directLight.position.set(10, 10, 10);

  scene.add(ambientLight, directLight);
}

function createMeshes() {
  // create a geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // create a texture loader
  const textureLoader = new THREE.TextureLoader();
  // load a texture
  const texture = textureLoader.load("../textures/uv_test_bw.png");
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({
    map: texture
  });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh(geometry, material);

  // add the mesh to the scene object
  scene.add(mesh);
}

function createRenderer() {
  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  // set the gamma correction so that output colors look
  // correct on our screens
  renderer.gammaFactor = 2.2;
  renderer.outputEncoding = THREE.GammaEncoding;
  renderer.physicallyCorrectLights = true;

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
}

function update() {}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  // update the camera's frustum
  camera.updateProjectionMatrix();
  // renderer and canvas!
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

// call the init function to set everything up
init();
