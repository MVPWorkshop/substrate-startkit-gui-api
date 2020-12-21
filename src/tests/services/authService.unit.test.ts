import User from '../../models/User.model';
import { mocked } from 'ts-jest/utils';
import AuthService from '../../services/auth.service';

jest.mock('../../models/User.model');

describe("Auth service test", () => {
  const MockedUserModel = mocked(User, true);

  beforeEach(() => {
    MockedUserModel.mockClear();
  })

  test("Login storage works", async () => {
    await AuthService.login("x1234", {
      id: 'id1234',
      username: 'testUsername'
    })

    expect(MockedUserModel.findOrCreate).toBeCalled();
  })
})
