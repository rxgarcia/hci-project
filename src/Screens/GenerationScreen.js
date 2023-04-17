import * as React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import ClothingViewer from "../Components/ClothingViewer";

const styleSlider = [
  "Super Casual",
  "Casual",
  "Business Casual",
  "Business Formal",
  "Formal",
];

const GenerationScreen = (props) => {
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [previewOutfit, setPreviewOutfit] = useState([]);
  const [calculatedStyle, setCalculatedStyle] = useState(2);

  const [displayInclude, setDisplayInclude] = useState(false);
  const [displayExclude, setDisplayExclude] = useState(false);

  const [adjustForWeather, setAdjustForWeather] = useState(false);
  const [preferColor, setPreferColor] = useState(false);
  const [includeDirty, setIncludeDirty] = useState(false);
  const [preferFav, setPreferFav] = useState(false);

  if (props.loading)
  {
    return <div className="fullscreen-background"></div>
  }

  const handleIncludeItem = (item) => {
    if (!exclusions.includes(item) && !inclusions.includes(item)) {
      setInclusions([...inclusions, item]);
    }
    setDisplayInclude(!displayInclude);
  };

  const handleExcludeItem = (item) => {
    if (!exclusions.includes(item) && !inclusions.includes(item)) {
      setExclusions([...exclusions, item]);
    }
    setDisplayExclude(!displayExclude);
  };

  const handleGenerate = () => {
    console.log(props.currentWeather);

    console.log(exclusions);

    let outfit = [];

    // filter/sort by attributes
    let clothes = props.clothingArray;
    if (adjustForWeather) {
      clothes = clothes.filter((item) => {
        return item.weather === props.currentWeather || item.weather === "Any";
      });
    }
    if (!includeDirty) {
      clothes = clothes.filter((item) => {
        return item.currentNumWears < item.maxWears;
      });
    }
    if (preferFav) {
      clothes = clothes.sort((a, b) => b.totalWears - a.totalWears);
    }
    if (exclusions.length > 0) {
      console.log("EXCLUDING: ", exclusions);
      for (let i = 0; i < exclusions.length; i++) {
        clothes = clothes.filter((item) => {
          return item.id !== exclusions[i].id;
        });
      }
      console.log(clothes);
    }

    // THIS IS SO JANK I KNOW IM SORRY THIS WILL BE FIXED LATER BUT DOESNT MATTER FOR NOW

    let top = {};
    let bottom = {};
    let shoe = {};

    if (inclusions.length > 0) {
      console.log("INCLUDING: ", inclusions);
      for (let i = 0; i < inclusions.length; i++) {
        if (inclusions[i].category === "Top") {
          top = inclusions[i];
        }
        if (inclusions[i].category === "Bottom") {
          bottom = inclusions[i];
        }
        if (inclusions[i].category === "Shoes") {
          shoe = inclusions[i];
        }
      }
    }

    if (Object.keys(top).length === 0) {
      top = clothes.filter((item) => {
        return item.category === "Top";
      })[0];
    }

    if (Object.keys(bottom).length === 0) {
      bottom = clothes.filter((item) => {
        return item.category === "Bottom";
      })[0];
    }

    if (Object.keys(shoe).length === 0) {
      shoe = clothes.filter((item) => {
        return item.category === "Shoes";
      })[0];
    }

    setPreviewOutfit([top, bottom, shoe]);
  };

  const handleConfirmOutfit = () => {
    props.setCurrentOutfit({
      top: [previewOutfit[0]],
      bottom: [previewOutfit[1]],
      shoes: [previewOutfit[2]],
    });
    props.addDirtyClothes(previewOutfit);
    setPreviewOutfit([]);
  };

  return (
    <div className={"fullscreen-background " + ((inclusions.length !== 0 || exclusions.length !== 0) && previewOutfit.length !== 0 ? "confirmOutfitHeight" : "")}>
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          fontSize: "2rem",
          margin: "20px",
          fontWeight: "600",
        }}
      >
        Outfit Generator
      </div>
      <div className="clothingViewerContainer generationContainer">
        <h2>Attributes</h2>
        <Form>
          <div className="mb-3">
            <Form.Check
              onClick={() => {
                setAdjustForWeather(!adjustForWeather);
              }}
              type="switch"
              label="Adjust for weather"
            />
            <Form.Check
              onClick={() => {
                setPreferFav(!preferFav);
              }}
              type="switch"
              label="Prefer favorite clothes"
            />
            <Form.Check
              onClick={() => {
                setIncludeDirty(!includeDirty);
              }}
              type="switch"
              label="Include currently dirty clothes"
            />
            <Form.Check
              onClick={() => {
                setPreferColor(!preferColor);
              }}
              type="switch"
              label="Use a prefered color scheme"
            />
            <h2>Style</h2>
            <div className="genSlider">
              <Form.Range
                max={99}
                onChange={(e) => {
                  setCalculatedStyle(Math.floor(e.target.value / 20));
                }}
              />
              <p>{styleSlider[calculatedStyle]}</p>
            </div>
            <h2>Inclusions</h2>
            <div>
              {inclusions.map((item, index) => {
                return (
                  <img className="categoryItem" src={item.image} alt="img" />
                );
              })}
              <PlusCircleFill
                onClick={() => {
                  setDisplayInclude(!displayInclude);
                }}
                size={20}
                style={{ margin: "10px" }}
              />
              {displayInclude ? (
                <ClothingViewer
                  clothingArray={props.clothingArray}
                  addSelectedItems={handleIncludeItem}
                  selectItems={true}
                />
              ) : (
                <></>
              )}
            </div>
            <h2>Exclusions</h2>
            <div>
              {exclusions.map((item, index) => {
                return (
                  <img className="categoryItem" src={item.image} alt="img" />
                );
              })}
              <PlusCircleFill
                onClick={() => {
                  setDisplayExclude(!displayExclude);
                }}
                size={20}
                style={{ margin: "10px" }}
              />
              {displayExclude ? (
                <ClothingViewer
                  clothingArray={props.clothingArray}
                  addSelectedItems={handleExcludeItem}
                  selectItems={true}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </Form>
      </div>
      <div className="confirmBar">
        {previewOutfit.length === 0 ? (
          <Button
            onClick={() => {
              handleGenerate();
            }}
          >
            Generate
          </Button>
        ) : (
          <></>
        )}
        <div className="outfitPreview">
          {previewOutfit.map((item, index) => {
            return (
              <img className="categoryItem" src={item.image} alt={item.title} />
            );
          })}
        </div>
        {previewOutfit.length !== 0 ? (
          <Button className="confirmOutfitButton" onClick={handleConfirmOutfit}>Confirm Outfit</Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GenerationScreen;
