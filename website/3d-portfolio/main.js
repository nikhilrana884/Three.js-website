import './style.css'

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
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

const pointLight = new THREE.PointLight(0x0ff000);
pointLight.position.set(10, 11, 11);

const ambientLight = new THREE.AmbientLight(0x0ff000);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add( gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);

  
  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.005;

  controls.update();

  renderer.render(scene,camera);
}

animate()