export function sortByKey(array, key, isNumber = false, order) {
  return array.sort(function (a, b) {
    let x = isNumber ? Number(a[key]) : a[key];
    let y = isNumber ? Number(b[key]) : b[key];

    return order === "reverse"
      ? x > y
        ? -1
        : x < y
        ? 1
        : 0
      : x < y
      ? -1
      : x > y
      ? 1
      : 0;
  });
}

export function getAverage(season) {
  let sumOfRatings = season.Episodes.reduce(function (prev, cur) {
    return prev + (isNaN(cur.imdbRating) ? 0 : Number(cur.imdbRating));
  }, 0);
  return (sumOfRatings / season.Episodes.length).toFixed(2);
}
