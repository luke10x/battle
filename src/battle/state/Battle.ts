export type Face = 1 | 2 | 3 | 4 | 5 | 6;

export type Roll = [Face, Face];

export interface Fighter {
  health: number;
  lastRoll?: Roll;
  lastHit: number;
}

export interface Battle {
  human: Fighter;
  monster: Fighter;
  inProgress: boolean;
}
