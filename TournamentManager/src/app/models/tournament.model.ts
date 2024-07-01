import { Game } from './game.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Bracket } from './bracket.model';

export interface Tournament {
  id: string;
  avatar?: string;
  game: Game;
  name: string;
  participants: Team[];
  bracket?: Bracket;
  tournamentState: MatchState;
  tournamentManager: User;
  description: string;
  prize?: string;
  startingDate?: string;
  endingDate?: string;
  startingTime?: string;
  winner?: Team;
  losers?: Team[];
}

export interface CreateTournamentRequestBody {
  avatar?: string;
  game: Game;
  name: string;
  participants?: Team[];
  bracket?: Bracket;
  tournamentState?: MatchState;
  tournamentManager?: User;
  description: string;
  prize?: string;
  startingDate?: string;
  endingDate?: string;
  startingTime?: string;
}

export interface UpdateTournamentRequestBody {
  avatar?: string;
  game?: Game;
  name?: string;
  participants?: Team[];
  bracket?: Bracket;
  tournamentState?: MatchState;
  description?: string;
  prize?: string;
  endingDate?: string;
  winner?: Team;
  losers?: Team[];
}

export interface DeleteTournamentResponseBody {
  message: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export enum MatchState {
  PLANNED = 'PLANNED',
  ONGOING = 'ONGOING',
  CONCLUDED = 'CONCLUDED',
  CANCELED = 'CANCELED'
}
