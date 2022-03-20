import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IGenres } from "../api";
import { movieGenres, selectedMovies } from "../atom";
import { makeImagePath } from "../utiles";
import { IGetMovieResult } from "./Slider";
import {
  ClickedGenre,
  ClickedMovie,
  ClickedMovieCover,
  ClickedOverView,
  ClickedRelease,
  ClickedTitle,
  GenreTag,
  Overlay,
  RatingInInfo,
} from "./styledComponents";

interface IModal {
  sliderKey: string;
  movies: IGetMovieResult | undefined;
}

const Modal = ({ movies, sliderKey }: IModal) => {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const resetMovies = useSetRecoilState(selectedMovies);
  const genres = useRecoilValue<IGenres>(movieGenres);
  const history = useHistory();
  const clickedMovie =
    bigMovieMatch &&
    movies?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  const onClickOverlay = () => {
    resetMovies(undefined);
    history.goBack();
  };

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onClickOverlay}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></Overlay>

          <ClickedMovie
            layoutId={bigMovieMatch.params.movieId + sliderKey}
            style={{ top: scrollY.get() + 90 }}
          >
            {clickedMovie && (
              <>
                <ClickedMovieCover
                  style={{
                    backgroundImage: `url(
                        ${makeImagePath(
                          clickedMovie.backdrop_path ||
                            clickedMovie.poster_path,
                          "w500"
                        )}
                          )`,
                  }}
                />
                <ClickedTitle>
                  {clickedMovie?.title}
                  <ClickedRelease>
                    {clickedMovie.release_date.split("-")[0]}
                  </ClickedRelease>
                  <ClickedGenre>
                    {clickedMovie.genre_ids.map((genId) => (
                      <GenreTag>
                        {genres.genres.find((item) => item.id === genId)?.name}
                      </GenreTag>
                    ))}
                  </ClickedGenre>
                  <RatingInInfo>
                    <FontAwesomeIcon
                      icon={faStar}
                      color="#fffa65"
                      style={{ marginLeft: "10px" }}
                    />{" "}
                    {clickedMovie.vote_average}
                  </RatingInInfo>
                </ClickedTitle>
                <ClickedOverView>{clickedMovie.overview}</ClickedOverView>
              </>
            )}
          </ClickedMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
