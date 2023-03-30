import * as React from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import ClothingViewer from "../Components/ClothingViewer";

const ClosetScreen = ( {clothingArray, addHelper, addDirtyClothes} ) => {
  const state = useLocation();
  console.log(state)
  const handleSearch = () => {
    console.log("searched");
  };

  console.log(clothingArray);

  return (
    <div>
      <div className="closetHeader">
        <h1>Closet</h1>
        <div className="closetHeaderButtons">
          <Button className="closetHeaderButtonItem">Search</Button>
          <Link to="/add_item">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ClothingViewer clothingArray={clothingArray} homeDetails={state} addHelper={addHelper} addDirtyClothes={addDirtyClothes}/>
    </div>
  );
};

export default ClosetScreen;
