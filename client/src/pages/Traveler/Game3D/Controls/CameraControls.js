/** @format */

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export function CameraControls({ camera, renderer }) {
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableZoom = true;
    controls.enableDamping = true;

    controls.enablePan = false;
    return controls;
}
