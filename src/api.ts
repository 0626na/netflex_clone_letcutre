const API_KEY = "187a316fb1f7cd58b4968ddb44c933c5";
const BASE_URL = "https://api.themoviedb.org";

export interface IGetVideosResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IVideo[];
  total_pages: number;
  total_results: number;
}

export interface IVideo {
  adult?: boolean;
  backdrop_path: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  name?: string;
  original_name?: string;
  origin_country?: string[];
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
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

export const getSeriesToday = async () => {
  const series = await (
    await fetch(
      `${BASE_URL}/3/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1`
    )
  ).json();
  return series;
};

export const getSeriesPopular = async () => {
  const series = await (
    await fetch(
      `${BASE_URL}/3/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
    )
  ).json();
  return series;
};

export const getSeriesTopRated = async () => {
  const series = await (
    await fetch(`
    ${BASE_URL}/3/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1
    `)
  ).json();
  return series;
};

export const getSearch = async (keywords: string | null) => {
  const searchResult = await (
    await fetch(
      `${BASE_URL}/3/search/multi?api_key=${API_KEY}&language=ko-KR&query=${keywords}&page=1&include_adult=true`
    )
  ).json();
  return searchResult;
};
