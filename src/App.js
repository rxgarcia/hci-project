import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
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
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";

function App() {
  let [data, setData] = useState();
  let [currentWeather, setCurrentWeather] = useState("Cold");
  let [currentOutfit, setCurrentOutfit] = useState({
    top: [],
    bottom: [],
    shoes: [],
  });
  let [dirtyClothes, setDirtyClothes] = useState([]);
  let [loading, setLoading] = useState(true);
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "fitcheck-64140.firebaseapp.com",
    projectId: "fitcheck-64140",
    storageBucket: "fitcheck-64140.appspot.com",
    messagingSenderId: "977927035828",
    appId: process.env.APP_ID
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    console.log("useEffect returning");
    getDocs(collection(db, "articles")).then((querySnapshot) => {
      let queryData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
      console.log(queryData);
      setData(queryData);
      setLoading(false);
    })
  }, []);

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
                loading={loading}
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
                loading={loading}
              />
            }
          />
          <Route
            path="/laundry"
            element={<LaundryScreen 
            dirtyClothes={dirtyClothes} 
            setDirtyClothes={setDirtyClothes} 
            loading={loading}
            />}
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
            element={<ItemScreen clothingArray={data} loading={loading} />}
          />
          <Route
            path="/add_item"
            element={<AddItemScreen clothingArray={data} setData={setData} db={db} loading={loading}/>}
          />
        </Routes>
      </div>
      <NavBar />
    </Router>
  );
}

export default App;
