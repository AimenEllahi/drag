import React, { useState } from "react";
import { modelList } from "../constants/index";

const Selector = ({ selectedModel, setSelectedModel, setIsAddObjectMode }) => {
  const handleMouseDown = (model) => {
    setSelectedModel(model);
    setIsAddObjectMode(true);
  };

  return (
    <div className='absolute bottom-0 w-screen h-[20vh]'>
      <div
        className='w-full h-full items-center'
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {modelList.map((model, index) => (
          <div
            key={index}
            onMouseDown={() => handleMouseDown(model)}
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
