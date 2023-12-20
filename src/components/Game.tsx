import React, { useEffect } from "react";
import * as Phaser from "phaser";

const Game: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Load game assets here
    }

    function create() {
      // Setup initial game state here
    }

    function update() {
      // Update game logic here
    }
  }, []);

  return <div id="game-container" />;
};

export default Game;
