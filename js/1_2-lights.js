let container;
let camera;
let renderer;
let scene;
let mesh;
function init() {
  
  container = document.querySelector("#scene-container");
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);
  
  const fov = 25; 
  const aspect = container.clientWidth / container.clientHeight;
  const near = 5;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  
  
  camera.position.set(0, 0, 10);
  
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x800080
  });
  
  mesh = new THREE.Mesh(geometry, material);
  
  scene.add(mesh);
  
  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  
  light.position.set(10, 10, 10);
  
  scene.add(light);
  
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  container.appendChild(renderer.domElement);
}
function animate() {
  requestAnimationFrame(animate);
  
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.02;
  mesh.rotation.y -= 0.02;
  
  renderer.render(scene, camera);
}
init();
animate();
