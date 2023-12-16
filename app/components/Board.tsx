import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "~/styles/board.css";
import { Square } from "./Square";
import { useEffect, useState } from "react";
import { OthelloEngine } from "~/engine/OthelloEngine";
import { TokenStatesEnum } from "~/types";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const Board = (props: any) => {
  // const [isTrue, setIsTrue] = useState<boolean>(false);

  const [boardArray, setBoardArray] = useState<number[][]>(OthelloEngine.initializeBoardArray());

  useEffect(() => {
    let initialArray = OthelloEngine.initializeBoardArray();

    initialArray = OthelloEngine.searchAvailableForPiece(initialArray, TokenStatesEnum.BLACK);

    setBoardArray(initialArray);
  }, []);

  const handleSquareClick = (indexY: number, indexX: number, value: TokenStatesEnum) => {
    console.log({ indexY, indexX, value });
  };

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
      {boardArray.map((yElem, indexY) => (
        <div
          key={`arr-board-${indexY}`}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "12.5%",
          }}
        >
          {yElem.map((xElem, indexX) => (
            <Square key={`sub-elem${indexX}`} tokenState={boardArray[indexY][indexX]} {...{ indexX, indexY, handleSquareClick }} />
          ))}
        </div>
      ))}
    </div>
  );
};
