import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utiles";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const RootHome = styled.div`
  background-color: black;
  width: 100%;
  height: 200vh;
`;

const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPic: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPic});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  width: 55%;
  font-size: 20px;
`;

const Slider = styled.div`
  top: -200px;
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  //position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgpic: string }>`
  background-image: url(${(props) => props.bgpic});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 40px;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const MovieInfo = styled(motion.div)`
  padding: 10px 0;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const ClickedMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0px;
  left: 0px;
  margin: 0 auto;
  background-color: ${(prop) => prop.theme.black.lighter};
`;
const rowVariant = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
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

const movieInfoVariant = {
  hover: {
    opacity: 1,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

const offset = 6;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ClickedMovieCover = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 300px;
`;

const ClickedTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
`;

const Home = () => {
  const { data: movies, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const IncreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
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
    movies?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  return (
    <>
      <RootHome>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              onClick={IncreaseIndex}
              bgPic={makeImagePath(movies?.results[0].backdrop_path || "")}
            >
              <Title>{movies?.results[0].title}</Title>
              <Overview>{movies?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  key={index}
                  variants={rowVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.8 }}
                >
                  {movies?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layout
                        layoutId={movie.id + ""}
                        onClick={() => boxClicked(movie.id)}
                        variants={boxVariant}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        key={movie.id}
                        bgpic={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <MovieInfo variants={movieInfoVariant}>
                          <h4>{movie.title}</h4>
                        </MovieInfo>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
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
                        <h2>{clickedMovie?.title}</h2>
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
