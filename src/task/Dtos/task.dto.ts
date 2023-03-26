import { IsNotEmpty } from "class-validator";

export class TaskCreateDto {
    @IsNotEmpty()
    Title: string;

    Description: string|null;

    DueTime: Date|null;

    IsDone: boolean;

    DoneDate: Date|null;

    UserId: string;
}

export class TaskUpdateDto {
    @IsNotEmpty()
    Title: string;

    Description: string|null;

    DueTime: Date|null;
}

export class TaskUpdateStatusDto {
    IsDone: boolean;

    DoneDate: Date|null;
}

export class TaskDeleteDto {
    
    IsDeleted: boolean;

    DeletedDate: Date|null;
}