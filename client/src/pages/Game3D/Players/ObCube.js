/** @format */

import * as THREE from 'three';

export function ObCube() {
    const CubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const CubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const Cube = new THREE.Mesh(CubeGeometry, CubeMaterial);
    Cube.name = 'cube';
    Cube.position.set(0, 1, 0);

    return Cube;
}
