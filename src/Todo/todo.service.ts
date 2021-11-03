import { Injectable } from '@nestjs/common';
import {Todo} from "../todo.interface";

@Injectable()
export class TodoService {
    private todos:Todo[] = [];
    getAlltodos(){
        return this.todos;
    }
    createTodo(todo: Todo):void{
        this.todos.push(todo)
    }
    findOneTodo(id:string):Todo{
      const todo =   this.todos.find(todo => todo.id === id)
      return todo
    }
    updateTodo(id:string, todo:Todo):Todo{
        const  updated_index = this.todos.findIndex(todo => todo.id === id);
        const updated_todo = this.todos[updated_index] = todo;
        return updated_todo
    }
    deleteTodo(id:string):string{
        const  deleted_index = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(deleted_index, 1);
        return "Todo deleted Successfully";
    }
}
