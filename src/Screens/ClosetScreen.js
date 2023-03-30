import * as React from "react";
import Button from "react-bootstrap/Button";
import ClothingViewer from "../Components/ClothingViewer";

const ClosetScreen = () => {
  const handleSearch = () => {
    console.log("searched");
  };

  return (
    <div>
      <div className="closetHeader">
        <h1>Closet</h1>
        <div className="closetHeaderButtons">
          <Button className="closetHeaderButtonItem">Search</Button>
          <Button>Add</Button>
        </div>
      </div>
      <ClothingViewer />
    </div>
  );
};

export default ClosetScreen;
