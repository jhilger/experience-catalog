import React, { useState, useEffect, forwardRef } from "react";

const DropDown = (
  {
    list = [],
    itemLabelField = item => item.Name,
    hovered,
    onHover = () => {},
    onItemClicked = () => {}
  },
  ref
) => {
  // eslint-disable-next-line no-unused-vars
  const [currentHover, setCurrentHover] = useState(hovered);

  useEffect(() => {
    setCurrentHover(hovered);
  }, [hovered]);

  return (    
  <ul className={ (list.length > 0) ? "active" : "" }   
      ref={ref}
      onMouseOver={() => (ref.current.mouseOver = true)}
      onFocus={() => (ref.current.mouseOver = true)}
      onMouseOut={() => (ref.current.mouseOver = false)}
      onBlur={() => (ref.current.mouseOver = false)}
    >
      {list.map(item => (
        <li
          onMouseOver={() => {
            setCurrentHover(item.Id);
            onHover(item.Id);
          }}
          onFocus={() => {
            setCurrentHover(item.Id);
            onHover(item.Id);
          }}
          key={item.Id}
          onClick={e => {
            e.preventDefault();
            onItemClicked(item);
          }}
        >
          {itemLabelField(item)}
        </a>
      ))}
    </ul>
  );
};

export default forwardRef(DropDown);


/*return (
  <div
    style={{ position: "absolute", backgroundColor: "#ffffff" }}
    ref={ref}
    onMouseOver={() => (ref.current.mouseOver = true)}
    onFocus={() => (ref.current.mouseOver = true)}
    onMouseOut={() => (ref.current.mouseOver = false)}
    onBlur={() => (ref.current.mouseOver = false)}
  >
    {list.map(item => (
      <a
        href="#clickItem"
        style={{
          display: "block",
          color: "#222",
          backgroundColor: currentHover === item.Id ? "#ccc" : ""
        }}
        onMouseOver={() => {
          setCurrentHover(item.Id);
          onHover(item.Id);
        }}
        onFocus={() => {
          setCurrentHover(item.Id);
          onHover(item.Id);
        }}
        key={item.Id}
        onClick={e => {
          e.preventDefault();

          onItemClicked(item);
        }}
      >
        {item[labelField]}
      </a>
    ))}
  </div>
);*/