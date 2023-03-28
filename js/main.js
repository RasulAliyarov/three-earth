let camera;
let scene;
let renderer;
let controls;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.onload = function () {
    let widht = window.innerWidth;
    let height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.autoClear = false;
    renderer.setSize(widht, height);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, widht / height, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    //orbitcontrol
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.4;
    controls.rotateSpeed = 0.4;

    //create earth
    const earhGeometry = new THREE.SphereGeometry(0.6, 32, 32)
    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: new THREE.TextureLoader().load("texture/earthmap1k.jpg"),
        bumpMap: new THREE.TextureLoader().load("texture/earthbump.jpg"),
        bumpScale: 0.2,
    });

    const earhMesh = new THREE.Mesh(earhGeometry, earthMaterial)

    scene.add(earhMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight)

    //set point light
    const pointerLight = new THREE.PointLight(0xffffff, 0.9)

    //set loght position
    pointerLight.position.set(5, 3, 5);
    scene.add(pointerLight);

    //cloud
    const cloudGeometry = new THREE.SphereGeometry(0.63, 12, 12)
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("texture/earthCloud.png"),
        transparent: true
    });

    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    scene.add(cloudMesh)

    //star
    const startGeometry = new THREE.SphereGeometry(80, 64, 64);
    const startMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("texture/8k_stars_milky_way.jpg"),
        side: THREE.BackSide
    });
    const starMesh = new THREE.Mesh(startGeometry, startMaterial)
    scene.add(starMesh)

    //Resize
    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    const animate = () => {
        requestAnimationFrame(animate);
        earhMesh.rotation.y -= 0.0015;
        cloudMesh.rotation.y += 0.0015;
        starMesh.rotation.y += 0.0002;
        controls.update();
        render()
    }

    const render = () => {
        renderer.render(scene, camera)

    }

    animate();
}
