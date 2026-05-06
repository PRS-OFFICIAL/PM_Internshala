// ===================================================
// FIXED RESPONSIVE 3D MODEL CODE
// ===================================================

const canvas = document.getElementById("threeJsCanvas");
const modelSection = document.querySelector(".model-section");

if (canvas && modelSection) {

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        60,
        modelSection.clientWidth / modelSection.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 8;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(
        modelSection.clientWidth,
        modelSection.clientHeight
    );

    renderer.setClearColor(0x000000, 0);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(5, 5, 5);

    scene.add(directionalLight);

    // GEOMETRY
    const cubeGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);

    const cubeColors = [
        0x8a2be2,
        0xda70d6,
        0x4169e1,
        0x20b2aa,
        0xff6b6b,
        0xfeca57
    ];

    const cubes = [];

    const positions = [
        [-2, 2, 0],
        [2, 2, 0],
        [-2, -2, 0],
        [2, -2, 0],
        [0, 0, 2],
        [0, 0, -2]
    ];

    // CREATE CUBES
    cubeColors.forEach((color, index) => {

        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.3,
            roughness: 0.4
        });

        const cube = new THREE.Mesh(cubeGeometry, material);

        cube.position.set(...positions[index]);

        scene.add(cube);

        cubes.push(cube);
    });

    // MOUSE INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    canvas.addEventListener("click", (event) => {

        const rect = canvas.getBoundingClientRect();

        mouse.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1;

        mouse.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(cubes);

        if (intersects.length > 0) {

            const cube = intersects[0].object;

            cube.scale.set(1.3, 1.3, 1.3);

            setTimeout(() => {
                cube.scale.set(1, 1, 1);
            }, 200);
        }
    });

    // ANIMATION
    function animate() {

        requestAnimationFrame(animate);

        cubes.forEach((cube, index) => {

            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;

            cube.position.y +=
                Math.sin(Date.now() * 0.001 + index) * 0.002;
        });

        renderer.render(scene, camera);
    }

    animate();

    // RESPONSIVE RESIZE
    function handleResize() {

        const width = modelSection.clientWidth;
        const height = modelSection.clientHeight;

        camera.aspect = width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    handleResize();
}

// ===================================================
// END OF 3D MODEL CODE
// ===================================================
