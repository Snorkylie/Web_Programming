// Shanren character preview. Change the animation by clicking a button.
const animations = {
    idle:   { frames: 10, speed: 140, title: "Idle",   description: "The adventurer is ready for the next journey." },
    run:    { frames: 20, speed: 85,  title: "Run",    description: "Moving through the world, one step at a time." },
    attack: { frames: 17, speed: 95,  title: "Attack", description: "A fast sequence of sword attacks." },
    jump:   { frames: 24, speed: 100, title: "Jump",   description: "Taking to the air to reach new places." }
};

const sprite = document.getElementById("character-sprite");
const animationTitle = document.getElementById("animation-title");
const animationDescription = document.getElementById("animation-description");
const pauseButton = document.getElementById("animation-pause");
const actionButtons = document.querySelectorAll(".animation-button");

let currentAction = "idle";
let currentFrame = 0;
let playing = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let timer = null;

function framePath(action, frame) {
    return "assets/character/" + action + "/frame-" + String(frame).padStart(2, "0") + ".png";
}

function showFrame() {
    sprite.src = framePath(currentAction, currentFrame);
}

function startAnimation() {
    clearInterval(timer);
    if (!playing) return;
    timer = setInterval(function () {
        currentFrame = (currentFrame + 1) % animations[currentAction].frames;
        showFrame();
    }, animations[currentAction].speed);
}

function selectAnimation(action) {
    currentAction = action;
    currentFrame = 0;
    const info = animations[action];
    showFrame();
    sprite.alt = "Shanren prototype character: " + info.title.toLowerCase() + " animation";
    animationTitle.textContent = info.title;
    animationDescription.textContent = info.description;

    actionButtons.forEach(function (button) {
        const selected = button.dataset.animation === action;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
    startAnimation();
}

actionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectAnimation(button.dataset.animation);
    });
});

function updatePauseButton() {
    pauseButton.textContent = playing ? "⏸ Pause animation" : "▶ Play animation";
    pauseButton.setAttribute("aria-pressed", String(!playing));
}

pauseButton.addEventListener("click", function () {
    playing = !playing;
    updatePauseButton();
    startAnimation();
});

// Load the default animation immediately; the other animations load on demand.
updatePauseButton();
startAnimation();
