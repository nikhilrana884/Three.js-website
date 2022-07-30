import './style.css'

import * as THREE from 'three';
import { AnimationMixer } from 'three';


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);




const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00,wirefram: true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


animate()