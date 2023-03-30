import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClosetScreen from './Screens/ClosetScreen';
import HomeScreen from './Screens/HomeScreen';
import GenerationScreen from './Screens/GenerationScreen';
import LaundryScreen from './Screens/LaundryScreen';
import ItemScreen from './Screens/ItemScreen';
import NavBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemScreen from './Screens/AddItemScreen';
import clothingArray from './Data/DummyData';
import { useState } from 'react';


function App() {
  let [data, setData] = useState(clothingArray);
  let [currentWeather, setCurrentWeather] = useState("Cold");
  let [currentOutfit, setCurrentOutfit] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeScreen currentOutfit={currentOutfit}/>}/>
          <Route path="/closet" element={<ClosetScreen clothingArray={data}/>}/>
          <Route path="/laundry" element={<LaundryScreen />}/>
          <Route path="/generate" element={<GenerationScreen clothingArray={data} currentWeather={currentWeather} setCurrentOutfit={setCurrentOutfit}/>}/>
          <Route path="/item/:id" element={<ItemScreen clothingArray={data}/>}/>
          <Route path="/add_item" element={<AddItemScreen clothingArray={data} setData={setData}/>}/>
        </Routes>
      </div>
      <NavBar /> 
    </Router>
  );
}

export default App;
