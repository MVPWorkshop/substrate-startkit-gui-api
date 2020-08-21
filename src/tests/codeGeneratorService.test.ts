import CodeGeneratorService from '../services/codeGenerator.service';
import { IUser } from '../entities/user.entity';
import { ESupportedPallets } from '../pallets/pallets.types';
import { ChildProcess, exec } from 'child_process';
import { kill } from '../utils/scripts.util';
import FileUtil from '../utils/file.util';

const RealDate = Date.now;

beforeAll(() => {
  global.Date.now = jest.fn(() => (
    new Date('2020-08-20T14:06:23.466Z').getTime()
  ));
})

describe('Substrate code generates and can be successfully compiled', () => {
  let projectPath: string;
  let compileProcess: ChildProcess | undefined;

  const palletsToGenerate: ESupportedPallets[] = [
    ESupportedPallets.PALLET_BALANCE,
    ESupportedPallets.PALLET_CONTRACT
  ];

  const user: IUser = {
    githubUserId: 'testUserId',
    id: 'testUserId'
  };

  beforeAll(async () => {
    // Remove any previous existing directory
    await FileUtil.removeDirectory(`./generator/temporary/${Date.now()}-${user.id}`);
  })

  test('Code is generated successfully', async () => {
    const codeGenerator = new CodeGeneratorService();

    projectPath = await codeGenerator.generateSubstrateProject(palletsToGenerate, user);
  });

  test('Project folder name is in correct format', () => {

    const lastFolderInPathName = new RegExp(/([^\\\/]*)$/);
    const folderName = lastFolderInPathName.exec(projectPath)[0];

    expect(folderName).toBe(`${Date.now()}-${user.id}`);
  });

  // Skipping because it's a complex not always necessary test
  test.skip('The generated project compiles successfully', (done) => {
    compileProcess = exec(`cd ${projectPath} && cargo check`, ((error, stdout, stderr) => {
      if (error) {
        done.fail(error);
      }

      if (stderr) {
        const isSuccessfulCompilation = new RegExp(/Finished\sdev/)

        if (isSuccessfulCompilation.test(stderr)) {
          // Non errored output is piped to stderr so we check if successful
          done();
        } else {
          done.fail({message: stderr});
        }
      }

      done();
    }))
  }, 900000);

  afterAll(async () => {
    if (compileProcess) {
      // First kill compile process
      try {
        await kill(compileProcess.pid);
      } catch (e) {
        // In case the process was already killed by some error throw
      }
    }

    // Delete project folder after testing completed
    const codeGenerator = new CodeGeneratorService();
    await codeGenerator.removeProject(projectPath);
  });
})

afterAll(() => {
  global.Date.now = RealDate;
})
