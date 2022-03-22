import { motion } from "framer-motion";
import styled from "styled-components";

export const RootContainer = styled.div`
  background-color: ${(prop) => prop.theme.black.veryDark};
  width: 100%;
  height: 200vh;
  z-index: auto;
`;

export const Loader = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPic: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${(prop) => prop.bgPic});
  background-size: cover;
`;
export const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;
export const Overview = styled.p`
  width: 55%;
  font-size: 20px;
`;

export const SliderContainer = styled.div`
  position: relative;
  top: -250px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 60px;
`;

export const Slider = styled.div`
  position: relative;
  height: 250px;
  top: -30px;
`;

export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 90%;
  position: absolute;
  padding-left: 60px;
  padding-right: 90px;
`;

export const Box = styled(motion.div)<{ bgpic: string }>`
  background: url(${(props) => props.bgpic}),
    url("https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg");
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 40px;
  border-radius: 10px;
  overflow: hidden;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const MovieInfo = styled(motion.div)`
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TitleInInfo = styled.span`
  text-align: center;
  font-size: 18px;
`;

export const RatingInInfo = styled.span`
  text-align: center;
  font-size: 13px;
`;

export const ClickedMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0px;
  left: 0px;
  margin: 0 auto;
  background-color: ${(prop) => prop.theme.black.veryDark};
  border-radius: 10px;
`;

export const ClickedTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  margin-top: 20px;
  margin-left: 15px;
  font-size: 25px;
`;

export const ClickedRelease = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 15px;
  margin-left: 15px;
`;

export const ClickedOverView = styled.p`
  color: ${(props) => props.theme.white.lighter};
  width: 70%;
  font-size: 12px;
  text-align: justify;
  margin-left: 15px;
  margin-top: 10px;
`;

export const ClickedGenre = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 11px;
  margin-left: 15px;
  margin-top: 2px;
`;

export const GenreTag = styled.span`
  margin: auto 2px;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ClickedMovieCover = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

export const ClickedMovieHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ClickedMovieDetail = styled.div`
  display: flex;
  align-items: center;
`;

export const RowTitle = styled.h3`
  margin-left: 60px;
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: 600;
`;

export const SearchResult = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 90%;
  position: absolute;
  top: 10%;
  left: 5%;
`;
