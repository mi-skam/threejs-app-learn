let container;
let camera;
let controls;
let renderer;
let scene;

const mixers = [];
const clock = new THREE.Clock();

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  createCamera();
  createControls();
  createLights();
  loadModels();
  createRenderer();

  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}
function createCamera() {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;

  const near = 1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(-1.5, 3, 100);
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

function loadModels() {
  const loader = new THREE.GLTFLoader();

  const onLoad = (gltf, position) => {
    const model = gltf.scene.children[0];
    model.position.copy(position);

    const animation = gltf.animations[0];

    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();

    scene.add(model);
  };

  const onProgress = () => {};

  const onError = errorMessage => {
    console.log(errorMessage);
  };

  const parrotPosition = new THREE.Vector3(0, 0, 2.5);
  loader.load(
    "models/Parrot.glb",
    gltf => onLoad(gltf, parrotPosition),
    onProgress,
    onError
  );

  const flamingoPosition = new THREE.Vector3(7.5, 0, -10);
  loader.load(
    "models/Flamingo.glb",
    gltf => onLoad(gltf, flamingoPosition),
    onProgress,
    onError
  );

  const storkPosition = new THREE.Vector3(0, -2.5, -10);
  loader.load(
    "models/Stork.glb",
    gltf => onLoad(gltf, storkPosition),
    onProgress,
    onError
  );
}
function update() {
  const delta = clock.getDelta();
  for (const mixer of mixers) {
    mixer.update(delta);
  }
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  // update frustum
  camera.updateProjectionMatrix();
  // renderer and canvas!
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
