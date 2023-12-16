import { TokenStatesEnum } from "~/types";
import type { TokenPiecesTypes } from "~/types";

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

  static searchAvailableForPiece(boardArr: number[][], currentPiece: TokenPiecesTypes) {
    const tempArr = [...boardArr];

    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr[i].length; j++) {
        if (tempArr[i][j] == TokenStatesEnum.EMPTY) {
          //
          const isAvailable =
            this.searchAvailableTopDiagonal(boardArr, i + 1, j + 1, currentPiece) ||
            this.searchAvailableTop(boardArr, i + 1, j, currentPiece) ||
            this.searchAvailableLeft(boardArr, i, j + 1, currentPiece) ||
            this.searchAvailableRight(boardArr, i, j - 1, currentPiece) ||
            this.searchAvailableBottom(boardArr, i - 1, j, currentPiece);

          if (isAvailable) {
            tempArr[i][j] = TokenStatesEnum.AVAILABLE_POSITION;
          }
        }
      }
    }
    return tempArr;
  }

  static searchAvailableTopDiagonal(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(boardArr, startY, startX, pieceToFind)) {
      return false;
    }

    let y = startY + 1;
    let x = startX + 1;
    while (y < boardArr.length && x < boardArr.length) {
      if (boardArr[y][x] === TokenStatesEnum.EMPTY) {
        return false;
      }

      if (boardArr[y][x] === pieceToFind) {
        return true;
      }
      x++;
      y++;
    }

    return false;
  }

  static searchAvailableLeft(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(boardArr, startY, startX, pieceToFind)) {
      return false;
    }

    let x = startX + 1;
    while (x < boardArr.length) {
      if (boardArr[startY][x] === TokenStatesEnum.EMPTY) {
        return false;
      }

      if (boardArr[startY][x] == pieceToFind) {
        return true;
      }
      x++;
    }

    return false;
  }

  static searchAvailableRight(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes) {
    if (this.isNextPositionNotAvailable(boardArr, startY, startX, pieceToFind)) return false;

    let x = startX - 1;
    while (x >= 0) {
      if (boardArr[startY][x] === TokenStatesEnum.EMPTY) return false;
      if (boardArr[startY][x] === pieceToFind) return true;

      x--;
    }

    return false;
  }

  static searchAvailableTop(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(boardArr, startY, startX, pieceToFind)) {
      return false;
    }

    let y = startY + 1;
    while (y < boardArr.length) {
      if (boardArr[y][startX] === TokenStatesEnum.EMPTY) {
        return false;
      }

      if (boardArr[y][startX] == pieceToFind) {
        return true;
      }
      y++;
    }

    return false;
  }

  static searchAvailableBottom(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(boardArr, startY, startX, pieceToFind)) return false;

    let y = startY - 1;
    while (y >= 0) {
      if (boardArr[y][startX] === TokenStatesEnum.EMPTY) {
        return false;
      }

      if (boardArr[y][startX] == pieceToFind) {
        return true;
      }

      y--;
    }

    return false;
  }

  static isNextPositionNotAvailable(boardArr: number[][], startY: number, startX: number, pieceToFind: TokenPiecesTypes) {
    return (
      startY >= boardArr.length ||
      startY < 0 ||
      startX >= boardArr.length ||
      startX < 0 ||
      boardArr[startY][startX] == pieceToFind ||
      boardArr[startY][startX] == TokenStatesEnum.EMPTY ||
      boardArr[startY][startX] == TokenStatesEnum.AVAILABLE_POSITION
    );
  }
}
