import {Role} from './role';

export interface JWTClaims {
  sub: string;
  role: Role;
  exp: number;
}
