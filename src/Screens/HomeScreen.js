import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Button, Toast, ToastContainer, OverlayTrigger, Tooltip } from "react-bootstrap";
import { layers } from "../Data/DummyData";
import "../App.css";
import "./HomeScreen.css";
import { PlusCircleFill, XCircleFill, SquareFill, TrashFill } from "react-bootstrap-icons";
import ClothingModal from "../Components/ClothingModal";

const HomeScreen = (props) => {
  const [temp, setTemp] = useState(-1);
  const [weather, setWeather] = useState("Loading...");
  const [modalLayer, setLayer] = useState("tops");
  const [showModal, setShow] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showRandom, setRandom] = useState(false);
  const [showClear, setClear] = useState(false);
  const [showError, setError] = useState(false);

  const weatherCodes = {
    0: "Clear Skies",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Moderate Thunderstorms",
  };
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&hourly=temperature_2m,weathercode&current_weather=true&temperature_unit=fahrenheit&forecast_days=1&timezone=auto`
      );
      const json = await response.json();
      const temp1 = Math.round(json.current_weather.temperature);
      const weather1 = weatherCodes[json.current_weather.weathercode];
      setTemp(temp1);
      setWeather(weather1);
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  function randomize() {
    let clothingArray = props.clothingArray;

    let tops = clothingArray.filter((e) => e["category"] === "Top");
    let bottoms = clothingArray.filter((e) => e["category"] === "Bottom");
    let shoes = clothingArray.filter((e) => e["category"] === "Shoes");
    const top = tops[Math.floor(Math.random() * tops.length)];
    const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const shoe = shoes[Math.floor(Math.random() * shoes.length)];
    const outfit = {
      top: [top],
      bottom: [bottom],
      shoes: [shoe],
    };
    props.setCurrent(outfit);
  }
  useEffect(() => {
    fetchWeather();
  });

  const Article = (props) => {
    return (
      <div>
        <img
          className="homeItem"
          src={props.item.image}
          alt={props.item.title}
        />
        <XCircleFill
          size={20}
          className="remove"
          onClick={() => {
            props.removeHelper(props.item);
          }}
        />
        <SquareFill size={12} className="homefiller" />
      </div>
    );
  };

  return (
    <div className="h-100 fullscreen-background ">
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          marginTop: "1vh",
          marginLeft: "10vw",
          marginRight: "10vw",
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Welcome User!
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          marginTop: "-1vh",
          marginLeft: "10vw",
          marginRight: "10vw",
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        {weather} ({temp}°F)
      </div>
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          marginTop: "1vh",
          marginLeft: "10vw",
          marginRight: "10vw",
          marginBottom: "1vh",
          fontSize: "1.5rem",
          fontWeight: "400",
        }}
      >
        Your Daily Outfit
      </div>

      <div
        className="text-white container-background"
        style={{ padding: "2rem" }}
      >
        {/* <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="trash-tooltip">
            Clear current selection.
            </Tooltip>}>
           */}
          <TrashFill size={30} className="trash" onClick={() => {
          const clear = {
            top: [],
            bottom: [],
            shoes: [],
          }
          props.setCurrent(clear)
          setClear(true)
        }} />
        {/* </OverlayTrigger> */}
        
        {layers.map((layer, index) => {
          return (
            <Row className="layer" key={index}>
              {props.currentOutfit[layer].map((item, index) => {
                return (
                  <Col className="d-flex" xs="5">
                    <div className="articlecontainer">
                      <Article item={item} removeHelper={props.removeHelper} />
                    </div>
                  </Col>
                );
              })}
              <Col className="my-auto" xs={1}>
                <PlusCircleFill
                  className="addbutton"
                  size={20}
                  onClick={() => {
                    let cat = layer;
                    setLayer(cat);
                    handleShow();
                  }}
                ></PlusCircleFill>
              </Col>
            </Row>
          );
        })}
      </div>

      {showModal ? (
        <ClothingModal
          layer={modalLayer}
          currentOutfit={props.currentOutfit}
          addHelper={props.addHelper}
          filteredClothes={props.clothingArray}
          addDirtyClothes={props.addDirtyClothes}
          handleClose={() => {
            handleClose();
          }}
        />
      ) : null}

      <div className="text-center">
      {/* <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="trash-tooltip">
            Clear current selection.
            </Tooltip>}>
           */}
        <Button
          className="randombutton m-3 mt-4"
          onClick={() => {
            randomize();
            setRandom(true);
          }}
        >
          Randomize
        </Button>
        {/* </OverlayTrigger> */}
        <Button
          className="confirmbutton m-3 mt-4"
          onClick={() => {
            let chosenOutfit = props.currentOutfit.top;
            chosenOutfit = chosenOutfit.concat(props.currentOutfit.bottom);
            chosenOutfit = chosenOutfit.concat(props.currentOutfit.shoes);
            props.addDirtyClothes(chosenOutfit);
            if(chosenOutfit.length === 0) {
              setError(true)
            } else {
              setConfirm(true);
            }
          }}
        >
          Confirm
        </Button>
      </div>
      <ToastContainer className="pt-3" position="top-center">
        <Toast
          bg="info"
          show={showConfirm}
          onClose={() => {
            setConfirm(false);
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
        <Toast
          bg="secondary"
          show={showRandom}
          onClose={() => setRandom(false)}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Outfit Randomized</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Your outfit for the day has been randomized and is shown below.
          </Toast.Body>
        </Toast>
        <Toast
          bg="light"
          show={showClear}
          onClose={() => setClear(false)}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Outfit Cleared</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Cleared current outfit. Note this does not remove confirmed outfits from laundry basket.
          </Toast.Body>
        </Toast>
        <Toast
          bg="danger"
          show={showError}
          onClose={() => setError(false)}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Outfit Error</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Error confirming outfit. Please make sure at least one article of
            clothing is selected.
          </Toast.Body>
        </Toast>
        {/* <Toast
          bg="info"
          show={showAdded}
          onClose={() => {
            setAdded(false);
          }}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Clothes Added</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Successfully added {addedCount.length} {layerLabel} to outfit.
          </Toast.Body>
        </Toast>
        <Toast
          bg="warning"
          show={showWarning}
          onClose={() => setWarning(false)}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="m-auto toastheader">Outfit Randomized</strong>
          </Toast.Header>
          <Toast.Body className="toastbody">
            Your outfit for the day has been randomized and is shown below.
          </Toast.Body>
        </Toast> */}
        
      </ToastContainer>
    </div>
  );
};

export default HomeScreen;
