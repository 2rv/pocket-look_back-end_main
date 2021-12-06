import { USER_ROLE } from '../../user/enum/user-role.enum';

export interface JwtPayload {
  id: string;
  role: USER_ROLE;
}
