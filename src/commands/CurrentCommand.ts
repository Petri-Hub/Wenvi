import { BaseCommand } from "./BaseCommand";
import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CurrentEnvironmentNotSetError } from "../errors/CurrentEnvironmentNotSetError";
import fs from 'fs-extra'

export class CurrentCommand extends BaseCommand implements ICommand{
    public async execute(): Promise<void> {
        const environmentPath = process.cwd() + '/.env'
        const isEnvironmentMissing = !fs.existsSync(environmentPath)

        if(isEnvironmentMissing){
            throw new CurrentEnvironmentNotSetError()
        }

        Logger.log('Seeing current environment:\n')
        console.log(fs.readFileSync(environmentPath, 'utf-8'))
    }
}