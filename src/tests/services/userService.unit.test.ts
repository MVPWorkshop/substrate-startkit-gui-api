import User from '../../models/User.model';
import { mocked } from 'ts-jest/utils';
import UserService from '../../services/user.service';

jest.mock('../../models/User.model');

describe("User Service test", () => {
  const MockedUserModel = mocked(User, true);

  beforeEach(() => {
    MockedUserModel.mockClear();
  })

  describe("Finding user by id works", () => {
    UserService.getUserById('1234');

    test("findOne function is called on User model", () => {
      expect(MockedUserModel.findOne).toBeCalled();
    })

    test("The user id is included in the where clause", () => {
      expect(MockedUserModel.findOne).toBeCalledWith({
        where: {
          id: '1234'
        }
      })
    })
  })
});
