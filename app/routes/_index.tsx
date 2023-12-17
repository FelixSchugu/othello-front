import type { MetaFunction } from "@remix-run/node";
import { Board } from "~/components/Board";
import { LinksFunction } from "@remix-run/node";
import mainStyles from "../styles/main.css";
import { TokenStatesEnum } from "~/types";
import { useState } from "react";
import { Token } from "~/components/Token";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: mainStyles }];

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  const [tokenTurn, setTokenTurn] = useState<TokenStatesEnum>(TokenStatesEnum.BLACK);

  const handleTurnChange = (piece: TokenStatesEnum) => {
    setTokenTurn(piece);
  };

  return (
    <div className="main-component">
      <div
        style={{
          height: "100px",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ color: "#669D31" }}>Turno: </h3>

        <div
          style={{
            height: "70px",
            width: "70px",
            margin: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Token tokenState={tokenTurn} />
        </div>
      </div>
      <Board onTurnChange={handleTurnChange} />
    </div>
  );
}
