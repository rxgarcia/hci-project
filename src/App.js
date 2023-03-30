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


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/closet" element={<ClosetScreen />}/>
          <Route path="/laundry" element={<LaundryScreen />}/>
          <Route path="/generate" element={<GenerationScreen />}/>
          <Route path="/item/:id" element={<ItemScreen />}/>
          <Route path="/add_item" element={<AddItemScreen />}/>
        </Routes>
      </div>
      <NavBar /> 
    </Router>
  );
}

export default App;
