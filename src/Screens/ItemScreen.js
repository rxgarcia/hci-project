import * as React from "react";
import { useParams } from "react-router-dom";

const ItemScreen = () => {
  const { id } = useParams();
  console.log(id);

  return <div>
    <h1>Item Screen</h1>
    <h2>Item #{id}</h2>
  </div>;
};

export default ItemScreen;
