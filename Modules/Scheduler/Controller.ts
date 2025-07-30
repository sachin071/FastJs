import { Controller, Get } from "../../Decorators/index.ts";


@Controller('Scheduler')
export class SchedulerClass {
    constructor() { }


    @Get('CurrentDate')
    async function() {
        return {
            Scheduler: 'Working or is it ??'
        }
    }

}