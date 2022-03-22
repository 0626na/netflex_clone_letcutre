import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IGenres, IVideo } from "../api";
import { movieGenres, selectedMovies } from "../atom";
import { makeImagePath } from "../utiles";
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
  ClickedMovieHeader,
  ClickedMovieDetail,
} from "./styledComponents";

interface IModal {
  sliderKey: string;
  movies: undefined | IVideo[];
}

const Modal = ({ movies, sliderKey }: IModal) => {
  const bigMovieMatch = useRouteMatch<{ videoId: string }>("/movies/:videoId");
  const bigSeriesMatch = useRouteMatch<{ videoId: string }>("/series/:videoId");
  const searchMatch = useRouteMatch<{ videoId: string }>("/search/:videoId");
  const { scrollY } = useViewportScroll();
  const resetMovies = useSetRecoilState(selectedMovies);
  const genres = useRecoilValue<IGenres>(movieGenres);
  const history = useHistory();
  const currentMatch = bigMovieMatch || bigSeriesMatch || searchMatch;
  const clickedMovie =
    currentMatch &&
    movies?.find((movie) => movie.id === +currentMatch.params.videoId);

  const onClickOverlay = () => {
    resetMovies(undefined);
    history.goBack();
  };

  return (
    <AnimatePresence>
      {currentMatch ? (
        <>
          <Overlay
            onClick={onClickOverlay}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></Overlay>

          <ClickedMovie
            layoutId={currentMatch.params.videoId + sliderKey}
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
                          ), url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg")`,
                  }}
                />
                <ClickedMovieHeader>
                  <ClickedTitle>
                    {clickedMovie?.title ||
                      clickedMovie.name ||
                      clickedMovie.original_name}
                  </ClickedTitle>
                  <ClickedMovieDetail>
                    <ClickedRelease>
                      {clickedMovie.first_air_date ||
                        (clickedMovie.release_date
                          ? clickedMovie.release_date.split("-")[0]
                          : "")}
                    </ClickedRelease>
                    <RatingInInfo>
                      <FontAwesomeIcon
                        icon={faStar}
                        color="#fffa65"
                        style={{ marginLeft: "10px" }}
                      />{" "}
                      {clickedMovie.vote_average}
                    </RatingInInfo>
                    <ClickedGenre>
                      {clickedMovie.genre_ids.map((genId) => (
                        <GenreTag>
                          {
                            genres.genres.find((item) => item.id === genId)
                              ?.name
                          }
                        </GenreTag>
                      ))}
                    </ClickedGenre>
                  </ClickedMovieDetail>
                </ClickedMovieHeader>
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
