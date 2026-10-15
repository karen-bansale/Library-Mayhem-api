// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'library-mayhem',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Library Mayhem',            // the name players will see
  team: '12 (3-2)',            // your group's name and section, for example Bookworms (3-1)
  developer: 'karen-bansale',       // YOUR GitHub username: this build is yours
  description: 'library management game where players return books, help students by answering quiz questions, and keep the library under control before time runs outis duration cannot be changed by the host.',     // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 30,
  version: pkg.version,         // read from package.json, do not edit here
};
