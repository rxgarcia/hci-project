import * as React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import ClothingViewer from "../Components/ClothingViewer";

const GenerationScreen = (props) => {
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [styleLevel, setStyleLevel] = useState(50);
  const [previewOutfit, setPreviewOutfit] = useState([]);

  const [displayInclude, setDisplayInclude] = useState(false);
  const [displayExclude, setDisplayExclude] = useState(false);

  const [adjustForWeather, setAdjustForWeather] = useState(false);
  const [preferColor, setPreferColor] = useState(false);
  const [includeDirty, setIncludeDirty] = useState(false);
  const [preferFav, setPreferFav] = useState(false);

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
    console.log(Math.ceil(styleLevel / 20));

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
        clothes = clothes.filter((item) => { return item.id !== exclusions[i].id});
      }
      console.log(clothes)
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
    props.setCurrentOutfit({top: [previewOutfit[0]], bottom: [previewOutfit[1]], shoes: [previewOutfit[2]]});
    props.addDirtyClothes(previewOutfit);
    setPreviewOutfit([]);
  };

  return (
    <div className="genScreen">
      <h1>Generation Screen</h1>
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
              <p>Comfortable</p>
              <Form.Range
                onChange={(e) => {
                  setStyleLevel(e.target.value);
                }}
              />
              <p>Formal</p>
            </div>
            <h2>Inclusions</h2>
            <div>
              {inclusions.map((item, index) => {
                return (
                  <img className="categoryItem" src={item.image} alt="img" />
                );
              })}
              <Button
                onClick={() => {
                  setDisplayInclude(!displayInclude);
                }}
              >
                Add
              </Button>
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
              <Button
                onClick={() => {
                  setDisplayExclude(!displayExclude);
                }}
              >
                Add
              </Button>
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
            <Button
              onClick={() => {
                handleGenerate();
              }}
            >
              Generate
            </Button>
          </div>
          {console.log(previewOutfit)}
          {previewOutfit.map((item, index) => {
            return (
              <img className="categoryItem" src={item.image} alt={item.title} />
            );
          })}
          {previewOutfit.length !== 0 ? (
            <Button onClick={handleConfirmOutfit}>Confirm Outfit</Button>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </div>
  );
};

export default GenerationScreen;
