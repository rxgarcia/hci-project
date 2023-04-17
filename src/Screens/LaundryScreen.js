import * as React from "react";
import { useState } from "react";
import {Button} from 'react-bootstrap';
import ClothingViewer from "../Components/ClothingViewer";

const LaundryScreen = (props) => {
  return (
    <div className="laundry-background">
      <div className="closetHeader">
        <Button onClick={() => {props.setDirtyClothes([])}}>Clean All</Button>
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Your Laundry
      </div>
      <ClothingViewer clothingArray={props.dirtyClothes} />
    </div>
  );
};

export default LaundryScreen;
