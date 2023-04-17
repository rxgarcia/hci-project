import * as React from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import ClothingViewer from "../Components/ClothingViewer";
import { PlusCircleFill } from "react-bootstrap-icons";
import "./HomeScreen.css";

const ClosetScreen = ({ clothingArray, addHelper, addDirtyClothes, loading }) => {
  const state = useLocation();

  if (loading)
  {
    return <div className="fullscreen-background"></div>
  }

  return (
    <div className="fullscreen-background">
      <div className="closetHeader">
        <Link to="/add_item">
          <PlusCircleFill className="headerButtons" size={30}/>
        </Link>
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Your Closet
      </div>
      <ClothingViewer
        clothingArray={clothingArray}
        homeDetails={state}
        addHelper={addHelper}
        addDirtyClothes={addDirtyClothes}
      />
    </div>
  );
};

export default ClosetScreen;
