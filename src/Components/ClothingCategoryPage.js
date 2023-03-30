import * as React from "react";
import clothingArray from "../Data/DummyData";

const ClothingCategoryViewer = (props) => {
  console.log(props.category);

  return (
    <div className="clothingViewerContainer">
      {clothingArray
        .filter((item) => {
          if (props.category === "all" || props.category === item.category) {
            return item;
          }
        })
        .map((item, index) => {
          return <img className="categoryItem" src={item.image} />;
        })}
    </div>
  );
};

export default ClothingCategoryViewer;
