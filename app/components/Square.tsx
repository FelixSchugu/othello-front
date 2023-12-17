import type { PropsWithChildren } from "react";
import { TokenStatesEnum } from "~/types";
import { Token } from "./Token";

export const Square = (
  props: PropsWithChildren<{
    tokenState: number;
    handleSquareClick: (indexY: number, indexX: number, value: TokenStatesEnum) => void;
    indexY: number;
    indexX: number;
  }>
) => {
  const handleSquareClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.handleSquareClick(props.indexY, props.indexX, props.tokenState);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid lightgray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(props.tokenState === TokenStatesEnum.AVAILABLE_POSITION && { cursor: "pointer" }),
      }}
      {...(props.tokenState === TokenStatesEnum.AVAILABLE_POSITION && { onClick: handleSquareClick })}
    >
      {props?.tokenState !== TokenStatesEnum.EMPTY && <Token tokenState={props.tokenState} />}
    </div>
  );
};
