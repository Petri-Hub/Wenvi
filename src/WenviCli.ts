import { CommandRegistry } from "./CommandRegistry"
import { BaseError } from "./errors/BaseError"
import { CommandNotFoundError } from "./errors/CommandNotFoundError"

export class WenviCli{
    constructor(private commandRegistry: CommandRegistry) {}
    
    public async run([,, commandName, ...args]: string[]): Promise<void> {
        try{

            const command = this.commandRegistry.get(commandName)
            
            if(!command){
                throw new CommandNotFoundError()
            }

            return await command.execute(...args)

        } catch(error){
            await this.handleError(error)
        }
    }

    public async handleError(error: BaseError | Error | unknown): Promise<void> {
        if(error instanceof BaseError){
            console.error(error.getMessage())
            console.error(error.getError())
            return
        }
        
        if(error instanceof Error){
            console.error(error.message)
            console.error(error.stack)
            return
        }

        console.error("Unknown error.")
        console.error(error)
    }
}