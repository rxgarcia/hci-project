import * as React from "react";

const HomeScreen = (props) => {
  return (
    <div>
      <h1>Home Screen</h1>
      {props.currentOutfit.map((item, index) => {
        return <img className="categoryItem" src={item.image} alt={item.title} />;
      })}
    </div>
  );
};

export default HomeScreen;
