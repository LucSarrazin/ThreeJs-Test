import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
const moonTexture = new THREE.TextureLoader().load('moon.jpg'); // créer une texture lune
const moonNormal = new THREE.TextureLoader().load('normal.jpg'); // créer une texture lune avec fossées

const geometry = new THREE.SphereGeometry( radius, detail );
//const material = new THREE.MeshBasicMaterial({color: 0xFF6347,wireframe: true});  3D MODEL WITH WIREFRAME
const material = new THREE.MeshStandardMaterial({map: moonTexture,normalMap:moonNormal}); // rajouter les textures à l'objet
const sphere = new THREE.Mesh(geometry,material); // créer SPHERE avec le model et les textures

scene.add(sphere); // Rajouter sur la scène la form

const pointLight = new THREE.PointLight(0xffffff); // créer une lumière à un endroit
pointLight.position.set(8,5,10); // la position de la lumière sur l'axe 3D
scene.add(pointLight); // Rajouter sur la scène la lumière

const lightHelper = new THREE.PointLightHelper(pointLight); // créer un répère à l'endroit de la lumière
scene.add(lightHelper); // Rajouter sur la scène la lumière

const light = new THREE.AmbientLight( 0x404040 ); // petite lumière pas trop forte pour illuminer tout le monde
scene.add(light); // Rajouter sur la scène la lumière

const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 );  // modèle + taille du torus
const material2 = new THREE.MeshStandardMaterial( { color: 0xccffff} );  // texture du model
const torus = new THREE.Mesh( geometry2, material2 );  // generer la forme + texture
scene.add( torus ); // Rajouter sur la scène la forme

function addStar(){
    const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );  //generer une petite sphere
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );  // mettre la couleur blanche
    const stars = new THREE.Mesh( geometry, material ); // generer la sphere + la mettre blanche
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // génération aléatoire des objets entre 100 nombres
    stars.position.set(x,y,z); //  mettre la position génerer aléatoirement
    scene.add( stars ); // rajouter les étoiles avec les positions génerer aléatoirement
}

Array(200).fill().forEach(addStar); // créer 200 étoiles

const spaceTexture = new THREE.TextureLoader().load('Starfield5.png'); // créer une texture d'espace
scene.background = spaceTexture; // rajouter la texture en arrière plan

//Gerer la postion des objets 
sphere.position.z = -30;
sphere.position.setX(-15);
torus.position.z = -30;
torus.position.setX(-15);

// Fonction lorsqu'on scroll sur la page
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    
    sphere.rotation.x += 0.03;
    sphere.rotation.y += 0.002;
    sphere.rotation.z += 0.03;

    camera.position.z = t * -0.01;
    //camera.position.x = t * -0.0002;
    //camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;


// Animation
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    renderer.render(scene,camera);
}
function animate2(){
    requestAnimationFrame(animate2);
    sphere.rotation.x += 0.03;
    sphere.rotation.y += 0.002;
    sphere.rotation.z += 0.03;
    renderer.render(scene,camera);
}
animate();
animate2();
