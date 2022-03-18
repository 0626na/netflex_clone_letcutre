import { useQuery } from "react-query";
import {
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesToprated,
  IGetMovieResult,
} from "../api";
import { makeImagePath } from "../utiles";
import {
  Banner,
  Loader,
  Overview,
  RootHome,
  Title,
  SliderContainer,
} from "../Components/styledComponents";
import SliderComponent from "../Components/Slider";

const Home = () => {
  const { data: nowPlayMovies, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMoviesNowPlaying);
  const { data: popularMovies, isLoading: popularLoading } =
    useQuery<IGetMovieResult>(["movies", "popular"], getMoviesPopular);
  const { data: TopLatedMovies, isLoading: toplatedLoading } =
    useQuery<IGetMovieResult>(["movies", "topLated"], getMoviesToprated);

  return (
    <>
      <RootHome>
        {nowPlayingLoading && popularLoading && toplatedLoading ? (
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
          </>
        )}
      </RootHome>
    </>
  );
};

export default Home;
