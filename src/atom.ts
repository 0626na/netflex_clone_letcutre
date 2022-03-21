import { atom } from "recoil";
import {
  getGenresObj,
  getMoviesNowPlaying,
  IGenres,
  IGetVideosResult,
} from "./api";

export const sliderKeyInRecoil = atom({
  key: "sliderkey",
  default: "nowPlaying",
});

export const selectedMovies = atom<IGetVideosResult | undefined>({
  key: "selectedMovies",
  default: getMoviesNowPlaying(),
});

export const movieGenres = atom<IGenres>({
  key: "genres",
  default: getGenresObj(),
});
