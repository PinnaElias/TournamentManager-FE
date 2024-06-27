import { Game } from './game.model';
import { Team } from './team.model';

export interface User {
  id: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  userRole: UserRole;
  likedGames: Game[];
  team: Team;
  preferredRole: Role;
  nationality: string;
  mvpCount: number;
}

export interface CreateUserRequestBody {
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  likedGames?: Game[];
  preferredRole?: Role;
  nationality?: string;
  avatarUrl: string;
  userRole: UserRole;
}

export interface UpdateUserRequestBody {
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  likedGames?: Game[];
  preferredRole?: Role;
  nationality?: string;
  avatarUrl?: string;
  userRole?: UserRole;
  mvpCount?: number;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  // Aggiungi altri ruoli se necessario
}

export enum Role {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
  // Aggiungi altri ruoli se necessario
}
