import React, { useState } from "react";
import * as THREE from "three";

const modelList = [
  {
    name: "Model 1",
    color: "#B2C8BA",
    dimensions: [1, 2, 2],
    position: [0, 0, 0],
  },
  {
    name: "Model 2",
    color: "green",
    dimensions: [2, 2, 1],
    position: [2, 0, 0],
  },
  {
    name: "Model 3",
    color: "#B2C000",
    dimensions: [2, 1, 3],
    position: [-4, 0, 0],
  },
];

const Selector = ({ onModelSelected }) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleModelClick = (model) => {
    setSelectedModel(model);
    onModelSelected(model);
  };

  return (
    <div className="absolute bottom-0 w-screen h-[35vh]">
      <div
        className="w-full h-full items-center"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {modelList.map((model, index) => (
          <div
            key={index}
            onClick={() => handleModelClick(model)}
            style={{
              width: `${model.dimensions[0] * 50}px`,
              height: `${model.dimensions[1] * 50}px`,
              backgroundColor: model.color,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Selector;
