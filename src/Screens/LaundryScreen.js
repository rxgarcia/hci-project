import * as React from "react";
import {Button} from 'react-bootstrap';
import ClothingViewer from "../Components/ClothingViewer";

const LaundryScreen = (props) => {
  console.log(props.dirtyClothes);

  return (
    <div>
      <div className="closetHeader">
        <h1>Laundry</h1>
        <Button className="closetHeaderButtonItem">Search</Button>
      </div>
      <ClothingViewer clothingArray={props.dirtyClothes} />
    </div>
  );
};

export default LaundryScreen;
