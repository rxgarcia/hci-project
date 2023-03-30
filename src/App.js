import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ClosetScreen from "./Screens/ClosetScreen";
import HomeScreen from "./Screens/HomeScreen";
import GenerationScreen from "./Screens/GenerationScreen";
import LaundryScreen from "./Screens/LaundryScreen";
import ItemScreen from "./Screens/ItemScreen";
import NavBar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItemScreen from "./Screens/AddItemScreen";
import clothingArray from "./Data/DummyData";
import { useState } from "react";

function App() {
  let [data, setData] = useState(clothingArray);
  let [currentWeather, setCurrentWeather] = useState("Cold");
  let [currentOutfit, setCurrentOutfit] = useState({
    top: [],
    bottom: [],
    shoes: [],
  });
  let [dirtyClothes, setDirtyClothes] = useState([]);

  const handleAddDirtyClothes = (items) => {
    setDirtyClothes(dirtyClothes.concat(items));
  };

  const handleRemoveCurrentCloth = (item) => {
    const cat = item.category.toLowerCase();
    const id = item.id;
    const layer = currentOutfit[cat];
    let item1 = layer.find((e) => e["id"] == id);
    console.log(item1);
    const index = layer.indexOf(item);
    console.log(index);
    if (index > -1) {
      layer.splice(index, 1);
    }
    let updated = { ...currentOutfit };
    updated[cat] = layer;
    console.log(updated);
    setCurrentOutfit(updated);
  };

  const handleAddToCurrent = (item) => {
    const cat = item.category.toLowerCase();
    let layer = currentOutfit[cat];
    layer = layer.concat(item);
    console.log(layer);
    let updated = { ...currentOutfit };
    updated[cat] = layer;
    console.log(updated);
    setCurrentOutfit(updated);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                currentOutfit={currentOutfit}
                setCurrent={setCurrentOutfit}
                addDirtyClothes={handleAddDirtyClothes}
                removeHelper={handleRemoveCurrentCloth}
              />
            }
          />
          <Route
            path="/closet"
            element={
              <ClosetScreen
                clothingArray={data}
                addHelper={handleAddToCurrent}
                addDirtyClothes={handleAddDirtyClothes}
              />
            }
          />
          <Route
            path="/laundry"
            element={<LaundryScreen dirtyClothes={dirtyClothes} />}
          />
          <Route
            path="/generate"
            element={
              <GenerationScreen
                clothingArray={data}
                currentWeather={currentWeather}
                setCurrentOutfit={setCurrentOutfit}
                addDirtyClothes={handleAddDirtyClothes}
              />
            }
          />
          <Route
            path="/item/:id"
            element={<ItemScreen clothingArray={data} />}
          />
          <Route
            path="/add_item"
            element={<AddItemScreen clothingArray={data} setData={setData} />}
          />
        </Routes>
      </div>
      <NavBar />
    </Router>
  );
}

export default App;
