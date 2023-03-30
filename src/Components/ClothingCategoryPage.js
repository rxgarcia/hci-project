import * as React from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const ClothingCategoryViewer = (props) => {
  console.log(props.category);
  let clothingArray = props.clothingArray;

  const handleItemClicked = () => {};

  return (
    <div className="clothingViewerContainer">
      {clothingArray
        .filter((item) => {
          if (props.category === "all" || props.category === item.category) {
            return item;
          }
        })
        .map((item, index) => {
          return (
            <Link to={"/item/" + item.id}>
              <img className="categoryItem" src={item.image} alt="img" />
            </Link>
          );
        })}
    </div>
  );
};

export default ClothingCategoryViewer;
