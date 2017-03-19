import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';



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

  it('should call server to save changes when new todo item is added', () => {
    let spy = spyOn(todoService, 'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo from server', () => {
    let todo = { id: 1 };
    let spy = spyOn(todoService, 'add').and.callFake(t => {
      return Observable.from([todo]);
    });
    // or
    // let spy = spyOn(todoService, 'add').and.returnValue(Observable.from([todo]));
    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns error when adding new todo', () => {
    let todo = { id: 1 };
    let error = 'Error from Server';
    let spy = spyOn(todoService, 'add').and.callFake(t => {
      return Observable.throw(error);
    });
    // or
    // let spy = spyOn(todoService, 'add').and.returnValue(Observable.from([todo]));
    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(todoService, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(todoService, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});