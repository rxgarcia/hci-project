import { useState } from "react";
import '../App.css'
import './ItemScreen.css'
import { clothingArray } from "../Data/DummyData";
import { Link, redirect, useNavigate } from "react-router-dom";

const AddItemScreen = ({clothingArray, setData}) => {
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
  let [name, setName] = useState("");
  let [description, setDesc] = useState("");
  let [colors, setColors] = useState("");
  let [size, setSize] = useState("S");
  let [wears, setWears] = useState("");
  let [category, setCategory] = useState("Top");
  let [comfort, setComfort] = useState("Casual");
  let [weather, setWeather] = useState("Cold");
  let [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  function onSubmit() {
    console.log(clothingArray[clothingArray.length - 1].id);
    let colorArray = colors.split(',');
    colorArray.forEach((value, idx) => colorArray[idx] = value.trim());
    let newArrayObj = {
        id: clothingArray[clothingArray.length - 1]['id'] + 1,
        title: name,
        description: description,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
        colors: colorArray,
        size: size,
        currentNumWears: 0,
        maxWears: wears,
        category: category,
        weather: weather,
        comfort: comfortLevels[comfort],
    }
    setData([...clothingArray, newArrayObj]);
    console.log(clothingArray);
  }
  let comfortLevels = {
    "Casual": 1,
    "Business Casual": 2,
    "Business": 3,
    "Formal": 4,
  }
  return (
    <div className="h-100 fullscreen-background">
        <div>
            <div className="d-flex justify-content-center align-items-center text-white" 
                style={{ marginTop: "1vh",marginLeft: "10vw", marginRight: "10vw", "fontSize": "2rem"}}>
                Add Item
            </div>
            
            <div className="text-white container-background" style={{padding: "2rem"}}>
                <input type="file" className="d-flex justify-content-center align-items-center clickable w-100" 
                                    style={{backgroundColor: "grey", borderRadius: "5px", padding: "5rem", 
                                     backgroundImage: `url(${image})`, backgroundSize: "cover", color: "transparent" }}
                                    onChange={onImageChange} />
                
                <div style={{fontWeight: 600}}> Name </div>
                <input type="text" onChange={(e) => setName(e.target.value) } />

                <div style={{fontWeight: 600}}> Description </div>
                <input type="text" onChange={(e) => setDesc(e.target.value) } />

                <div style={{fontWeight: 600}}> Colors </div>
                <input type="text" placeholder="Comma separated list." onChange={(e) => setColors(e.target.value) } />

                <div style={{fontWeight: 600}}> Size </div>
                <select name="Size" onChange={(e) => setSize(e.target.value) }>
                    <option value="S"> Small </option>
                    <option value="M"> Medium</option>
                    <option value="L"> Large </option>
                    <option value="XL"> Extra Large</option>
                </select>

                <div style={{fontWeight: 600}}> Max Wears</div>
                <input type="text" onChange={(e) => setWears(e.target.value) } />

                <div style={{fontWeight: 600}}> Clothing Category</div>
                <select name="Category" onChange={(e) => setCategory(e.target.value) }>
                    <option value="Top"> Top </option>
                    <option value="Bottom"> Bottom </option>
                    <option value="Shoes"> Shoes </option>
                </select>

                <div style={{fontWeight: 600}}> Weather Type </div>
                <select name="Weather" onChange={(e) => setWeather(e.target.value) }>
                    <option value="Cold"> Cold </option>
                    <option value="Warm"> Warm </option>
                    <option value="Any"> Any </option>
                </select>

                <div style={{fontWeight: 600}}> Comfort Level</div>
                <select name="Comfort" onChange={(e) => setComfort(e.target.value) }>
                    <option value="Casual"> Casual </option>
                    <option value="Business Casual"> Business Casual </option>
                    <option value="Business"> Business </option>
                    <option value="Formal"> Formal </option>
                </select>
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <Link to="/closet">
                        <button style={{marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}} onClick={onSubmit} href='/closet'> Add </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddItemScreen