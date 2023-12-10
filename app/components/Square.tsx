import { TokenStatesEnum } from "~/types";

export const Square = (props: any) => {
  const handleSquareClick = (event: any) => {};

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
    >
      {props.tokenState && (
        <div
          style={{
            height: "70%",
            width: "70%",
            backgroundColor:
              props.tokenStateState === TokenStatesEnum.WHITE
                ? "lightgray"
                : props.tokenStateState === TokenStatesEnum.BLACK
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
