import * as React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ClothingViewer from "../Components/ClothingViewer";

const LaundryScreen = (props) => {
  const [clothesInLaundry, setClothesInLaundry] = useState(props.dirtyClothes);

  const handleClearAll = () => {
    props.setDirtyClothes([]);
    setClothesInLaundry([]);
  }

  return (
    <div className="laundry-background">
      <div className="closetHeader">
        <Button
          onClick={handleClearAll}
        >
          Clean All
        </Button>
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
      <ClothingViewer clothingArray={clothesInLaundry} />
    </div>
  );
};

export default LaundryScreen;
