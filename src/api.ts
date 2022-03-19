const API_KEY = "187a316fb1f7cd58b4968ddb44c933c5";
const BASE_URL = "https://api.themoviedb.org";

export interface IGetMovieResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenres {
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}

export const getMoviesNowPlaying = async () => {
  const movies = await (
    await fetch(
      `${BASE_URL}/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    )
  ).json();
  return movies;
};

export const getMoviesPopular = async () => {
  const movies = await (
    await fetch(`${BASE_URL}/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr
    `)
  ).json();
  return movies;
};

export const getMoviesToprated = async () => {
  const movies = await (
    await fetch(
      `${BASE_URL}/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    )
  ).json();

  return movies;
};

export const getGenresObj = async () => {
  const genres = await (
    await fetch(
      `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
    )
  ).json();
  return genres;
};
