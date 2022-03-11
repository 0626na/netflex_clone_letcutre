import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utiles";
import { useState } from "react";

const RootHome = styled.div`
  background-color: black;
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
  position: relative;
  top: -200px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  font-size: 40px;
  color: black;
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

const Home = () => {
  const { data: movies, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const IncreaseIndex = () => setIndex((prev) => prev + 1);
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
              <AnimatePresence>
                <Row
                  key={index}
                  variants={rowVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Box key={i}>{i}</Box>
                  ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </>
        )}
      </RootHome>
    </>
  );
};

export default Home;
