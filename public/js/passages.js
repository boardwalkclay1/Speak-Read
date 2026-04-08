// js/passages.js
export const LEVEL_LABELS = {
  1: "1st Grade",
  2: "2nd Grade",
  3: "3rd Grade",
  4: "4th Grade",
  5: "5th Grade",
  6: "6th Grade",
  7: "7th Grade",
  8: "8th Grade",
  9: "9th Grade",
  10: "10th Grade",
  11: "11th Grade",
  12: "12th Grade",
  college: "College",
};

export const PASSAGES = {
  1: [
    {
      id: "g1-1",
      title: "The Red Ball",
      text: "Tom has a red ball. He kicks the ball. The ball rolls down the hill. Tom runs after it and laughs.",
    },
  ],
  3: [
    {
      id: "g3-1",
      title: "A Windy Day",
      text: "The wind blew hard across the playground. Leaves danced in the air as children held onto their hats. Some ran to catch the swirling leaves, while others watched the clouds race across the sky.",
    },
  ],
  6: [
    {
      id: "g6-1",
      title: "The River Path",
      text: "The path along the river curved gently through the trees. Birds called from the branches above, and the water moved steadily over smooth stones. As Maya walked, she noticed how the sound of the river changed whenever it passed over a bend or a fallen log.",
    },
  ],
  9: [
    {
      id: "g9-1",
      title: "City at Dawn",
      text: "At dawn, the city seemed to hold its breath. Streetlights flickered off one by one as the first rays of sunlight slid between tall buildings. Delivery trucks rumbled along nearly empty streets, and the faint smell of coffee drifted from the corner café.",
    },
  ],
  12: [
    {
      id: "g12-1",
      title: "The Edge of the Forest",
      text: "Standing at the edge of the forest, Lena felt as if she were looking into another world. The trees formed a dense wall of shadow, broken only by narrow paths that disappeared into the undergrowth. The air was cooler there, and the scent of damp earth and pine needles carried a quiet promise of discovery.",
    },
  ],
  college: [
    {
      id: "college-1",
      title: "Cognitive Load and Learning",
      text: "Cognitive load theory suggests that the human working memory has a limited capacity for processing new information. When instructional materials are poorly designed, they can overwhelm this capacity, leaving learners unable to integrate new concepts into their existing knowledge structures. Effective instruction, therefore, reduces unnecessary mental effort while directing attention toward the most essential elements of the task.",
    },
  ],
};

// Fallback: if a level has no custom passage, reuse nearest lower level
export function getPassageForLevel(level) {
  const key = String(level);
  if (PASSAGES[key] && PASSAGES[key].length > 0) {
    return PASSAGES[key][0];
  }

  const numeric = Number(level);
  if (!Number.isNaN(numeric)) {
    for (let l = numeric; l >= 1; l--) {
      if (PASSAGES[l] && PASSAGES[l].length > 0) {
        return PASSAGES[l][0];
      }
    }
  }

  return PASSAGES["1"][0];
}
