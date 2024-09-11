export function levelUp(currentLevel) {
    const newLevel = currentLevel + 1;
    console.log(`Congratulations! You've leveled up to level ${newLevel}.`);
    return newLevel;
}
