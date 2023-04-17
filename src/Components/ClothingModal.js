import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  CheckCircleFill,
  PlusCircleFill,
  SquareFill,
} from "react-bootstrap-icons";

const ClothingModal = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refresh, refresher] = useState(false)

  const handleRemoveSelected = (item) => {
    const id = item.id;
    let item1 = selectedItems.find((e) => e["id"] == id);
    const index = selectedItems.indexOf(item);
    const copy = selectedItems
    if (index > -1) {
      copy.splice(index, 1);
      setSelectedItems(copy);
      refresher(!refresh)
    }
  };
  const handleAddSelection = (item) => {
    const newList = selectedItems.concat(item);
    setSelectedItems(newList);
  };
  const handleClick = (item) => {
    if (selectedItems.includes(item)) {
      handleRemoveSelected(item);
    } else {
      handleAddSelection(item);
    }
  };

  let layerLabel = props.layer;
  if (layerLabel.at(-1) !== "s") {
    layerLabel = layerLabel + "s";
  }

  const SelectedArticle = (props) => {
    return (
      <div>
        <img
          className="modalItem selected"
          src={props.item.image}
          alt={props.item.title}
          onClick={() => handleClick(props.item)}
        />
        <CheckCircleFill
          className="selectCheck"
          size={25}
          onClick={() => {
            handleClick(props.item);
          }}
        />
        <SquareFill size={17} className="filler" />
      </div>
    );
  };
  const UnselectedArticle = (props) => {
    return (
      <div>
        <img
          className="modalItem"
          src={props.item.image}
          alt={props.item.title}
          onClick={() => handleClick(props.item)}
        />
        <PlusCircleFill
          className="select"
          size={25}
          onClick={() => {
            handleClick(props.item);
          }}
        />
        <SquareFill size={17} className="filler" />
      </div>
    );
  };

  const ModifiedClothingCategoryViewer = (props) => {
    let clothingArray = props.clothingArray;

    return (
      <div className="clothingViewerContainer">
        {clothingArray
          .filter((item) => {
            if (
              (props.category === "all" ||
              props.category.toLowerCase() === item.category.toLowerCase()) && !(props.currentOutfit.includes(item) 
            )) {
              return item;
            }
          })
          .map((item, index) => {
            if (selectedItems.includes(item)) {
              return (
                <div className="articlecontainer">
                  <SelectedArticle item={item} />
                </div>
              );
            } else {
              return (
                <div className="articlecontainer">
                  <UnselectedArticle item={item} />
                </div>
              );
            }
          })}
      </div>
    );
  };

  return (
    <>
      <Modal className="transparent" show={true} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {layerLabel.charAt(0).toUpperCase() + layerLabel.slice(1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModifiedClothingCategoryViewer
            category={props.layer}
            clothingArray={props.filteredClothes}
            addHelper={props.addHelper}
            addDirtyClothes={props.addDirtyClothes}
            currentOutfit={props.currentOutfit[props.layer]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={
            () => {
                props.addHelper(selectedItems)
                props.handleClose()
            }}>
            Confirm Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClothingModal;
