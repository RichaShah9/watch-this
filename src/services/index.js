const API_KEY = "695ae721";
export async function getTvSeries(tvSeries = []) {
  if (tvSeries.length <= 0) return;
  const promiseArray = [];
  for (let i = 0; i < tvSeries.length; i++) {
    promiseArray.push(
      await fetch(
        `http://www.omdbapi.com/?t=${tvSeries[i]}&apikey=${API_KEY}&type=series`
      )
    );
  }
  let response = await Promise.all(promiseArray);
  let series = [];
  for (let i = 0; i < response.length; i++) {
    promiseArray.push(series.push(await response[i].json()));
  }
  return series;
}

export async function getSeasons(series) {
  if (!series) return;
  const { totalSeasons } = series;
  const promiseArray = [];
  for (let i = 1; i <= totalSeasons; i++) {
    promiseArray.push(
      await fetch(
        `http://www.omdbapi.com/?t=${series.Title}&apikey=${API_KEY}&type=series&season=${i}`
      )
    );
  }
  let response = await Promise.all(promiseArray);
  let seasons = [];
  for (let i = 0; i < response.length; i++) {
    promiseArray.push(seasons.push(await response[i].json()));
  }
  return seasons;
}

export async function search(keyword) {
  let response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}&plot=full`
  );
  if (!response) return [];
  let result = await response.json();
  if(result.Search){
      return result.Search
  }
  return [];
}
