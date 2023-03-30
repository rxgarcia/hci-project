import * as React from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";


const ClothingCategoryViewer = (props) => {
  console.log(props.category);
  let clothingArray = props.clothingArray;

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
