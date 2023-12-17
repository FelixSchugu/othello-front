import { PropsWithChildren } from "react";
import { TokenStatesEnum } from "~/types";

export const Token = (props: PropsWithChildren<{ tokenState: TokenStatesEnum }>) => {
  return (
    <div
      style={{
        height: "70%",
        width: "70%",
        backgroundColor:
          props.tokenState === TokenStatesEnum.WHITE
            ? "lightgray"
            : props.tokenState === TokenStatesEnum.BLACK
            ? "#333333"
            : props.tokenState === TokenStatesEnum.AVAILABLE_POSITION
            ? ""
            : "",
        borderRadius: "50%",
        border: "1px solid black",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    ></div>
  );
};
