import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";
import "./ItemScreen.css";
// {
//     title: "Patagonia Synchilla White Fleece",
//     description: "Patagonia Synchilla White Fleece with blue trim.",
//     colors: ["White"],
//     size: "M",
//     image:
//       "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf9103334/images/hi-res/25450_OAT.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f5f5f5",
//     currentNumWears: 0,
//     maxWears: 3,
//     category: "Top",
//     weather: "Cold",
//     comfort: 1,
//   },
const ItemScreen = ({ clothingArray }) => {
  let params = useParams();
  let nav = useNavigate();
  console.log(clothingArray);
  // Double equal since types are different.
  let item = clothingArray.find((e) => e["id"] == params.id);
  let itemAttrClass = "w-100";

  return (
    <div className="fullscreen-background">
      <div className="closetHeader itemHeader">
        <Button
          onClick={() => {
            nav(-1);
          }}
        >
          Back
        </Button>
      </div>
      <div
        className="text-white container-background"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <div className={itemAttrClass + " d-flex flex-column"}>
          <div style={{ fontSize: "1.75rem", fontWeight: "600" }}>
            {item["title"]}
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <img
              className="w-50"
              style={{ borderRadius: "5px" }}
              src={item["image"]}
              alt={item["description"]}
            />
          </div>

          <div style={{ fontWeight: 600 }}> Description </div>
          <div>{item.description}</div>

          <div style={{ fontWeight: 600 }}> Colors </div>
          <div>{item.colors}</div>

          <div style={{ fontWeight: 600 }}> Size </div>
          <div>{item.size}</div>

          <div style={{ fontWeight: 600 }}> Wears Before Laundry</div>
          <div>
            {item.maxWears} - {item.currentNumWears}{" "}
          </div>

          <div style={{ fontWeight: 600 }}> Clothing Category</div>
          <div>{item.category}</div>

          <div style={{ fontWeight: 600 }}> Weather Type </div>
          <div>{item.weather}</div>

          <div style={{ fontWeight: 600 }}> Comfort Level</div>
          <div>{item.comfort}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemScreen;
