import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { getSearch, IGetVideosResult, IVideo } from "../api";
import { boxVariant, movieInfoVariant } from "../Components/AnimationVariants";
import Modal from "../Components/Modal";

import {
  Box,
  MovieInfo,
  RatingInInfo,
  RootContainer,
  SearchResult,
  TitleInInfo,
} from "../Components/styledComponents";
import { makeImagePath } from "../utiles";

const Search = () => {
  const location = useLocation();

  const history = useHistory();
  const keywords = new URLSearchParams(location.search).get("keywords");
  const { data, isLoading } = useQuery<IGetVideosResult>("search", () =>
    getSearch(keywords)
  );

  const boxClicked = (videoId: string) => {
    history.push(`/search/${videoId}`);
  };

  return (
    <>
      <RootContainer>
        {isLoading ? null : (
          <>
            <SearchResult>
              {data
                ? data.results.map((video: IVideo) =>
                    video.media_type === "movie" ||
                    video.media_type === "tv" ? (
                      <AnimatePresence>
                        <LayoutGroup>
                          <Box
                            layoutId={video.id + "search"}
                            onClick={() => boxClicked(video.id + "")}
                            variants={boxVariant}
                            initial="normal"
                            whileHover="hover"
                            transition={{ type: "tween" }}
                            key={video.id}
                            bgpic={makeImagePath(
                              video.backdrop_path || video.poster_path,
                              "w300"
                            )}
                          >
                            {video.media_type}
                            <MovieInfo variants={movieInfoVariant}>
                              <TitleInInfo>
                                {video.title ||
                                  video.name ||
                                  video.original_name}
                              </TitleInInfo>
                              <RatingInInfo>
                                <FontAwesomeIcon
                                  color="#fffa65"
                                  icon={faStar}
                                />{" "}
                                {video.vote_average}
                              </RatingInInfo>
                            </MovieInfo>
                          </Box>
                        </LayoutGroup>
                      </AnimatePresence>
                    ) : null
                  )
                : null}
            </SearchResult>
            {data ? <Modal sliderKey="search" movies={data.results} /> : null}
          </>
        )}
      </RootContainer>
    </>
  );
};

export default Search;
