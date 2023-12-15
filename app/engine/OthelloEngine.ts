import { TokenStatesEnum } from "~/types";

export class OthelloEngine {
  static initializeBoardArray() {
    const initialArray = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, TokenStatesEnum.WHITE, TokenStatesEnum.BLACK, 0, 0, 0],
      [0, 0, 0, TokenStatesEnum.BLACK, TokenStatesEnum.WHITE, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    return initialArray;
  }

  static colorizeTokens() {}
}
