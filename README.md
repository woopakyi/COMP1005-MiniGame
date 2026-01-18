# COMP1005 Mini Game Project

A simple yet challenging shooting survival game inspired by **Undertale**'s famous encounter, created as the mini project for **COMP1005 Essence of Computing**.

## Game Concept

There are flowers growing on your screen...  
**Shoot them** to gain EXP → Level up → Survive longer  
Reach **Lv.20** before your HP reaches zero.

## Screenshots
![Welcome Screen](screenshots/welcome.png)  
The starting screen with instructions and sound test.

![Gameplay Early](screenshots/gameplay_early.png)  
Early game: Shooting Flowey, collecting flowers, HP/EXP bars.

![Gameplay Mid](screenshots/gameplay_mid.png)  
Mid-game: Bones appearing, feeding sheep, enemy pursuit.

![Win Screen](screenshots/win.png)  
Victory screen showing time spent.

![Lose Screen](screenshots/lose.png)  
Defeat screen when HP depletes.

## Features

- Three main stages: Welcome → Gameplay → Win/Lose
- Leveling system (Lv.1 → Lv.20)
- EXP from shooting flowers (2 EXP) & feeding sheep (10 EXP)
- Increasing difficulty:
  - Bones flying across screen (Lv.5+)
  - Moving enemy character (Lv.10+)
- Sound effects (hurt, heal, victory, etc.) using Minim library
- Pixel-art style with Undertale-inspired assets

## Controls

- **Mouse** → Move heart & aim
- **Left Click** → Shoot flowers / Feed sheep (need ≥2 flowers)
- **Any key** → Start game from welcome screen
- **R** → Restart after win/lose

## Requirements

Processing 3.5.4 or newer version
- Import Modes: Python Mode for Processing 3 (for Python mode)
- Import Libraries: Minim (for sound)

## Credits / References

- Game assets: Undertale (by Toby Fox)


## License
This project is for educational purposes only. Assets are used under fair use for non-commercial academic work.