import { User } from "./user.model";

export interface Game {
  id: string;
  name: string;
  maxPlayersNumberForTeam: number;
  avatar?: string;
  subscribers: User[];
}

export interface CreateGameRequestBody {
  name: string;
  maxPlayersNumberForTeam: number;
  avatar?: string;
}

export interface UpdateGameRequestBody {
  name?: string;
  maxPlayersNumberForTeam?: number;
  avatar?: string;
  subscribers?: User[];
}
