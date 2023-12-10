import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "~/styles/board.css";
import { Square } from "./Square";
import { useState } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const initialArray = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const Board = (props: any) => {
  // const [isTrue, setIsTrue] = useState<boolean>(false);

  const [boardArray, setBoardArray] = useState<number[][]>(initialArray);

  return (
    <div
      style={{
        backgroundColor: "#669D31",
        display: "flex",
        height: 500,
        width: 500,
        flexDirection: "column",
      }}
    >
      {boardArray.map((yElem, index) => (
        <div
          key={`arr-board-${index}`}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "12.5%",
          }}
        >
          {yElem.map((xElem) => (
            <Square />
          ))}
        </div>
      ))}
      {/* <Square></Square>
      <Square></Square> */}
    </div>
  );
};
