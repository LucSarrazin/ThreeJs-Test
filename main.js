import './style.css'

import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const radius = 10.0;  

const detail = 2;  

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonNormal = new THREE.TextureLoader().load('normal.jpg');

const geometry = new THREE.DodecahedronGeometry( radius, detail );
//const material = new THREE.MeshBasicMaterial({color: 0xFF6347,wireframe: true});  3D MODEL WITH WIREFRAME
const material = new THREE.MeshStandardMaterial({map: moonTexture,normalMap:moonNormal});
const DodecahedronGeometry = new THREE.Mesh(geometry,material);

scene.add(DodecahedronGeometry); // Rajouter sur la scène la forme

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(8,5,10);
scene.add(pointLight); // Rajouter sur la scène la lumière

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material2 = new THREE.MeshStandardMaterial( { color: 0xccffff} ); 
const torus = new THREE.Mesh( geometry2, material2 ); 
scene.add( torus ); // Rajouter sur la scène la forme

function addStar(){
    const geometry = new THREE.SphereGeometry( 0.25, 24, 24 ); 
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } ); 
    const stars = new THREE.Mesh( geometry, material ); 
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    stars.position.set(x,y,z);
    scene.add( stars );
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('Starfield5.png');
scene.background = spaceTexture;

DodecahedronGeometry.position.z = -30;
DodecahedronGeometry.position.setX(-15);
torus.position.z = -30;
torus.position.setX(-15);

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    
    DodecahedronGeometry.rotation.x += 0.03;
    DodecahedronGeometry.rotation.y += 0.002;
    DodecahedronGeometry.rotation.z += 0.03;

    camera.position.z = t * -0.01;
    //camera.position.x = t * -0.0002;
    //camera.rotation.y = t * -0.0002;
}


document.body.onscroll = moveCamera;

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene,camera);
}
animate();


function animate2(){
    requestAnimationFrame(animate2);
    DodecahedronGeometry.rotation.x += 0.03;
    DodecahedronGeometry.rotation.y += 0.002;
    DodecahedronGeometry.rotation.z += 0.03;
    renderer.render(scene,camera);
}
animate2();
