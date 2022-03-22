import { useQuery } from "react-query";
import {
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesToprated,
  IGetVideosResult,
} from "../api";
import { makeImagePath } from "../utiles";
import {
  Banner,
  Loader,
  Overview,
  Title,
  SliderContainer,
  RootContainer,
} from "../Components/styledComponents";
import SliderComponent from "../Components/Slider";
import Modal from "../Components/Modal";
import { selectedMovies, sliderKeyInRecoil } from "../atom";
import { useRecoilValue } from "recoil";

const Home = () => {
  const { data: nowPlayMovies, isLoading: nowPlayingLoading } =
    useQuery<IGetVideosResult>(["movies", "nowPlaying"], getMoviesNowPlaying);
  const { data: popularMovies, isLoading: popularLoading } =
    useQuery<IGetVideosResult>(["movies", "popular"], getMoviesPopular);
  const { data: TopLatedMovies, isLoading: toplatedLoading } =
    useQuery<IGetVideosResult>(["movies", "topLated"], getMoviesToprated);

  const key = useRecoilValue(sliderKeyInRecoil);
  const selected = useRecoilValue(selectedMovies);

  return (
    <>
      <RootContainer>
        {nowPlayingLoading && popularLoading && toplatedLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPic={makeImagePath(
                nowPlayMovies?.results[0].backdrop_path || ""
              )}
            >
              <Title>
                {nowPlayMovies?.results[0].title ||
                  nowPlayMovies?.results[0].original_title}
              </Title>
              <Overview>{nowPlayMovies?.results[0].overview}</Overview>
            </Banner>

            <SliderContainer>
              {nowPlayMovies ? (
                <SliderComponent
                  movies={nowPlayMovies}
                  sliderKey="nowPlaying"
                  sliderTitle="현재 상영중"
                />
              ) : null}
              {popularMovies ? (
                <SliderComponent
                  movies={popularMovies}
                  sliderKey="popular"
                  sliderTitle="인기순"
                />
              ) : null}
              {TopLatedMovies ? (
                <SliderComponent
                  movies={TopLatedMovies}
                  sliderKey="Top20"
                  sliderTitle="Top 20"
                />
              ) : null}
            </SliderContainer>
            {selected ? (
              <Modal sliderKey={key} movies={selected.results} />
            ) : null}
          </>
        )}
      </RootContainer>
    </>
  );
};

export default Home;
