import API from "./api";

const getGenreMapping = async () => {
  try {
    const response = await API.get("/3/genre/movie/list");
    const genreMapping = {};
    response.data.genres.forEach((genre) => {
      genreMapping[genre.id] = genre.name;
    });
    return genreMapping;
  } catch (error) {
    throw new Error("Error during fetching genres");
  }
};

export const FetchMovies = async () => {
  try {
    const genreMapping = await getGenreMapping();

    const response = await API.get("/3/discover/movie?page=1");
    const movies = response.data.results.map((movie) => {
      const genreNames = movie.genre_ids.map((id) => genreMapping[id]);
      return {
        ...movie,
        genre_names: genreNames,
      };
    });

    return { ...response.data, results: movies };
  } catch (error) {
    throw new Error("Error during fetching movies");
  }
};
