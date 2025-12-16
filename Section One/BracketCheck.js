function ValidBracket (str) {
  const stack = [];
  const matchingBracket = {
    ']': '[',
    '}': '{',
    ')': '(',
  };

  for (let char of str) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push (char);
    } else {
      // If closing bracket → check match
      if (stack.pop () !== matchingBracket[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log (ValidBracket ('([)]'));
