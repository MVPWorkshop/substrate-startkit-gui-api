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
    //@ts-ignore
    MockedUserModel.findOrCreate.mockReturnValueOnce([{
      id: 'randomId',
      github_user_id: 'x1234',
      github_username: 'testUsername'
    }])

    const response = await AuthService.login("x1234", {
      id: 'x1234',
      username: 'testUsername'
    })

    expect(MockedUserModel.findOrCreate).toBeCalled();
    expect(response.id).toBe('randomId');
    expect(response.githubUsername).toBe('testUsername');
    expect(response.githubUserId).toBe('x1234');
  })
})
