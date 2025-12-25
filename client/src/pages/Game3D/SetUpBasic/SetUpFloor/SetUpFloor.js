/** @format */

import * as THREE from 'three';

export function SetUpFloor(scene) {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.name = 'floor';
  floor.scale.set(15, 15, 15);
  floor.position.set(0, 0, 0);
  scene.add(floor);
  return floor;
}
