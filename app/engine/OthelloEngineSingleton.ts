import { TokenPiecesTypes, TokenStatesEnum } from "~/types";

class OthelloEngineSingleton {
  private static _instance: OthelloEngineSingleton;
  private boardArr: number[][];

  private constructor() {
    this.boardArr = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, TokenStatesEnum.WHITE, TokenStatesEnum.BLACK, 0, 0, 0],
      [0, 0, 0, TokenStatesEnum.BLACK, TokenStatesEnum.WHITE, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public searchAvailableForPiece(currentPiece: TokenPiecesTypes) {
    this.cleanOldAvailablePositions();
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] == TokenStatesEnum.EMPTY) {
          const isAvailable =
            this.searchAvailableTopDiagonal(i + 1, j + 1, currentPiece) ||
            this.searchAvailableTop(i + 1, j, currentPiece) ||
            this.searchAvailableLeft(i, j + 1, currentPiece) ||
            this.searchAvailableRight(i, j - 1, currentPiece) ||
            this.searchAvailableBottom(i - 1, j, currentPiece);

          if (isAvailable) {
            this.boardArr[i][j] = TokenStatesEnum.AVAILABLE_POSITION;
          }
        }
      }
    }
  }

  public getArray() {
    return [...this.boardArr];
  }

  private cleanOldAvailablePositions() {
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] === TokenStatesEnum.AVAILABLE_POSITION) {
          this.boardArr[i][j] = TokenStatesEnum.EMPTY;
        }
      }
    }
  }

  private searchAvailableTopDiagonal(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY + 1;
    let x = startX + 1;
    while (y < this.boardArr.length && x < this.boardArr.length) {
      if (this.boardArr[y][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][x] === pieceToFind) return true;

      x++;
      y++;
    }

    return false;
  }

  private searchAvailableLeft(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let x = startX + 1;
    while (x < this.boardArr.length) {
      if (this.boardArr[startY][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[startY][x] == pieceToFind) return true;

      x++;
    }

    return false;
  }

  private searchAvailableRight(startY: number, startX: number, pieceToFind: TokenPiecesTypes) {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let x = startX - 1;
    while (x >= 0) {
      if (this.boardArr[startY][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[startY][x] === pieceToFind) return true;

      x--;
    }

    return false;
  }

  private searchAvailableTop(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY + 1;
    while (y < this.boardArr.length) {
      if (this.boardArr[y][startX] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][startX] == pieceToFind) return true;

      y++;
    }

    return false;
  }

  private searchAvailableBottom(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY - 1;
    while (y >= 0) {
      if (this.boardArr[y][startX] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][startX] == pieceToFind) return true;

      y--;
    }

    return false;
  }

  private isNextPositionNotAvailable(startY: number, startX: number, pieceToFind: TokenPiecesTypes) {
    return (
      startY >= this.boardArr.length ||
      startY < 0 ||
      startX >= this.boardArr.length ||
      startX < 0 ||
      this.boardArr[startY][startX] == pieceToFind ||
      this.boardArr[startY][startX] == TokenStatesEnum.EMPTY ||
      this.boardArr[startY][startX] == TokenStatesEnum.AVAILABLE_POSITION
    );
  }

  public handlePlayerTurn(y: number, x: number, pieceToAdd: TokenPiecesTypes) {
    this.boardArr[y][x] = pieceToAdd;
  }
}

const othelloEngineSingleton = OthelloEngineSingleton.Instance;

export default othelloEngineSingleton;
