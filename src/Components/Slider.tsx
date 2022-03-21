import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { selectedMovies, sliderKeyInRecoil } from "../atom";
import { makeImagePath } from "../utiles";
import {
  boxVariant,
  movieInfoVariant,
  rowVariant,
  sliderArrowVariant,
} from "./AnimationVariants";
import {
  Box,
  MovieInfo,
  RatingInInfo,
  Row,
  RowTitle,
  Slider,
  TitleInInfo,
} from "./styledComponents";
import { IGetVideosResult, IVideo } from "../api";

interface ISliderCom {
  movies: IGetVideosResult;
  sliderKey: string;
  sliderTitle: string;
}

const SliderButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 200px;
  cursor: pointer;
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
  z-index: 10;
  position: absolute;
`;

const SliderComponent = ({ movies, sliderKey, sliderTitle }: ISliderCom) => {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(false);
  const setKey = useSetRecoilState(sliderKeyInRecoil);
  const setMovies = useSetRecoilState(selectedMovies);
  const offset = 6;
  const history = useHistory();
  const location = useLocation();

  const boxClicked = (videoId: number) => {
    setKey(sliderKey);
    setMovies(movies);
    history.push(
      location.pathname === "/series"
        ? `/series/${videoId}`
        : `/movies/${videoId}`
    );
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const IncreaseIndex = () => {
    if (movies) {
      setDirection(true);
      if (leaving) return;
      setLeaving(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const DecreaseIndex = () => {
    if (movies) {
      setDirection(false);
      if (leaving) return;
      setLeaving(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  return (
    <>
      <Slider>
        <RowTitle>{sliderTitle}</RowTitle>

        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={direction}
        >
          <SliderButton
            key="button1"
            onClick={DecreaseIndex}
            variants={sliderArrowVariant}
            initial="normal"
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </SliderButton>
          <Row
            custom={direction}
            key={index}
            variants={rowVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.8 }}
          >
            {movies.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie: IVideo) => (
                <Box
                  layout
                  layoutId={movie.id + sliderKey}
                  onClick={() => boxClicked(movie.id)}
                  variants={boxVariant}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  key={movie.id}
                  bgpic={makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w300"
                  )}
                >
                  <MovieInfo variants={movieInfoVariant}>
                    <TitleInInfo>
                      {movie.title || movie.name || movie.original_name}
                    </TitleInInfo>
                    <RatingInInfo>
                      <FontAwesomeIcon color="#fffa65" icon={faStar} />{" "}
                      {movie.vote_average}
                    </RatingInInfo>
                  </MovieInfo>
                </Box>
              ))}
          </Row>
          <SliderButton
            key="button2"
            onClick={IncreaseIndex}
            variants={sliderArrowVariant}
            initial="normal"
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </SliderButton>
        </AnimatePresence>
      </Slider>
    </>
  );
};

export default SliderComponent;
