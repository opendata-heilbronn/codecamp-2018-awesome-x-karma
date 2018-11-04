import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  /**
     * Updates a specified node in a object.
     *
     * @param obj
     * @param path path to the node that will be updated (overwritten) - if path is null, it will overwrite the whole object
     * @param value
     * @param createNodes if true, the path to the node will be created if not exists. Default is true.
     */
    UpdateNode<T>(obj: T, path: string, value, createNodes?: boolean): T {
      try {
          if (obj === undefined || obj == null) {
              obj = {} as T;
          }
          if (path === undefined) {
              path = '';
          }
          if (createNodes === undefined) {
              createNodes = true;
          }

          if (path.indexOf('.') > -1) {
              // still not at the end
              const currentNode = path.substr(0, path.indexOf('.'));

              if (obj[currentNode] === undefined) {
                  console.log(
                      'the node (' +
                          currentNode +
                          ') you are looking for does not exists.',
                      obj
                  );
                  if (createNodes === false) {
                      throw new Error(
                          'path not valid - missing node ' + path
                      );
                  }

                  obj[currentNode] = {};
              }

              const nPath = path.substr(path.indexOf('.') + 1);
              const nObj = obj[path.substr(0, path.indexOf('.'))];
              obj[path.substr(0, path.indexOf('.'))] = this.UpdateNode<T>(
                  nObj,
                  nPath,
                  value,
                  createNodes
              );
              return obj;
          } else {
              if (obj[path] === undefined && createNodes === false) {
                  throw new Error('path not valid - missing node ' + path);
              }

              if (path.trim() === '') {
                  obj = value;
              } else {
                  obj[path] = value;
              }

              return obj;
          }
      } catch (ex) {
          console.error(ex);
          throw ex;
      }
  }

  GetValue(obj: any, path: string, casesensitive: boolean = true): any {
      try {
          if (obj == null || path == null) {
              return null;
          }

          if (path.indexOf('.') > -1) {
              return this.GetValue(
                  obj[path.substring(0, path.indexOf('.'))],
                  path.substring(path.indexOf('.') + 1)
              );
          } else {

              if (casesensitive === true) {
                  return obj[path];
              }

              let value = null;

              Object.keys(obj).forEach(key => {
                  if (key.toLowerCase() == path.toLowerCase()) {
                      value = obj[key];
                  }
              });

              return value;
          }
      } catch (ex) {
          console.error(ex);
      }
  }

  GetLeafes(obj: any, path?: string): string[] {
      try {
          let leafes: string[] = [];
          if (path === undefined) {
              path = '';
          }

          const keys = Object.keys(obj);

          keys.forEach(key => {
              if (key.match(/\$/)) {
                  return;
              }
              if (
                  Array.isArray(obj[key]) === true ||
                  typeof obj[key] === 'function'
              ) {
                  // arrays and functions will be leafes
                  if (path === '') {
                      leafes.push(key);
                  } else {
                      leafes.push(path + '.' + key);
                  }
              } else if (typeof obj[key] === 'object') {
                  if (path === '') {
                      leafes = leafes.concat(this.GetLeafes(obj[key], key));
                  } else {
                      leafes = leafes.concat(
                          this.GetLeafes(obj[key], path + '.' + key)
                      );
                  }
              } else {
                  if (path === '') {
                      leafes.push(key);
                  } else {
                      leafes.push(path + '.' + key);
                  }
              }
          });

          return leafes;
      } catch (ex) {
          console.error(ex);
          throw ex;
      }
  }

  Merge<T>(ob1: T, obj2): T {
      try {
          if (obj2 == null) {
              return ob1;
          }
          if (ob1 == null) {
              return obj2;
          }

          const leafes = this.GetLeafes(obj2);

          leafes.forEach(leaf => {
              ob1 = this.UpdateNode<T>(
                  ob1,
                  leaf,
                  this.GetValue(obj2, leaf),
                  true
              );
          });

          return ob1;
      } catch (ex) {
        console.error(ex);
      }
  }
}
