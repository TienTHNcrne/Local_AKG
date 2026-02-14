/** @format */

import * as THREE from 'three';

export function SetUpFakeWater() {
    const loader = new THREE.TextureLoader();

    const normalMap = loader.load(
        new URL('../../../../assets/waternormals.jpg', import.meta.url).href
    );
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(8, 8);
    normalMap.anisotropy = 2;

    const geo = new THREE.PlaneGeometry(4000, 4000);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x355f6b,
        metalness: 0.1,
        roughness: 0.35,
        normalMap,
        transparent: true,
        opacity: 0.95,
    });

    const water = new THREE.Mesh(geo, mat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;

    water.userData = {
        normalMap,
        speed: 0.01,
    };

    return water;
}
