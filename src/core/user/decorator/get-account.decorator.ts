import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../user.entity';

interface RequestData extends Request {
  user: UserEntity;
}

export const GetAccount = createParamDecorator(
  (data: string, request: RequestData) => {
    const user: UserEntity = request.user;
    console.log(user);
    return data ? user && user[data] : user;
  },
);

export const GetUser = createParamDecorator((data: string, ctx) => {
  const user: UserEntity = ctx.switchToHttp().getRequest().user;

  return data ? user && user[data] : user;
});
