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

camera.position.setX(-10);
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
  const geometry = new THREE.SphereGeometry(0.5, 4, 4);
  const material = new THREE.MeshStandardMaterial({ color: 0xfff00f });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);



  const loader = new GLTFLoader();
  loader.load( '../assets/skyline.glb', function ( gltf ) {
    scene.add(gltf.scene);
    } );

function animate() {
  requestAnimationFrame(animate);

  
  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.005;

  controls.update();

  renderer.render(scene,camera);
}

animate()