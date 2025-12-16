function find_pairs (number_list, target) {
  const list_pair = [];

  for (let i = 0; i < number_list.length; i++) {
    for (let h = i + 1; h < number_list.length; h++) {
      if (number_list[i] + number_list[h] === target) {
        let current_pair = `(${number_list[i]},${number_list[h]})`;
        if (!list_pair.includes (current_pair)) {
          list_pair.push (current_pair);
        }
      }
    }
  }
  return list_pair;
}

const pairs = find_pairs ([5, 5, 5, 5], 10);
console.log (pairs);
