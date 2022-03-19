import { motion } from "framer-motion";
import styled from "styled-components";

export const RootHome = styled.div`
  background-color: black;
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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
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

export const RowContainer = styled.div``;

export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  padding-right: 65px;
`;

export const Box = styled(motion.div)<{ bgpic: string }>`
  background-image: url(${(props) => props.bgpic});
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
  font-size: 30px;
`;

export const ClickedRelease = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 15px;
  margin-left: 5px;
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
  font-size: 10px;
  margin-left: 15px;
  padding-bottom: 20px;
`;

export const GenreTag = styled.span`
  margin: 10px 2px;
  border-radius: 5px;
  padding: 2px;
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

export const RowTitle = styled.h3`
  margin-left: 5px;
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: 600;
`;
