/** @format */

import React, { useEffect, useRef } from 'react';

// ===== Core setup =====
import { setupScene } from './SetUpBasic/SetUpScene';
import { setupLights } from './SetUpBasic/SetUpLight/SetUpLight';
import { SetUpSky } from './SetUpBasic/SetUpSky/SetUpSky';
import { SetUpWater } from './SetUpBasic/SetUpWater/SetUpWater';
import { createFPSCounter } from './utils/createFPSCounter';
import { SetUpFakeWater } from './SetUpBasic/SetUpWater/SetUpFakeWater';
// ===== Objects =====
import { ObCube } from './Players/ObCube';

// ===== Controls =====
import { CameraControls } from './Controls/CameraControls';
// ===== Import file =====

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default function Game3D() {
    const refContainer = useRef(null);

    useEffect(() => {
        const fpsCounter = createFPSCounter();

        const placeUrl = new URL('../../assets/Main_Map.glb', import.meta.url)
            .href;
        // ====================== SCENE – CAMERA – RENDERER =====================
        const { scene, camera, renderer } = setupScene(refContainer.current);
        // ====================== LIGHTS + SKY ======================
        setupLights(scene);
        const { sun, updateSun } = SetUpSky({
            scene,
            renderer,
        });

        updateSun(); // set initial sun position

        // ====================== OBJECTS ======================
        const cube = ObCube();
        // scene.add(cube);

        const water = SetUpFakeWater();
        scene.add(water);
        water.position.y = -1;

        // ====================== CAMERA CONTROLS ======================
        const controls = CameraControls({ camera, renderer });
        const loader = new GLTFLoader();
        loader.load(
            placeUrl, // Path to your GLB file
            gltf => {
                const model = gltf.scene;
                model.scale.set(1, 1, 1);
                model.position.set(0, 23, 0);

                scene.add(model);

                camera.position.set(0, 15, 30);
                camera.lookAt(model.position);
                model.traverse(obj => {
                    if (obj.isMesh) {
                        obj.castShadow = false;
                        obj.receiveShadow = false;
                        obj.material.map && (obj.material.map.anisotropy = 1);
                    }
                });
            },
            xhr => {
                console.log(
                    `Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`
                );
            },
            error => {
                console.error('Error loading GLB model:', error);
            }
        );
        // ====================== ANIMATION LOOP ======================
        let lastTime = 0;

        function animate() {
            requestAnimationFrame(animate);

            fpsCounter.update();
            if (water.userData?.normalMap) {
                water.userData.normalMap.offset.x += 0.003;
                water.userData.normalMap.offset.y += 0.01;
            }

            if (controls.enableDamping) controls.update();
            renderer.render(scene, camera);
        }

        animate();

        return () => {
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={refContainer}
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        />
    );
}
