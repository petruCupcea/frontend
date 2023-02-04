import { Route } from '@angular/router';


declare const document: any;


// For e2e testing purposes
export class WriteRoutesForTesting {

  static printPathInHtml(parent: string, config: Array<Route>) {
    const paths = WriteRoutesForTesting.printPath(parent, config);
    const element = document.createElement('span');
    element.setAttribute('routes', paths.toString());
    element.setAttribute('id', 'ROUTES_E2E');
    document.body.appendChild(element);
  }


  private static printPath(parent: string, config: Array<Route>): Array<string> {
    let allRoutes = [];
    config.forEach((route: Route) => {
      if (route.path) {
        const path = parent + '/' + route.path;
        allRoutes.push(path);
      }
      if (route.children) {
        const currentPath = (route.path ? parent + '/' + route.path : parent);
        allRoutes = [...allRoutes, ...this.printPath(currentPath, route.children)];
      }
    });

    const normalizedData = WriteRoutesForTesting.normalizePaths(allRoutes);

    return normalizedData;
  }


  private static normalizePaths(data: Array<string>): Array<string> {
    const newData = [];
    data.forEach((dataItem: string) => {
      if (dataItem.indexOf(':') >= 0) {
        const str = dataItem.split(':');
        const replacedStr = dataItem.replace(':' + str[str.length - 1], 'DEMO_E2E_TEST');
        newData.push(replacedStr);
      } else if (dataItem.indexOf('*') === -1) {
        newData.push(dataItem);
      }
    });

    return newData;
  }

}
