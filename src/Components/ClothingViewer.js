import * as React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import ClothingCategoryViewer from "./ClothingCategoryPage";
import "./Components.css";

const ClothingViewer = ({
  clothingArray,
  addSelectedItems,
  selectItems,
  addHelper,
  addDirtyClothes,
}) => {
  const [query, setQuery] = useState("");
  const [filteredClothes, setFilteredClothes] = useState(clothingArray);

  // update filteredCLothes when clothingArray is modified
  useEffect(() => {
    setFilteredClothes(clothingArray);
  }, [clothingArray]);


  const handleQuery = (text) => {
    setQuery(text);
    setFilteredClothes(
      clothingArray.filter((item, index) => {
        return item.title.includes(text);
      })
    );
  };

  return (
    <div className="categorySelectorContainer">
      <input
        type="text"
        value={query}
        onChange={(e) => handleQuery(e.target.value)}
        placeholder="Search"
        className="clothingViewerSearch"
      />
      <Tabs
        defaultActiveKey={"all"}
        id="uncontrolled-tab-example"
        className="clothingViewerTabs"
        fill
      >
        <Tab eventKey="all" title="All" tabClassName="clothingViewerTab">
          <ClothingCategoryViewer
            category="all"
            clothingArray={filteredClothes}
            addSelectedItems={addSelectedItems}
            selectItems={selectItems}
            addHelper={addHelper}
            addDirtyClothes={addDirtyClothes}
          />
        </Tab>
        <Tab eventKey="tops" title="Tops">
          <ClothingCategoryViewer
            category="Top"
            clothingArray={filteredClothes}
            addSelectedItems={addSelectedItems}
            selectItems={selectItems}
            addHelper={addHelper}
            addDirtyClothes={addDirtyClothes}
          />
        </Tab>
        <Tab eventKey="bottoms" title="Bottoms">
          <ClothingCategoryViewer
            category="Bottom"
            clothingArray={filteredClothes}
            addSelectedItems={addSelectedItems}
            selectItems={selectItems}
            addHelper={addHelper}
            addDirtyClothes={addDirtyClothes}
          />
        </Tab>
        <Tab eventKey="shoes" title="Shoes">
          <ClothingCategoryViewer
            category="Shoes"
            clothingArray={filteredClothes}
            addSelectedItems={addSelectedItems}
            selectItems={selectItems}
            addHelper={addHelper}
            addDirtyClothes={addDirtyClothes}
          />
        </Tab>
        <Tab eventKey="saved" title="Saved">
          <ClothingCategoryViewer
            category="saved"
            clothingArray={filteredClothes}
            addSelectedItems={addSelectedItems}
            selectItems={selectItems}
            addHelper={addHelper}
            addDirtyClothes={addDirtyClothes}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ClothingViewer;
