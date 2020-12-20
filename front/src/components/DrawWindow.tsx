import React, { useState, useEffect } from "react";
import headshot from "../resources/outdoor_headshot.jpg";
import Box from "./Box";
import { ImageMesh } from "./ImageMesh";

const DrawWindow = () => {
  const [imageData, setImageData] = useState<ImageData>();
  useEffect(() => {
    const img = new Image();
    img.src = headshot;
    let te = document.createElement("canvas");
    let tctx = te.getContext("2d");
    tctx?.drawImage(img, 0, 0);
    setImageData(tctx?.getImageData(0, 0, te.width, te.height));
  }, []);

  return (
    <div>
      <ImageMesh imageData={imageData}/>
    </div>
  );
};

export default DrawWindow;
