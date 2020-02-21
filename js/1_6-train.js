let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;
function init() {
  
  container = document.querySelector("#scene-container");
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);
  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();
  
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}
function createCamera() {
  
  const fov = 35; 
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
    0xddeeff, 
    0x202020, 
    5 
  );
  const directLight = new THREE.DirectionalLight(0xffffff, 5);
  directLight.position.set(10, 10, 10);
  scene.add(ambientLight, directLight);
}
function createMaterials() {
  const body = new THREE.MeshStandardMaterial({
    color: 0xff3333, 
    flatShading: true
  });
  body.color.convertSRGBToLinear();
  const detail = new THREE.MeshStandardMaterial({
    color: 0x333333, 
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
  
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  
  renderer.gammaFactor = 2.2;
  renderer.outputEncoding = THREE.GammaEncoding;
  renderer.physicallyCorrectLights = true;
  
  container.appendChild(renderer.domElement);
}
function update() {}
function render() {
  renderer.render(scene, camera);
}
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  
  camera.updateProjectionMatrix();
  
  renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener("resize", onWindowResize);
init();
