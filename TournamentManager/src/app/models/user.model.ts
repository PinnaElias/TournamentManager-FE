import { Game } from './game.model';
import { Team } from './team.model';

export interface User {
  id?: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  userRole: UserRole;
  likedGames?: Game[];
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
  userRole?: UserRole;  // userRole è facoltativo qui, perché verrà impostato a "USER" di default
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
}

export enum Role {
  OFFENSIVE = 'OFFENSIVE',
  DEFENSIVE = 'DEFENSIVE',
  SUPPORT = 'SUPPORT',
  CARRY = 'CARRY',
  FLEXIBLE = 'FLEXIBLE'
}
