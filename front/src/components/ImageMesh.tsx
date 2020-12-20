import React, { useEffect, useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "react-three-fiber";
import { Mesh } from "three";
import Box from "./Box";

const norm = (
  val: number,
  minVal: number,
  maxVal: number,
  newMin: number,
  newMax: number
) => {
  return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
};

type ImageMeshProps = {
  meshProps?: MeshProps;
  imageData?: ImageData;
};

export const ImageMesh = (props: ImageMeshProps) => {
  const mesh = useRef<Mesh>();
  const [boxes, addBox] = useState<Array<JSX.Element>>([]);
  useEffect(() => {
    if (props.imageData) {
      const imgWidth = props.imageData.width;
      const imgHeight = props.imageData.height;
      const imgAspectRatio = imgWidth / imgHeight;

      const scrWidth = window.innerWidth;
      const scrHeight = window.innerHeight;
      const scrAspectRatio = scrWidth / scrHeight;

      const widthMod = (3 * imgAspectRatio) / scrAspectRatio;
      const xPadding = (2 - widthMod) / 2;
      const xInc = widthMod / imgWidth;
      const yInc = 2 / imgHeight;
      const xStart = -1.0 + xPadding;
      const yStart = 1.0;
      let col = 0;
      let row = 0;
      for (let i = 0; i < props.imageData.data.length; i += 4) {
        // create a point object with color data[i + 0], data[i + 1], data[i + 2], data[i + 3]
        // and location

        let x = xStart + col * xInc;
        let y = yStart - row * yInc;
        let z = norm(props.imageData.data[i + 3], 0, 255, -1, 1);
        let thisBox = <Box key={i} position={[x, y, z]}></Box>;
        addBox([...boxes, thisBox]);
      }
    }
  }, [props.imageData, boxes]);

  return (
    <Canvas style={{ minHeight: "90vh" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
    </Canvas>
  );
};
