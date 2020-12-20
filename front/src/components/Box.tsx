import React, { useRef, useState } from 'react'
import { MeshProps, useFrame } from 'react-three-fiber'
import { Mesh } from 'three'

function Box(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [direction, setDirection] = useState(true)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if (mesh.current) {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //     if (mesh.current.position.x >= 5.0) {
  //       setDirection(false);
  //     }
  //     if (mesh.current.position.x <= -5.0) {
  //       setDirection(true);
  //     }
  //     if (direction === true) {
  //       mesh.current.position.x += 0.01;
  //     } else {
  //       mesh.current.position.x -= 0.01;
  //     }

  //   }
  // })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => {
        // setActive(!active)
        setDirection(!direction)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'gray' : 'white'} />
    </mesh>
  )
}

export default Box;
