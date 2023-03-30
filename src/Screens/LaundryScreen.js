import * as React from "react";
import { useState } from "react";
import {Button} from 'react-bootstrap';
import ClothingViewer from "../Components/ClothingViewer";

const LaundryScreen = (props) => {

  return (
    <div>
      <div className="closetHeader">
        <h1>Laundry</h1>
        <Button onClick={() => {props.setDirtyClothes([])}}>Clean All</Button>
      </div>
      <ClothingViewer clothingArray={props.dirtyClothes} />
    </div>
  );
};

export default LaundryScreen;
