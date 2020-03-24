import React, { useState, useEffect } from "react";

const getSrcGenerator = ({ src, defaultSrc, placeholder }) => name => {
  if (name === "src") {
    return src;
  }
  if (name === "defaultSrc") {
    return defaultSrc;
  }
  if (name === "placeholder") {
    return placeholder;
  }
  return "";
};

export const useImage = ({
  placeholder = "",
  defaultSrc = "",
  src = "",
  order = ["src", "defaultSrc", "placeholder"]
}) => {
  const getSrc = getSrcGenerator({ src, defaultSrc, placeholder });
  const [index, setIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState(getSrc(order[index]));
  useEffect(() => {
    const newIndex = index + 1;
    const image = new Image(1, 1);

    image.onerror = error => {
      console.error(error);

      setIndex(newIndex);
      if (newIndex >= order.length) {
        return;
      }
      setImageSrc(getSrc(order[newIndex]));
    };
    image.src = imageSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, imageSrc]);
  return imageSrc;
};

const ReactImage = ({
  src = "",
  placeholder = "",
  defaultSrc = "",
  order = ["src", "defaultSrc", "placeholder"],
  alt = ""
}) => {
  const imageSrc = useImage({ src, placeholder, defaultSrc, order });
  return <img src={imageSrc} alt={alt} />;
};

export default ReactImage;
