/** @format */

import * as THREE from 'three';

const _offset = new THREE.Vector3(0, 1.6, 0);
const _desiredTarget = new THREE.Vector3();

export function CameraFollowOb({ Control, Player }) {
    _desiredTarget.copy(Player.position).add(_offset);

    Control.target.lerp(_desiredTarget, 0.1);
    Control.update();
}
