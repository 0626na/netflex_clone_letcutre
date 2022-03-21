import {
  Banner,
  Loader,
  Overview,
  RootContainer,
  SliderContainer,
  Title,
} from "../Components/styledComponents";
import { useQuery } from "react-query";
import {
  getSeriesPopular,
  getSeriesToday,
  getSeriesTopRated,
  IGetVideosResult,
} from "../api";
import { makeImagePath } from "../utiles";
import SliderComponent from "../Components/Slider";
import { useRecoilValue } from "recoil";
import { selectedMovies, sliderKeyInRecoil } from "../atom";
import Modal from "../Components/Modal";

const Series = () => {
  const { data: todaySeries, isLoading: todayLoading } =
    useQuery<IGetVideosResult>("[series,Today]", getSeriesToday);
  const { data: popularSeries, isLoading: popularLoading } =
    useQuery<IGetVideosResult>("[series,Popular]", getSeriesPopular);
  const { data: topratedSeries, isLoading: topLoading } = useQuery(
    "[series,TopRated]",
    getSeriesTopRated
  );
  const selectedMovie = useRecoilValue(selectedMovies);
  const selectedSliderKey = useRecoilValue(sliderKeyInRecoil);
  return (
    <RootContainer>
      {todayLoading && popularLoading && topLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPic={makeImagePath(todaySeries?.results[0].backdrop_path + "")}
          >
            <Title>
              {todaySeries?.results[0].name ||
                todaySeries?.results[0].original_name}
            </Title>
            <Overview>{todaySeries?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            {todaySeries ? (
              <SliderComponent
                movies={todaySeries}
                sliderKey="todayAir"
                sliderTitle="당일 방영중"
              />
            ) : null}
            {popularSeries ? (
              <SliderComponent
                movies={popularSeries}
                sliderKey="popularAir"
                sliderTitle="인기순"
              />
            ) : null}
            {topratedSeries ? (
              <SliderComponent
                movies={topratedSeries}
                sliderKey="topRated"
                sliderTitle="Top20"
              />
            ) : null}
          </SliderContainer>
          {selectedMovie ? (
            <Modal movies={selectedMovie} sliderKey={selectedSliderKey} />
          ) : null}
        </>
      )}
    </RootContainer>
  );
};

export default Series;
