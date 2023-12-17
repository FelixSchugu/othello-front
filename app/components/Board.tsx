import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "~/styles/board.css";
import { Square } from "./Square";
import { PropsWithChildren, useEffect, useState } from "react";
import { TokenStatesEnum } from "~/types";
import othelloEngineSingleton from "~/engine/OthelloEngineSingleton";
import type { TokenPiecesTypes } from "~/types";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const Board = (props: PropsWithChildren<{ onTurnChange: (pieceColor: TokenStatesEnum) => void }>) => {
  // const [isTrue, setIsTrue] = useState<boolean>(false);

  const [boardArray, setBoardArray] = useState<number[][]>(othelloEngineSingleton.getArray());
  const [turnPiece, setTurnPiece] = useState<TokenPiecesTypes>(TokenStatesEnum.BLACK);

  // useEffect(() => {
  //   othelloEngineSingleton.searchAvailableForPiece(turnPiece);

  //   setBoardArray(othelloEngineSingleton.getArray());
  // }, []);

  useEffect(() => {
    othelloEngineSingleton.searchAvailableForPiece(turnPiece);

    setBoardArray(othelloEngineSingleton.getArray());
  }, [turnPiece]);

  const handleSquareClick = (indexY: number, indexX: number, value: TokenStatesEnum) => {
    console.log({ indexY, indexX, value });

    othelloEngineSingleton.handlePlayerTurn(indexY, indexX, turnPiece);
    setBoardArray(othelloEngineSingleton.getArray());

    if (turnPiece === TokenStatesEnum.BLACK) {
      setTurnPiece(TokenStatesEnum.WHITE);
      props.onTurnChange(TokenStatesEnum.WHITE);
    } else {
      setTurnPiece(TokenStatesEnum.BLACK);
      props.onTurnChange(TokenStatesEnum.BLACK);
    }
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
