import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100px;
  position: fixed;
  top: 0;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  height: 100px;
`;
const Search = styled(motion.svg)`
  height: 20px;
`;
const SearchButton = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
`;
const SearchInput = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
  background: transparent;
  border: 1px solid white;
  padding: 5px;
  padding-left: 10px;
  border-radius: 2px;
  color: ${(props) => props.theme.white.lighter};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  color: white;
`;
const Item = styled.li`
  margin-right: 20px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(prop) => prop.theme.red};
`;

const logoVariant = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0.5, 0, 1],
  },
};

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const headerVariant = {
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
    transition: {
      duration: 0.2,
    },
  },
  top: {
    backgroundColor: "rgba(0,0,0,0)",
    transition: {
      duration: 0.2,
    },
  },
};

interface IForm {
  keywords: string;
}

const Header = () => {
  const home = useRouteMatch("/");
  const series = useRouteMatch("/series");
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [openSearch, setOpen] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const history = useHistory();
  useEffect(
    () =>
      scrollY.onChange(() => {
        if (scrollY.get() > 0) {
          navAnimation.start("scroll");
        } else {
          navAnimation.start("top");
        }
      }),
    [scrollY, navAnimation]
  );
  const open = () => {
    setOpen((prev) => !prev);

    if (openSearch) {
      inputAnimation.start({
        scaleX: 0,
        type: "linear",
        transition: { duration: 0.2 },
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
        type: "linear",
        transition: { duration: 0.2 },
      });
    }
  };
  const onValid = (data: IForm) => {
    history.push(`/search?keywords=${data.keywords}`);
    setValue("keywords", "");
  };
  return (
    <Nav variants={headerVariant} initial="top" animate={navAnimation}>
      <Column>
        <Logo
          variants={logoVariant}
          initial="normal"
          whileHover="active"
          animate="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>

        <Items>
          <HeaderLink to="/">
            <Item>
              Home {home?.isExact ? <Circle layoutId="circle" /> : null}
            </Item>
          </HeaderLink>
          <HeaderLink to="/series">
            <Item>Series {series ? <Circle layoutId="circle" /> : null}</Item>
          </HeaderLink>
        </Items>
      </Column>
      <Column>
        <SearchButton onSubmit={handleSubmit(onValid)}>
          <Search
            onClick={open}
            animate={{
              type: "linear",
              x: openSearch ? -180 : 0,
              transition: { duration: 0.2 },
            }}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </Search>
          <SearchInput
            {...register("keywords", { minLength: 2, required: true })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            placeholder="title,genre,people"
          />
        </SearchButton>
      </Column>
    </Nav>
  );
};
export default Header;
