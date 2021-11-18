import { User } from "types/user";

export type Review = {
  id: number;
  text: string;
  movieId: number;
  user: User;
}