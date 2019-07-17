import wine from "./wine.svg";
import cars from "./cars.svg";
import art from "./art.svg";
import music from "./music.svg";
import outdoor from "./outdoor.svg";
import trophy from "./trophy.svg";
import home from "./home2.svg";

const getIcon = (type, defaultFunction = () => "") => {
  switch (type.toLowerCase()) {
    case "wine":
      return wine;
    case "driving":
    case "cars":
      return cars;
    case "art":
    case "arts":
      return art;
    case "music":
      return music;
    case "outdoor":
      return outdoor;
    case "trophy":
    case "sports":
      return trophy;
    case "home":
      return home;
    default:
      return defaultFunction();
  }
};

export { getIcon, wine, home, outdoor, cars, art, music, trophy };
