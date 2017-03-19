import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService(null);
    component = new TodosComponent(todoService);
  });

  it('should set todos property with items from server', () => {
    let todos = [1, 2, 3];

    spyOn(todoService, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });
});