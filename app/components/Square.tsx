import { MouseEventHandler, PropsWithChildren, ReactPropTypes } from "react";
import { TokenStatesEnum } from "~/types";

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
        cursor: "pointer",
      }}
      onClick={handleSquareClick}
    >
      {props?.tokenState !== TokenStatesEnum.EMPTY && (
        <div
          style={{
            height: "70%",
            width: "70%",
            backgroundColor:
              props.tokenState === TokenStatesEnum.WHITE
                ? "lightgray"
                : props.tokenState === TokenStatesEnum.BLACK
                ? "#333333"
                : "",
            borderRadius: "50%",
            border: "1px solid black",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        ></div>
      )}
    </div>
  );
};
