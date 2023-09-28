function isDistinct(arr: Array<any>) {
  const seen = new Set();
  for (let value of arr) {
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
  }
  return true;
}

const array = {
    isDistinct,
}

export default array;