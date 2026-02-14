/** @format */

import * as THREE from 'three';

export function setupCrosshair(scene, camera) {
    const texture = new THREE.TextureLoader().load(
        '../../../assets/crosshair.png'
    );

    const crosshair = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture,
            depthTest: false,
            depthWrite: false,
        })
    );

    crosshair.scale.set(0.04, 0.04, 1);
    crosshair.position.set(0, 0, -1);
    crosshair.renderOrder = 999;

    camera.add(crosshair);
}
