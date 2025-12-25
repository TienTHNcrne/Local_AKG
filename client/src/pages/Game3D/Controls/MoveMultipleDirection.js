/** @format */

import * as THREE from 'three';
export function MoveMultipleDirection({ Player, Speed, camera, vision }) {
    const keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        ArrowUp: false,
        ArrowLeft: false,
        ArrowDown: false,
        ArrowRight: false,
        Space: false,
    };
    window.addEventListener('keydown', e => {
        if (keys[e.key]) return;
        if (keys[e.key] !== undefined) keys[e.key] = true;
    });
    window.addEventListener('keyup', e => {
        if (keys[e.key] !== undefined) keys[e.key] = false;
    });
    const clock = new THREE.Clock();

    const MoveDir = () => {
        let Direction = new THREE.Vector3();

        const DeltaTime = clock.getDelta();
        if (keys.d || keys.ArrowRight) Direction.x += 1;
        if (keys.a || keys.ArrowLeft) Direction.x -= 1;
        if (keys.w || keys.ArrowUp) Direction.z -= 1;
        if (keys.s || keys.ArrowDown) Direction.z += 1;
        if (keys.Space) Direction.y += 1;
        if (Direction.lengthSq() > 0) {
            Direction.applyQuaternion(camera.quaternion);
            Direction.normalize();
            Direction.multiplyScalar(Speed * DeltaTime);
            Player.position.add(Direction);

            if (vision === 't') {
                camera.position.add(Direction);
            }
        }
    };
    return MoveDir;
}
