import { Tournament } from './tournament.model';
import { Team } from './team.model';

export interface Bracket {
  id: string;
  bracketType: BracketType;
  tournament?: Tournament;
  participants: Team[];
  winner?: Team;
  losers: Team[];
}

export interface CreateBracketRequestBody {
  bracketType: BracketType;
  tournament?: Tournament;
  participants?: Team[];
}

export interface UpdateBracketRequestBody {
  bracketType?: BracketType;
  tournament?: Tournament;
  participants?: Team[];
  winner?: Team;
  losers?: Team[];
}

export enum BracketType {
  SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
  DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
  ROUND_ROBIN = 'ROUND_ROBIN',
  LADDER_TOURNAMENT = 'LADDER_TOURNAMENT'
}
