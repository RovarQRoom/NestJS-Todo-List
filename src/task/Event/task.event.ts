export class TasksCreated {
    constructor(
        public readonly Title: string,
        public readonly Description: string,
        public readonly DueTime: string,
        public readonly UserId: string,
        ) {}
}