import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { layers } from "../Data/DummyData";
import "../App.css";
import "./HomeScreen.css";
import {
  Star,
  StarFill,
  PlusCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import clothingArray from "../Data/DummyData";
import ClothingViewer from "../Components/ClothingViewer";

const HomeScreen = (props) => {
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

  let nav = useNavigate();

  const [temp, setTemp] = useState(-1);
  const [weather, setWeather] = useState("Loading...");
  const [clothingViewer, setClothingViewer] = useState(false);

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
    let tops = clothingArray.filter((e) => e["category"] == "Top");
    let bottoms = clothingArray.filter((e) => e["category"] == "Bottom");
    let shoes = clothingArray.filter((e) => e["category"] == "Shoes");
    const top = tops[Math.floor(Math.random() * tops.length)];
    const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const shoe = shoes[Math.floor(Math.random() * shoes.length)];
    const outfit = {
      top: [top],
      bottom: [bottom],
      shoes: [shoe],
    };
    props.setCurrent(outfit);
    props.addDirtyClothes([top, bottom, shoe]);
  }

  useEffect(() => {
    fetchWeather();
  });

  return (
    <div className="h-100 fullscreen-background">
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
        {layers.map((layer, index) => {
          return (
            <Row className="layer" key={index}>
              {props.currentOutfit[layer].map((item, index) => {
                return (
                  <Col className="my-auto" xs="5">
                    <div className="centerer">
                      <img
                        className="categoryItem"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <XCircleFill
                      className="remove"
                      onClick={() => {
                        props.removeHelper(item);
                      }}
                    />
                  </Col>
                );
              })}
              <Col className="my-auto" xs={1}>
                <PlusCircleFill
                  className="addbutton"
                  size={20}
                  onClick={() => {
                    setClothingViewer(!clothingViewer);
                  }}
                ></PlusCircleFill>
              </Col>
              {clothingViewer ? <ClothingViewer clothingArray={props.clothingArray}/> : <></>}
            </Row>
          );
        })}
      </div>
      <div className="text-center">
        <Button
          className="randombutton"
          onClick={() => {
            randomize();
          }}
        >
          Randomize
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
