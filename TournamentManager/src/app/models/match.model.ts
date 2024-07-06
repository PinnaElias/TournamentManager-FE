import { Team } from './team.model';
import { Tournament } from './tournament.model';
import { Bracket } from './bracket.model';

export interface Match {
  id: number;
  startingDate: string;
  startingTime: string;
  teamASide: Team;
  teamBSide: Team;
  teamAScore: number;
  teamBScore: number;
  matchState: MatchState;
  tournament: Tournament;
  bracket: Bracket;
  winner?: Team;
  loser?: Team;
}

export interface CreateMatchRequestBody {
  startingDate: string;
  startingTime: string;
  teamASide: number;
  teamBSide: number;
  matchState: MatchState;
  tournamentId: number;
  bracketId: number;
}

export interface UpdateMatchRequestBody {
  startingDate?: string;
  startingTime?: string;
  teamASide?: number;
  teamBSide?: number;
  teamAScore?: number;
  teamBScore?: number;
  matchState?: MatchState;
  tournamentId?: number;
  bracketId?: number;
  winnerId?: number;
  loserId?: number;
}

export enum MatchState {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface DeleteMatchResponseBody {
  message: string;
  match: Match;
}
