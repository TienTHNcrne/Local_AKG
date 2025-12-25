/** @format */

import * as THREE from 'three';

export function setupLights(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);
}
