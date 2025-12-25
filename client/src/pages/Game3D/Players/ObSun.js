/** @format */

import * as THREE from 'three';

export function ObSun({ scene }) {
  const sunLight = new THREE.DirectionalLight(0xffff, 1);
  sunLight.position.set(500, 800, 200);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.intensity = 1.5;
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 2000;
  sunLight.shadow.camera.left = -500;
  sunLight.shadow.camera.right = 500;
  sunLight.shadow.camera.top = 500;
  sunLight.shadow.camera.bottom = -500;

  scene.add(sunLight);

  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  sunLight.castShadow = true;
  sunMesh.position.copy(sunLight.position);
  scene.add(sunMesh);
}
