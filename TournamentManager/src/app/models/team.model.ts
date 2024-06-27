import { Game } from "./game.model";
import { User } from "./user.model";

export interface CreateTeamRequestBody {
    name: string;
    avatar?: string;
    game: Game;
    members?: User[];
    nationality: string;
  }
  
  export interface UpdateTeamRequestBody {
    avatar?: string;
    name?: string;
    game?: Game;
    activeTournaments?: Tournament[];
    tournamentsHistory?: Tournament[];
    members?: User[];
    nationality?: string;
  }
  
  export interface Team {
    id: string;
    name: string;
    avatar: string;
    game: Game;
    members: User[];
    nationality: string;
    activeTournaments: Tournament[];
    tournamentsHistory: Tournament[];
  }
  
  export interface DeleteTeamResponseBody {
    message: string;
  }
  
  export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }