import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keywords");
  console.log(keyword);

  return <></>;
};

export default Search;
