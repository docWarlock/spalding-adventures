import React, { useEffect } from "react";
import * as Phaser from "phaser";

const Game: () => React.JSX.Element = () => {
  useEffect(() => {
    class MainScene extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

      constructor() {
        super({ key: "MainScene" });
      }

      preload() {
        // Load game assets here (e.g., images, sprites)
        this.load.image("background", "/assets/images/background.jpg");
        this.load.image(
          "playerSpriteKey",
          "/assets/sprites/character-basic.png",
        );
        // Add more assets as needed
      }

      create() {
        // Set up the game world here

        // Background
        this.add.image(400, 300, "background");

        // Player character
        this.player = this.physics.add.sprite(100, 450, "playerSpriteKey"); // Replace with your player sprite key
        this.player.setScale(0.5);
        this.physics.world.enable(this.player);
        // Check if 'setCollideWorldBounds' exists before calling it
        if (this.player.body) {
          if (this.player.body instanceof Phaser.Physics.Arcade.Body) {
            this.player.body.setCollideWorldBounds(true);
          }
        }

        // Set up keyboard controls using optional chaining
        // @ts-ignore
        this.cursors = this.input.keyboard.createCursorKeys?.();

        // If 'createCursorKeys' returns null, handle it accordingly
        if (!this.cursors) {
          console.error("Could not create cursor keys.");
          return;
        }
      }

      update() {
        // Player movement controls
        if (this.cursors.left?.isDown) {
          this.player.setVelocityX(-200);
        } else if (this.cursors.right?.isDown) {
          this.player.setVelocityX(200);
        } else {
          this.player.setVelocityX(0);
        }

        if (this.cursors.up?.isDown) {
          this.player.setVelocityY(-200);
        } else if (this.cursors.down?.isDown) {
          this.player.setVelocityY(200);
        } else {
          this.player.setVelocityY(0);
        }
      }
      private movePlayer(velocityX: number, velocityY: number): void {
        // Ensure that player.body is not null before accessing it
        if (this.player.body) {
          this.player.setVelocity(velocityX, velocityY);
        }
      }
    }

    // Phaser Configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: MainScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }, // Adjust gravity as needed ( 0 is for top down, +# is down and -# is up)
          debug: false, // Set to true for debugging
        },
      },
    };

    // Create Phaser Game instance
    const game = new Phaser.Game(config);

    return () => {
      // Cleanup logic (if needed) when the component is unmounted
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default Game;
