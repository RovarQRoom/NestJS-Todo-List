import { Body, Query, Controller, Get, Param, Patch, Post, UseGuards, Req, Res } from '@nestjs/common';
import { TaskService } from '../../service/task/task.service';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Tasks } from 'src/Model/TaskModel';
import { TaskCreateDto, TaskDeleteDto, TaskUpdateDto } from '../../Dtos/task.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService:TaskService,
        private readonly jwtService: JwtService
        ) {}

    @Get('tasks')
    async getTasks(@GetCurrentUserId() userId: string ,@Query('page') page:number): Promise<Tasks[]> {
        console.log(userId);
        
        return await this.taskService.getTasks(userId,page);
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string, @GetCurrentUserId() userId: string): Promise<Tasks> {
        return await this.taskService.getTaskById(id, userId);
    }

    @Post('create')
    async createTask(@GetCurrentUserId() userId: string, @Body() taskCreateDto: TaskCreateDto): Promise<TaskCreateDto> {
        return await this.taskService.createTask(userId, taskCreateDto);
    }

    @Patch('delete/:id')
    async deleteTask(@Param('id') id:string, @GetCurrentUserId() userId: string, @Body() taskDeleteDto: TaskDeleteDto): Promise<TaskDeleteDto> {
        return await this.taskService.deleteTask(id , userId, taskDeleteDto);
    }

    @Patch('update/:id')
    async updateTask(@Param('id') id:string, @GetCurrentUserId() userId: string, @Body() taskUpdateDto: TaskUpdateDto): Promise<TaskUpdateDto> {
        return await this.taskService.updateTask(id , userId, taskUpdateDto);
    }

    @Patch('update/status/:id')
    async updateStatusTask(@Param('id') id:string, @GetCurrentUserId() userId: string, @Body() taskUpdateDto: TaskUpdateDto): Promise<TaskUpdateDto> {
        return await this.taskService.updateTaskStatus(id , userId, taskUpdateDto);
    }


    
    @Public()
    @Post('verify-token')
    async verifyToken(@Req() req:any,@Res() res:any) {
        const accessToken = this.jwtService.signAsync({sub:req['body']['userId'], email:req['body']['email']},{
            secret:"rovarkamilothmanaziz",
            expiresIn: 60 * 60,
        })
        console.log(req['body']['userId']);
        return {access_token: accessToken};
    }
}
