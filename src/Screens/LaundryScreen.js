import * as React from "react";
import ClothingViewer from "../Components/ClothingViewer";

const LaundryScreen = (props) => {
  console.log(props.dirtyClothes);

  return (
    <div>
      <h1>Laundry</h1>
      <ClothingViewer clothingArray={props.dirtyClothes} />
    </div>
  );
};

export default LaundryScreen;
