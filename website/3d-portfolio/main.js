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

var actionZ = 0; //on left click action
var rotationA = 3.1; // amount of rotation
var movementSpeed = 10;
var zoomSpeed = 10;
var totalObjects = 40000;
/////////////////////////////////
var rotated = false; 
var container = document.createElement('div');
document.body.appendChild( container );

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1, 10000)
camera.position.z = 2000; 

var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x555555, 0.0003 );  
var geometry = new THREE.Geometry();

for (i = 0; i < totalObjects; i ++) 
{ 
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*40000-20000;
  vertex.y = Math.random()*7000-3500;
  vertex.z = Math.random()*7000-3500;
  geometry.vertices.push( vertex );
}

var material = new THREE.ParticleBasicMaterial( { size: 6 });
var particles = new THREE.ParticleSystem( geometry, material );
    
scene.add( particles ); 

camera.position.x = -10000;


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

renderer.render( scene, camera );

render();

      function render() {
        requestAnimationFrame( render );
        if (!rotated && camera.position.x < 11000)
        {
          if(camera.position.x > 10000){
            rotated = true;
            if (camera.rotation.y < rotationA){
              camera.rotation.y += .015;
              rotated = false;
            }
            if (camera.position.z > -2000){
              camera.position.z -= 19;
              rotated = false;
            }
          }
          else{
          camera.position.x += movementSpeed;
          camera.position.z += actionZ;
          }
        }
        else if(rotated && camera.position.x > -11000){
          if(camera.position.x < -10000){
            rotated = false;
            if (camera.rotation.y > 0){
              camera.rotation.y -= .015;
              rotated = true;
            }
            if (camera.position.z < 2000){
              camera.position.z += 19;
              rotated = true;
            }
          }
          else{
          camera.position.x -= movementSpeed;
          camera.position.z -= actionZ;
          }
        }
        
           
        renderer.render( scene, camera );

      }

window.addEventListener( 'mousedown', onDocumentMouseDown, false );
window.addEventListener( 'mouseup', onDocumentMouseUp, false );
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }
function onDocumentMouseDown(){
    event.preventDefault();
    actionZ = -zoomSpeed;
}

function onDocumentMouseUp(){
   actionZ = 0;
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