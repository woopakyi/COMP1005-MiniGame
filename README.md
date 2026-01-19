# COMP1005 Mini Game Project

A simple yet challenging survival game inspired by **Undertale**'s famous encounter, created as the mini project for **COMP1005**.

## Game Concept

There are flowers growing on your screen. Collect flowers and feed sheeps to gain EXP. Avoid bones and enemy to survive longer. Reach **Lv.20** before your HP reaches zero.

## Screenshots
**Welcome Screen:** The starting screen with sound test. Press any key to test the volume of sound.
- <img src="images/welcome.png" width="45%">

**Early game:** Collecting flowers, HP/EXP bars.
- <img src="images/gameplay_early.png" width="45%">

**Mid-game:** Bones appearing, feeding sheep, enemy pursuit.
- <img src="images/gameplay_mid1.png" width="45%"> <img src="images/gameplay_mid2.png" width="45%">

**Win/Lose Screen:** Victory screen showing time spent to reach Lv.20. Defeat screen appears when HP depletes.
- <img src="images/win.png" width="45%"> <img src="images/lose.png" width="45%">

## Logic
**Heart:** <img src="minigame/data/soul_red.png" width="2%">
- The red heart represents your cursor. Move the heart to collect flowers and feed sheeps.
  - **Mouse** → Move heart
  - **Left Click** → collect flowers / Feed sheep (need ≥2 flowers)
 
**Flower:** <img src="minigame/data/flowey_alive.png" width="3%"> (1 Flower → +2 EXP)
- Click the flowers to collect them.

**Flower Collecting Bar:** <img src="images/collection.png" width="15%">
- It shows the flower you have collected and held. You can hold up to 8 flowers at once.

**Sheep:** <img src="minigame/data/asriel.png" width="2.4%"> (1 Sheep → +10 EXP)
- After collecting enough flowers, you can consume 2 flowers to feed a sheep.

**Bone:** <img src="minigame/data/bone.png" width="5%"> (1 Bone → -7 HP)
- Bones appear and fly across screen after you reach Lv.5. They hurt you if your cursor torch them. Try to move your cursor away from the bones.

**Enemy:** <img src="minigame/data/chara.png" width="2.4%"> (0.1 second → -1 HP)
- Moving enemy appears and chase your cursor after you reach Lv.10. It hurts you if your cursor torch it. Try to move your cursor away from the enemy.

## Features

- Three main stages: Welcome → Gameplay → Win/Lose
- Leveling system (Lv.1 → Lv.20)
- EXP from collecting flowers (2 EXP) & feeding sheep (10 EXP)
- Increasing difficulty:
  - Bones flying across screen (Lv.5+)
  - Moving enemy character (Lv.10+)
- Sound effects (hurt, heal, victory, etc.) using Minim library
- Pixel-art style with Undertale-inspired assets

## Requirements

Processing 3.5.4 or newer version
- Import Modes: Python Mode for Processing 3 (for Python mode)
- Import Libraries: Minim (for sound)

## Credits / References

- Game assets: Undertale (by Toby Fox)

## License
This project is for educational purposes only. Assets are used under fair use for non-commercial academic work.
