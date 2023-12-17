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

  // Search and mark available pieces section
  public searchAvailableForPiece(currentPiece: TokenPiecesTypes) {
    this.cleanOldAvailablePositions();
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] == TokenStatesEnum.EMPTY) {
          const isAvailable =
            this.searchAvailableFromTopLeftDiagonal(i + 1, j + 1, currentPiece) ||
            this.searchAvailableFromTopRightDiagonal(i + 1, j - 1, currentPiece) ||
            this.searchAvailableFromBottomRightDiagonal(i - 1, j - 1, currentPiece) ||
            this.searchAvailableFromBottomLeftDiagonal(i - 1, j + 1, currentPiece) ||
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

  private searchAvailableFromTopLeftDiagonal(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
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

  private searchAvailableFromBottomRightDiagonal(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY - 1;
    let x = startX - 1;

    while (y >= 0 && x >= 0) {
      if (this.boardArr[y][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][x] === pieceToFind) return true;

      x--;
      y--;
    }

    return false;
  }

  private searchAvailableFromTopRightDiagonal(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY + 1;
    let x = startX - 1;

    while (y < this.boardArr.length && x >= 0) {
      if (this.boardArr[y][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][x] === pieceToFind) return true;
      y++;
      x--;
    }

    return false;
  }

  private searchAvailableFromBottomLeftDiagonal(startY: number, startX: number, pieceToFind: TokenPiecesTypes): boolean {
    if (this.isNextPositionNotAvailable(startY, startX, pieceToFind)) return false;

    let y = startY;
    let x = startX;

    while (y >= 0 && x < this.boardArr.length) {
      if (this.boardArr[y][x] === TokenStatesEnum.EMPTY) return false;
      if (this.boardArr[y][x] === pieceToFind) return true;
      y--;
      x++;
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

    const oppositePiece = pieceToAdd === TokenStatesEnum.BLACK ? TokenStatesEnum.WHITE : TokenStatesEnum.BLACK;

    this.colorizePieces(y, x, oppositePiece, pieceToAdd);
  }

  // Colorize tokens section
  //
  //
  private colorizePieces(y: number, x: number, currentPiece: number, pieceToColorize: TokenPiecesTypes) {
    this.colorizeFromTop(y + 1, x, currentPiece, pieceToColorize);
    this.colorizeFromBottom(y - 1, x, currentPiece, pieceToColorize);
    this.colorizeFromLeft(y, x + 1, currentPiece, pieceToColorize);
    this.colorizeFromRight(y, x - 1, currentPiece, pieceToColorize);
    this.colorizeFromTopLeftDiagonal(y + 1, x + 1, currentPiece, pieceToColorize);
    this.colorizeFromTopRightDiagonal(y + 1, x - 1, currentPiece, pieceToColorize);
    this.colorizeFromBottomLeftDiagonal(y - 1, x + 1, currentPiece, pieceToColorize);
    this.colorizeFromBottomRightDiagonal(y - 1, x - 1, currentPiece, pieceToColorize);
  }

  private colorizeFromTop(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableTop(startY, startX, currentPiece)) return;

    let y = startY;
    while (y < this.boardArr.length && this.boardArr[y][startX] === oppositePiece) {
      this.boardArr[y][startX] = currentPiece;
      y++;
    }
  }

  private colorizeFromBottom(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableBottom(startY, startX, currentPiece)) return;

    let y = startY;

    while (y >= 0 && this.boardArr[y][startX] === oppositePiece) {
      this.boardArr[y][startX] = currentPiece;
      y--;
    }
  }

  private colorizeFromLeft(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableLeft(startY, startX, currentPiece)) return;

    let x = startX;

    while (x < this.boardArr.length && this.boardArr[startY][x] === oppositePiece) {
      this.boardArr[startY][x] = currentPiece;
      x++;
    }
  }

  private colorizeFromRight(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableRight(startY, startX, currentPiece)) return;

    let x = startX;

    while (x >= 0 && this.boardArr[startY][x] === oppositePiece) {
      this.boardArr[startY][x] = currentPiece;
      x--;
    }
  }

  // From top-left to bottom-right
  private colorizeFromTopLeftDiagonal(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableFromTopLeftDiagonal(startY, startX, currentPiece)) return;

    let y = startY;
    let x = startX;

    while (x < this.boardArr.length && y < this.boardArr.length && this.boardArr[y][x] === oppositePiece) {
      this.boardArr[y][x] = currentPiece;
      y++;
      x++;
    }
  }

  // From top-right to bottom-left
  private colorizeFromTopRightDiagonal(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableFromTopRightDiagonal(startY, startX, currentPiece)) return;

    let y = startY;
    let x = startX;

    while (x >= 0 && y < this.boardArr.length && this.boardArr[y][x] === oppositePiece) {
      this.boardArr[y][x] = currentPiece;
      y++;
      x--;
    }
  }

  // From bottom-left to top-right
  private colorizeFromBottomLeftDiagonal(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableFromBottomLeftDiagonal(startY, startX, currentPiece)) return;

    let y = startY;
    let x = startX;

    while (y >= 0 && x < this.boardArr.length && this.boardArr[y][x] === oppositePiece) {
      this.boardArr[y][x] = currentPiece;
      y--;
      x++;
    }
  }

  // From bottom-right to top-left
  private colorizeFromBottomRightDiagonal(startY: number, startX: number, oppositePiece: TokenPiecesTypes, currentPiece: TokenPiecesTypes) {
    if (!this.searchAvailableFromBottomRightDiagonal(startY, startX, currentPiece)) return;

    let y = startY;
    let x = startX;

    while (y >= 0 && x < this.boardArr.length && this.boardArr[y][x] === oppositePiece) {
      this.boardArr[y][x] = currentPiece;
      y--;
      x--;
    }
  }
}

const othelloEngineSingleton = OthelloEngineSingleton.Instance;

export default othelloEngineSingleton;
