// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  // Get a reference to the container element that will hold our scene
  container = document.querySelector("#scene-container");

  // create a Scene
  scene = new THREE.Scene();

  scene.background = new THREE.Color(0x8fbcd4);

  // set up the options for a perspective camera
  const fov = 25; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 5;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 10);

  // create a geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({
    color: 0x800080
  });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh(geometry, material);

  // add the mesh to the scene object
  scene.add(mesh);

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 5.0);

  // move the light back and up a bit
  light.position.set(10, 10, 10);

  // remember to add the light to the scene
  scene.add(light);

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.02;
  mesh.rotation.y -= 0.02;

  // render, or 'create a still image', of the scene
  renderer.render(scene, camera);
}

// call the init function to set everything up
init();

// then call the animate function to render the scene
animate();
