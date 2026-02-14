/** @format */

export function startAnimation(renderer, scene, camera) {
    let running = true;

    const loop = () => {
        if (!running) return;
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };

    loop();

    return () => (running = false);
}
