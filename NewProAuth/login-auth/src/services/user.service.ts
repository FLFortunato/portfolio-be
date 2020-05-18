import { User } from '../models/user.model';

import { BaseService } from './base.service';

class UserService extends BaseService<User> {}

const UserServiceInstance = new UserService('user');

export default UserServiceInstance;
