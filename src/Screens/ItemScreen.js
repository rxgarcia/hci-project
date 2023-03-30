import * as React from "react";
import { useParams } from "react-router-dom";
import '../App.css'
import './ItemScreen.css'
import { clothingArray } from "../Data/DummyData";
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
const ItemScreen = () => {
    let params = useParams();
    let item = clothingArray[params.id];
    let itemAttrClass = "w-100";
    return (
        <div className="h-100 fullscreen-background">
            <div>
                <div className="text-white container-background top-margin" style={{padding: "2rem"}}>
                    <div className={itemAttrClass + " d-flex flex-column"}>

                        <div style={{fontSize: "1.75rem", fontWeight: "600"}}>{item['title']}</div>

                        <div className="w-100 d-flex justify-content-center align-items-center" style={{marginBottom: "1rem", marginTop: "1rem"}}>
                            <img className="w-50" style={{borderRadius: "5px"}} src={item['image']} alt={item['description']} />
                        </div>
                        
                        <div style={{fontWeight: 600}}> Description </div>
                        <div>{item.description}</div>

                        <div style={{fontWeight: 600}}> Colors </div>
                        <div>{item.colors}</div>

                        <div style={{fontWeight: 600}}> Size </div>
                        <div>{item.size}</div>

                        <div style={{fontWeight: 600}}> Wears Before Laundry</div>
                        <div>{item.maxWears} - {item.currentNumWears} </div>

                        <div style={{fontWeight: 600}}> Clothing Category</div>
                        <div>{item.category}</div>

                        <div style={{fontWeight: 600}}> Weather Type </div>
                        <div>{item.weather}</div>

                        <div style={{fontWeight: 600}}> Comfort Level</div>
                        <div>{item.comfort}</div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ItemScreen;
