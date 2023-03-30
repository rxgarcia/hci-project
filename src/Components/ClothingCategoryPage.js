import * as React from "react";
import clothingArray from "../Data/DummyData";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";


const ClothingCategoryViewer = (props) => {
  console.log(props.category);

  const handleItemClicked = () => {

  }

  return (
    <div className="clothingViewerContainer">
      {clothingArray
        .filter((item) => {
          if (props.category === "all" || props.category === item.category) {
            return item;
          }
        })
        .map((item, index) => {
          return <Nav.Link href={"/item/" + item.id}>
            <img className="categoryItem" src={item.image} alt="img"/>
          </Nav.Link>;
        })}
    </div>
  );
};

export default ClothingCategoryViewer;
