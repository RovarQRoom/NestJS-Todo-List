import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from '../../service/task/task.service';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Tasks } from 'src/Model/TaskModel';
import { TaskCreateDto, TaskDeleteDto } from '../../Dtos/task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService:TaskService) {}

    @Get('tasks')
    async getTasks(@GetCurrentUserId() userId: string): Promise<Tasks[]> {
        return await this.taskService.getTasks(userId);
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string, @GetCurrentUserId() userId: string): Promise<Tasks> {
        return await this.taskService.getTaskById(id, userId);
    }

    @Post('create')
    async createTask(@GetCurrentUserId() userId: string, @Body() taskCreateDto: TaskCreateDto): Promise<Tasks> {
        return await this.taskService.createTask(userId, taskCreateDto);
    }

    @Patch('delete/:id')
    async deleteTask(@Param('id') id:string, @GetCurrentUserId() userId: string, @Body() taskDeleteDto: TaskDeleteDto): Promise<Tasks> {
        return await this.taskService.deleteTask(id , userId, taskDeleteDto);
    }
}
