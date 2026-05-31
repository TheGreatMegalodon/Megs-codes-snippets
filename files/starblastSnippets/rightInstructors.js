/*
This code allows to get the correct instructors for a team mode "color wise".

All you need is a "hue" component in the this.option part in order for the code to work.
A list called instructors will be created containing the instructors that works with the .team field.

usage example:

for (let ship of game.ships) {
  const instructor = instructors[ship.team]; 
  ship.instructorSays("Here is your report, Commander", instructor);
}
*/

const ref = {
  "Zoltar": Array.from({ length: 31 }, (_, i) => i).concat(Array.from({ length: 41 }, (_, i) => 320 + i)),
  "Maria": Array.from({ length: 50 }, (_, i) => 31 + i),
  "Klaus": Array.from({ length: 60 }, (_, i) => 81 + i),
  "Lucina": Array.from({ length: 110 }, (_, i) => 141 + i),
  "Kan": Array.from({ length: 69 }, (_, i) => 251 + i)
};
const instructors = this.options.hues.map(hue => Object.entries(ref).find(([key, value]) => value.includes(hue))[0]);
