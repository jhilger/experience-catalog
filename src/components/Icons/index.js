import wine from "../../img/Wine_SpiritsIcon.svg";
import cars from "../../img/cars.svg";
import art from "../../img/Arts_TheatreIcon.svg";
import music from "../../img/music.svg";
import outdoor from "../../img/outdoor.svg";
import trophy from "../../img/Lifestyle_AthleticsIcon.svg";
import gold from "../../img/dollar1.svg";
import platinum from "../../img/dollar2.svg";
import diamond from "../../img/dollar3.svg";
import home from "../../img/home.svg";
import wineGray from "../../img/wine-gray.svg";
import carsGray from "../../img/cars-gray.svg";
import artGray from "../../img/art-gray.svg";
import musicGray from "../../img/music-gray.svg";
import outdoorGray from "../../img/outdoor-gray.svg";

import goldGray from "../../img/dollar1-gray.svg";
import platinumGray from "../../img/dollar2-gray.svg";
import diamondGray from "../../img/dollar3-gray.svg";
import homeGray from "../../img/home-gray.svg";
import adventureGray from "../../img/Outdoor_AdventureIcon.svg";
import entertainment from "../../img/Concert_EntertainmentIcon.svg";
import culinary from "../../img/CulinaryIcon.svg";

const getIcon = (experienceType, type) => {
  switch (experienceType) {
    case "wine":
      return wineGray;
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
    case "athletics":
      return trophy;
    case "gold":
    case "tier 3":
      return type === "gray" ? goldGray : gold;
    case "platinum":
    case "tier 2":
      return type === "gray" ? platinumGray : platinum;
    case "diamond":
    case "tier 1":
      return type === "gray" ? diamondGray : diamond;
    case "adventure":
      return adventureGray;
    case "entertainment":
      return entertainment;
    case "culinary":
      return culinary;
    case "home":
      return type === "gray" ? homeGray : home;
    default:
      return experienceType.Image_Path__c;
  }
};

export { getIcon, wine, home, outdoor, cars, art, music, trophy };
