import wine from "../../img/wine.svg";
import cars from "../../img/cars.svg";
import art from "../../img/art.svg";
import music from "../../img/music.svg";
import outdoor from "../../img/outdoor.svg";
import trophy from "../../img/trophy.svg";
import gold from "../../img/gold.svg";
import platinum from "../../img/platinum.svg";
import diamond from "../../img/diamond.svg";
import home from "../../img/home2.svg";
import wineGray from "../../img/wine-gray.svg";
import carsGray from "../../img/cars-gray.svg";
import artGray from "../../img/art-gray.svg";
import musicGray from "../../img/music-gray.svg";
import outdoorGray from "../../img/outdoor-gray.svg";
import trophyGray from "../../img/trophy-gray.svg";
import goldGray from "../../img/gold-gray.svg";
import platinumGray from "../../img/platinum-gray.svg";
import diamondGray from "../../img/diamond-gray.svg";

const getIcon = (experienceType, type) => {
  switch (experienceType) {
    case "wine":
      return type === "gray" ? wineGray : wine;
    case "driving":
    case "cars":
      return type === "gray" ? carsGray : cars;
    case "art":
    case "arts":
      return type === "gray" ? artGray : art;
    case "music":
      return type === "gray" ? musicGray : music;
    case "outdoor":
      return type === "gray" ? outdoorGray : outdoor;
    case "trophy":
    case "sports":
      return type === "gray" ? trophyGray : trophy;
    case "gold":
      return type === "gray" ? goldGray : gold;
    case "platinum":
      return type === "gray" ? platinumGray : platinum;
    case "diamond":
      return type === "gray" ? diamondGray : diamond;
    case "home":
      return home;
    default:
      return experienceType.Image_Path__c;
  }
};

export { getIcon, wine, home, outdoor, cars, art, music, trophy };
