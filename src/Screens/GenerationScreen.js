import * as React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, ToastContainer, Toast } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import ClothingModal from "../Components/ClothingModal";
import ClothingViewer from "../Components/ClothingViewer";
import "./ItemScreen.css"

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
  const [showConfirm, setShowConfirm] = useState(false);

  const [displayInclude, setDisplayInclude] = useState(false);
  const [displayExclude, setDisplayExclude] = useState(false);

  const [adjustForWeather, setAdjustForWeather] = useState(false);
  const [preferColor, setPreferColor] = useState(false);
  const [includeDirty, setIncludeDirty] = useState(false);
  const [preferFav, setPreferFav] = useState(false);

  // item array from clothingModal
  const handleIncludeItem = (selectedItems) => {
    selectedItems = selectedItems.filter((item) => {
      return !exclusions.includes(item) && !inclusions.includes(item);
    })
    setInclusions([...inclusions, ...selectedItems]);
    setDisplayInclude(!displayInclude);
  };

  const handleExcludeItem = (selectedItems) => {
    selectedItems = selectedItems.filter((item) => {
      return !exclusions.includes(item) && !inclusions.includes(item);
    })
    setExclusions([...exclusions, ...selectedItems]);
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
    setShowConfirm(true);
    setPreviewOutfit([]);
  };

  return (
    <div
      className={
        "fullscreen-background " +
        ((inclusions.length !== 0 || exclusions.length !== 0) &&
        previewOutfit.length !== 0
          ? "confirmOutfitHeight"
          : "")
      }
    >
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          fontSize: "2rem",
          padding: "20px",
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
                <ClothingModal
                  layer="all"
                  addHelper={handleIncludeItem}
                  filteredClothes={props.clothingArray}
                  currentOutfit={props.currentOutfit}
                  inGenPage={true}
                  addDirtyClothes={props.addDirtyClothes}
                  handleClose={() => {
                    setDisplayInclude(!displayInclude);
                  }}
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
                <ClothingModal
                  layer="all"
                  addHelper={handleExcludeItem}
                  filteredClothes={props.clothingArray}
                  currentOutfit={props.currentOutfit}
                  inGenPage={true}
                  addDirtyClothes={props.addDirtyClothes}
                  handleClose={() => {
                    setDisplayExclude(!displayExclude);
                  }}
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
          <Button className="confirmOutfitButton" onClick={handleConfirmOutfit}>
            Confirm Outfit
          </Button>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer className="pt-3" position="top-center">
      <Toast
          bg="info"
          show={showConfirm}
          onClose={() => {
            setShowConfirm(false);
          }}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Outfit Confirmed</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Your outfit for the day has been confirmed and added to your laundry
            basket.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default GenerationScreen;
