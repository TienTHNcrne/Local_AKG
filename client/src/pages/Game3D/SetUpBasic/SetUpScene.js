/** @format */

import * as THREE from 'three';

export function setupScene(container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        1,
        20000
    );
    camera.position.set(3, 1, 4);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    scene.add(camera);

    return { scene, camera, renderer };
}
