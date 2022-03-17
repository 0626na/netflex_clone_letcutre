import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesToprated,
  IGetMovieResult,
} from "../api";
import { makeImagePath } from "../utiles";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Banner,
  Box,
  ClickedMovie,
  ClickedMovieCover,
  Loader,
  MovieInfo,
  Overlay,
  Overview,
  RootHome,
  Row,
  Slider,
  RowTitle,
  Title,
  SliderContainer,
} from "../Components/styledComponents";
import SliderComponent from "../Components/Slider";

const rowLeftVariant = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const rowRightVariant = {
  hidden: {
    x: -window.outerWidth - 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: window.outerWidth + 5,
  },
};

const boxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -30,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

const boxVariant2 = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -30,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

const movieInfoVariant = {
  hover: {
    opacity: 1,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

const ClickedTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
`;

const Home = () => {
  const { data: nowPlayMovies, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMoviesNowPlaying);
  const { data: popularMovies, isLoading: popularLoading } =
    useQuery<IGetMovieResult>(["movies", "popular"], getMoviesPopular);
  const { data: TopLatedMovies, isLoading: toplatedLoading } =
    useQuery<IGetMovieResult>(["movies", "topLated"], getMoviesToprated);

  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(false);
  const changeDirection = () => setDirection((prev) => !prev);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const history = useHistory();
  const boxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onClickOverlay = () => history.goBack();

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const clickedMovie =
    bigMovieMatch &&
    nowPlayMovies?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );

  return (
    <>
      <RootHome>
        {nowPlayingLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPic={makeImagePath(
                nowPlayMovies?.results[0].backdrop_path || ""
              )}
            >
              <Title>{nowPlayMovies?.results[0].title}</Title>
              <Overview>{nowPlayMovies?.results[0].overview}</Overview>
            </Banner>

            <SliderContainer>
              {nowPlayMovies ? (
                <SliderComponent movies={nowPlayMovies} sliderKey="a" />
              ) : null}
              {popularMovies ? (
                <SliderComponent movies={popularMovies} sliderKey="b" />
              ) : null}
            </SliderContainer>

            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onClickOverlay}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  ></Overlay>
                  <ClickedMovie
                    layoutId={bigMovieMatch.params.movieId}
                    style={{ top: scrollY.get() + 70 }}
                  >
                    {clickedMovie && (
                      <>
                        <ClickedMovieCover
                          style={{
                            backgroundImage: `url(
                              ${makeImagePath(
                                clickedMovie.backdrop_path,
                                "w500"
                              )}
                            )`,
                          }}
                        />
                        <ClickedTitle>{clickedMovie?.title}</ClickedTitle>
                      </>
                    )}
                  </ClickedMovie>
                </>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </RootHome>
    </>
  );
};

export default Home;
