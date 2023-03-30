import * as React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
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
          <Link to="/add_item">
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <ClothingViewer />
    </div>
  );
};

export default ClosetScreen;
