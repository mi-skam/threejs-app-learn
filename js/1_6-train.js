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

function createMaterials() {
  const body = new THREE.MeshStandardMaterial({
    color: 0xff3333, //red
    flatShading: true
  });
  body.color.convertSRGBToLinear();

  const detail = new THREE.MeshStandardMaterial({
    color: 0x333333, // darkgrey
    flatShading: true
  });

  detail.color.convertSRGBToLinear();

  return {
    body,
    detail
  };
}
function createGeometries() {
  const nose = new THREE.CylinderBufferGeometry(0.75, 0.75, 3, 12);
  const cabin = new THREE.BoxBufferGeometry(2, 2.25, 1.5);
  const chimney = new THREE.CylinderBufferGeometry(0.3, 0.1, 0.5);
  const wheel = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 16);
  wheel.rotateX(Math.PI / 2);

  return {
    nose,
    cabin,
    chimney,
    wheel
  };
}

function createMeshes() {
  const train = new THREE.Group();
  scene.add(train);
  const materials = createMaterials();
  const geometries = createGeometries();

  const nose = new THREE.Mesh(geometries.nose, materials.body);
  nose.rotation.z = Math.PI / 2;
  nose.position.x = -1;

  const cabin = new THREE.Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 0.4, 0);

  const chimney = new THREE.Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 0.9, 0);

  const smallWheelRear = new THREE.Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.set(0, -0.5, 0);

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.scale.set(2, 2, 1.25);
  bigWheel.position.set(1.5, -0.1, 0);

  train.add(
    nose,
    cabin,
    chimney,
    smallWheelRear,
    smallWheelCenter,
    smallWheelFront,
    bigWheel
  );
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
