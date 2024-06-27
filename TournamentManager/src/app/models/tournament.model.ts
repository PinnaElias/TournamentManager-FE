import { Game } from './game.model';
import { Team } from './team.model';
import { User } from './user.model';

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

export enum MatchState {
  PLANNED = 'PLANNED',
  ONGOING = 'ONGOING',
  CONCLUDED = 'CONCLUDED',
  CANCELED = 'CANCELED'
}
