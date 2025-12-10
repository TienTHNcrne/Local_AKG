/** @format */
import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export default function Game3D() {
    const refContainer = useRef();
    const bridgeUrl = new URL('../../assets/bridge.glb', import.meta.url).href;

    useEffect(() => {
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('white');

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        // Helpers
        scene.add(new THREE.GridHelper(50, 50));
        scene.add(new THREE.AxesHelper(5));

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        refContainer.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Load model
        const loader = new GLTFLoader();
        let bridge;
        loader.load(
            bridgeUrl,
            gltf => {
                bridge = gltf.scene;
                bridge.position.set(0, 0, 0);
                scene.add(bridge);
                bridge.scale.set(0.01, 0.01, 0.01);
                camera.position.set(0.5, 0, 0);
                camera.lookAt(bridge.position);
            },
            undefined,
            error => console.error(error)
        );

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
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
