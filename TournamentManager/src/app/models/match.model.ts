// src/app/models/match.model.ts

import { Team } from './team.model';
import { Tournament } from './tournament.model';
import { Bracket } from './bracket.model';

export enum MatchState {
    PLANNED = 'PLANNED',
    CONCLUDED = 'CONCLUDED',
    CANCELED = 'CANCELED',
    ONGOING = 'ONGOING'
}

export interface Match {
    id: number;
    startingDate: string;  // ISO 8601 date format
    startingTime: string;  // ISO 8601 time format
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
    startingDate: string;  // ISO 8601 date format
    startingTime: string;  // ISO 8601 time format
    teamASide: Team;
    teamBSide: Team;
    matchState: MatchState;
    tournament: Tournament;
    bracket: Bracket;
}

export interface UpdateMatchRequestBody {
    startingDate?: string;  // ISO 8601 date format
    startingTime?: string;  // ISO 8601 time format
    teamASide?: Team;
    teamBSide?: Team;
    teamAScore?: number;
    teamBScore?: number;
    matchState?: MatchState;
    tournament?: Tournament;
    bracket?: Bracket;
    winner?: Team;
    loser?: Team;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface DeleteMatchResponseBody {
    message: string;
    match: Match;
}
