import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeImagePath } from "../utiles";
import {
  boxVariant,
  movieInfoVariant,
  rowLeftVariant,
} from "./AnimationVariants";
import {
  Box,
  MovieInfo,
  Row,
  RowContainer,
  RowTitle,
  Slider,
} from "./styledComponents";

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

interface ISliderCom {
  movies: IGetMovieResult;
  sliderKey: string;
}

const SliderComponent = ({ movies, sliderKey }: ISliderCom) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  const history = useHistory();
  const boxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const IncreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  return (
    <>
      <Slider>
        <RowTitle>현재 상영중</RowTitle>
        <RowContainer>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <button onClick={IncreaseIndex}>left</button>
            <Row
              key={index}
              variants={rowLeftVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.8 }}
            >
              {movies.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    layout
                    layoutId={movie.id + sliderKey}
                    onClick={() => boxClicked(movie.id)}
                    variants={boxVariant}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    key={movie.id}
                    bgpic={makeImagePath(movie.backdrop_path, "w300")}
                  >
                    <MovieInfo variants={movieInfoVariant}>
                      <h4>{movie.title}</h4>
                    </MovieInfo>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </RowContainer>
      </Slider>
    </>
  );
};

export default SliderComponent;
