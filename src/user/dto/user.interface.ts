export interface UserWithoutPassword {
  id: string;
  username: string;
  won: number;
  losed: number;
  photo: string;
  games: number;
}

export type UserArrayWithoutPassword = UserWithoutPassword[];
