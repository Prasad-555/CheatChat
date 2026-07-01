const keyStrokeSound = [
    new Audio("/sounds/keystoke1.mp3"),
    new Audio("/sounds/keystoke2.mp3"),
    new Audio("/sounds/keystoke3.mp3"),
    new Audio("/sounds/keystoke4.mp3"),
]

function useKeyboardSounds() {
    const playRandomKeySound = () => {
        const randomSound = keyStrokeSound[Math.floor(Math.random() * keyStrokeSound.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(error => console.log("Audio play failed",error));
    }
    return { playRandomKeySound };
}
export default useKeyboardSounds;