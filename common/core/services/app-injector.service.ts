import { Injector, Type } from '@angular/core';


export class AppInjector {

  private static injector: Injector;


  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
  }


  static getDependency<T>(dependency: Type<T>): T {
    const injector = AppInjector.injector;
    const foundDependency = injector.get<T>(dependency);

    return foundDependency;
  }

}
