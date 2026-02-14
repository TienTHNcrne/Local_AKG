/** @format */

import { Sky } from 'three/addons/objects/Sky.js';
import * as THREE from 'three';

export function SetUpSky({ scene, renderer }) {
    const sky = new Sky();
    const sun = new THREE.Vector3();
    sky.scale.addScalar(10000);
    scene.add(sky);

    //---------SUN----------

    const effectController = {
        turbidity: 30, // sương buổi sáng nhiều
        rayleigh: 2, // trời chưa xanh
        mieCoefficient: 0.001, // mù nhẹ
        mieDirectionalG: 0.4, // ánh sáng còn tán
        elevation: 1, // 🌅 mặt trời vừa nhú
        azimuth: 90,
        exposure: 0.45, // dịu
    };

    function updateSun() {
        const uniforms = sky.material.uniforms;

        uniforms.turbidity.value = effectController.turbidity;
        uniforms.rayleigh.value = effectController.rayleigh;
        uniforms.mieCoefficient.value = effectController.mieCoefficient;
        uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);
        uniforms.sunPosition.value.copy(sun);

        renderer.toneMappingExposure = effectController.exposure;
    }

    return { updateSun, sun };
}
