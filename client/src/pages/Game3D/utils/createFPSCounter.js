/** @format */

// utils/FPSCounter.js
export function createFPSCounter() {
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        color: #0f0;
        background: rgba(0,0,0,0.6);
        padding: 6px 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        border-radius: 4px;
    `;
    div.innerText = 'FPS: 0';
    document.body.appendChild(div);

    let lastTime = performance.now();
    let frames = 0;

    return {
        update() {
            frames++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                div.innerText = `FPS: ${frames}`;
                frames = 0;
                lastTime = now;
            }
        },
        destroy() {
            div.remove();
        },
    };
}
