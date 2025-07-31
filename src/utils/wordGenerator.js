const WORDS = [
  'apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'grape', 'house', 'ice', 'jungle',
  'kite', 'lemon', 'monkey', 'night', 'orange', 'pear', 'queen', 'river', 'sun', 'tree',
  'umbrella', 'vase', 'wolf', 'xray', 'yarn', 'zebra', 'quick', 'brown', 'fox', 'jumps',
  'over', 'lazy', 'dog', 'happy', 'sad', 'fast', 'slow', 'run', 'walk', 'jump',
  'swim', 'fly', 'read', 'write', 'code', 'play', 'game', 'music', 'song', 'dance'
];

function generateWords(count = 50) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return arr;
}

export default generateWords; 