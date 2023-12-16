export enum TokenStatesEnum {
  EMPTY,
  BLACK,
  WHITE,
  AVAILABLE_POSITION,
}

export type TokenPiecesTypes = TokenStatesEnum.WHITE | TokenStatesEnum.BLACK;

export type ReturnFindAvailable = { y: number; x: number; isAvailable: boolean } | { isAvailable: false };
