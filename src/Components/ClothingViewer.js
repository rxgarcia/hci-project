import * as React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClothingCategoryViewer from "./ClothingCategoryPage";

const ClothingViewer = ( {clothingArray, addSelectedItems, selectItems }) => {
  return (
    <div className="categorySelectorContainer">
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="mb-1"
        fill
      >
        <Tab eventKey="all" title="All">
          <ClothingCategoryViewer category="all" clothingArray={clothingArray} addSelectedItems={addSelectedItems} selectItems={selectItems}/>
        </Tab>
        <Tab eventKey="tops" title="Tops">
        <ClothingCategoryViewer category="Top" clothingArray={clothingArray} addSelectedItems={addSelectedItems} selectItems={selectItems}/>
        </Tab>
        <Tab eventKey="bottoms" title="Bottoms">
        <ClothingCategoryViewer category="Bottom" clothingArray={clothingArray} addSelectedItems={addSelectedItems} selectItems={selectItems}/>
        </Tab>
        <Tab eventKey="shoes" title="Shoes">
        <ClothingCategoryViewer category="Shoes" clothingArray={clothingArray} addSelectedItems={addSelectedItems} selectItems={selectItems}/>
        </Tab>
        <Tab eventKey="saved" title="Saved">
        <ClothingCategoryViewer category="saved" clothingArray={clothingArray} addSelectedItems={addSelectedItems} selectItems={selectItems}/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ClothingViewer;
