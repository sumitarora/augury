// Load Global Styles
import {ROUTER_PROVIDERS} from 'angular2/router';

import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF}
from 'angular2/platform/common';

import {provide} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';

import KitchenSink from './containers/kitchen-sink';
import {TodoService, FormatService} from './components/todo-app/todo-service';

bootstrap(KitchenSink, [
  ROUTER_PROVIDERS,
  FORM_DIRECTIVES,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, {useValue: ''}),
  TodoService,
  FormatService
]);
