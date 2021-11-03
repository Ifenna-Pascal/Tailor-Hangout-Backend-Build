import { Controller, Post, Get, Logger, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/todo.interface';
import { Random_id } from 'src/Util/Random_id';
@Controller('todos')
export class TodoController {
    constructor(private readonly todoservice: TodoService){}
    @Get()
    findAll():Todo[]{
        return this.todoservice.getAlltodos();
    }
    @Post("/create")
    createTodo(@Body() todo:Todo):Todo{
        Logger.log(Random_id())
        todo.id = Random_id();
        const res = this.todoservice.createTodo(todo);
        Logger.log("Creating Todo.......")
        return res
    }

    

}
