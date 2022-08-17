import './style.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { AnimationMixer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setX(10);
camera.position.setZ(30);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 10, 15 );
const material = new THREE.MeshBasicMaterial( { color: 0xff00f0 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/skyline.gltf', (gltfScene) => {
      loadedModel = gltfScene;[]

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);
    });

const pointLight = new THREE.PointLight(0x0ff0ff);
pointLight.position.set(100, 100, 100);

const ambientLight = new THREE.AmbientLight(0x0ff000);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(2000, 5000);

scene.add( gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.8, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xfff00f });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

  const spaceTexture = new THREE.TextureLoader().load('../assets/space.jpg');
  scene.background = spaceTexture;

  var geom = new THREE.BoxGeometry(10, 10, 10);
var mat = new THREE.MeshBasicMaterial({color: "red"});
var cube = new THREE.Mesh(geom, mat);

scene.add(cube);
camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 20;

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
scene.add( directionalLight );


createCannonConvex(geometry){
  if (!geometry.isBufferGeometry) return null;
  
  const posAttr = geometry.attributes.position;
  const floats = geometry.attributes.position.array;
  const vertices = [];
  const faces = [];
  let face = [];
  let index = 0;
  for(let i=0; i<posAttr.count; i+=3){
    vertices.push( new CANNON.Vec3(floats[i], floats[i+1], floats[i+2]) );
    face.push(index++);
    if (face.length==3){
      faces.push(face);
      face = [];
    }
  }
  
  return new CANNON.ConvexPolyhedron(vertices, faces);
}


function createCar() {
  const car = new THREE.Group();
  
  const backWheel = createWheels();
  backWheel.position.y = 6;
  backWheel.position.x = -18;
  car.add(backWheel);
  
  const frontWheel = createWheels();
  frontWheel.position.y = 6;  
  frontWheel.position.x = 18;
  car.add(frontWheel);

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  main.position.y = 12;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);

  return car;
}


function animate() {
  requestAnimationFrame(animate);
  

  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.005;

  cube.rotation.y += 0.01;
  cube.rotateZ(0.05);
  cube.rotateY(0.05);

  renderer.render(scene,camera);
}



animate()