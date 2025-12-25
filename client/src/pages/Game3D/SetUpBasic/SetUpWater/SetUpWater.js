/** @format */

import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
export function SetUpWater() {
    const WaterUrl = new URL(
        '../../../../assets/waternormals.jpg',
        import.meta.url
    ).href;
    const WaterGeometry = new THREE.PlaneGeometry(4000, 4000);
    const water = new Water(WaterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
            WaterUrl,
            function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        distortionScale: 2,
        waterColor: 0x355f6b,
    });
    water.material.uniforms.distortionScale.value = 1.5;
    water.material.uniforms.size.value = 0.5;
    water.material.transparent = true;

    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;

    return water;
}
