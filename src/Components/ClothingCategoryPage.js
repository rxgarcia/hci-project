import * as React from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ClothingCategoryViewer = (props) => {
  let clothingArray = props.clothingArray;
  let nav = useNavigate()
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
          if(props.homeDetails.state) {
            return <img key={index} onClick={() => {props.addHelper(item)
              nav("/")
              props.addDirtyClothes(item)
            }} className="categoryItem" src={item.image} alt={item.title} />;
          } else 
          if (props.selectItems) {
            return <img onClick={() => {props.addSelectedItems(item)}} className="categoryItem" src={item.image} alt={item.title} />;
          } else {
            return (
              <Link to={"/item/" + item.id} key={index}>
                <img className="categoryItem" src={item.image} alt={item.title} />
              </Link>
            );
          }
        })}
    </div>
  );
};

export default ClothingCategoryViewer;
