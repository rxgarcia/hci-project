import * as React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClothingCategoryViewer from "./ClothingCategoryPage";

const ClothingViewer = () => {
  return (
    <div className="categorySelectorContainer">
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="mb-1"
        fill
      >
        <Tab eventKey="all" title="All">
          <ClothingCategoryViewer category="all" />
        </Tab>
        <Tab eventKey="tops" title="Tops">
          <ClothingCategoryViewer category="Top" />
        </Tab>
        <Tab eventKey="bottoms" title="Bottoms">
          <ClothingCategoryViewer category="Bottom" />
        </Tab>
        <Tab eventKey="shoes" title="Shoes">
          <ClothingCategoryViewer category="Shoes" />
        </Tab>
        <Tab eventKey="saved" title="Saved">
          <ClothingCategoryViewer category="saved" />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ClothingViewer;
