import fs from 'fs';
import { ncp, Options } from 'ncp';
import mkdirp from 'mkdirp';

class FileUtil {
  public static readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      })
    });
  }

  public static writeFile(path: string, content: string): Promise<void>  {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, err => {
        if (err) {
          reject(err);
        }

        resolve();
      })
    })
  }

  public static removeDirectory(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rmdir(path, {recursive: true}, err => {
        if (err) {
          reject(err)
        }

        resolve();
      })
    })
  }

  // Creates a new directory on the specified path and returns the full path in return
  public static async createDirectory(path: string): Promise<string> {
    try {
      return await mkdirp(path)
    } catch (error) {
      // Handle possible errors
      throw error;
    }
  }

  public static async copyDirectory(from: string, to: string): Promise<fs.WriteStream | void> {

    const ncpOptions: Options = {
      stopOnErr: true,
      limit: 32
    }

    return new Promise((resolve, reject) => {
      ncp(from, to, ncpOptions, (data) => {

        const isError = data instanceof Error || (Array.isArray(data) && data[0] instanceof Error);

        if (isError) {
          const error = (Array.isArray(data) ? data[0] : data) as Error;

          reject(error);
        }

        // No error happened here
        if (data) {
          // Not being an error or null, return type can only be WriteStream then
          resolve(data as fs.WriteStream)
        } else {
          // Null so we resolve to void
          resolve()
        }
      })
    })
  }
}

export default FileUtil;
