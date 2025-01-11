import { CopyCommand } from "../commands/CopyCommand";
import { CreateCommand } from "../commands/CreateCommand";
import { CurrentCommand } from "../commands/CurrentCommand";
import { DeleteCommand } from "../commands/DeleteCommand";
import { DeleteKeyCommand } from "../commands/DeleteKeyCommand";
import { DocsCommand } from "../commands/DocsCommand";
import { ExampleCommand } from "../commands/ExampleCommand";
import { ExportCommand } from "../commands/ExportCommand";
import { GetKeyCommand } from "../commands/GetKeyCommand";
import { ImportCommand } from "../commands/ImportCommand";
import { InitCommand } from "../commands/InitCommand";
import { ListCommand } from "../commands/ListCommand";
import { OpenCommand } from "../commands/OpenCommand";
import { PingCommand } from "../commands/PingCommand";
import { TableCommand } from "../commands/TableCommand";
import { UpdateCommad } from "../commands/UpdateCommand";
import { UpdateKeyCommand } from "../commands/UpdateKeyCommand";
import { UpgradeCommand } from "../commands/UpgradeCommand";
import { UseCommand } from "../commands/UseCommand";
import { ValidateCommand } from "../commands/ValidateCommand";
import { VersionCommand } from "../commands/VersionCommand";
import { ViewCommand } from "../commands/ViewCommand";
import { CommandNotFoundError } from "../errors/CommandNotFoundError";
import { ICommand } from "../interfaces/ICommand";
import { CommandRetrievalPayload } from "../types/CommandRetrievalPayload";

export class CommandFactory{

    public static COMMAND_KEYS = {
        INIT: 'init',
        USE: 'use',
        CURRENT: 'current',
        OPEN: 'open',
        COPY: 'copy',
        GET_KEY: 'get-key',
        UPDATE_KEY: 'update-key',
        DELETE_KEY: 'delete-key',
        VIEW: 'view',
        CREATE: 'create',
        UPDATE: 'update',
        EXAMPLE: 'example',
        TABLE: 'table',
        DELETE: 'delete',
        LIST: 'list',
        VALIDATE: 'validate',
        EXPORT: 'export',
        IMPORT: 'import',
        VERSION: 'version',
        UPGRADE: 'upgrade',
        DOCS: 'docs',
        PING: 'ping'
    }

    public get({ commandName, ...payload }: CommandRetrievalPayload): ICommand {
        switch(commandName){
            case CommandFactory.COMMAND_KEYS.USE:
                return new UseCommand(payload)
            case CommandFactory.COMMAND_KEYS.CURRENT:
                return new CurrentCommand(payload)
            case CommandFactory.COMMAND_KEYS.INIT:
                return new InitCommand(payload)
            case CommandFactory.COMMAND_KEYS.OPEN:
                return new OpenCommand(payload)
            case CommandFactory.COMMAND_KEYS.COPY:
                return new CopyCommand(payload)
            case CommandFactory.COMMAND_KEYS.VIEW:
                return new ViewCommand(payload)
            case CommandFactory.COMMAND_KEYS.CREATE:
                return new CreateCommand(payload)
            case CommandFactory.COMMAND_KEYS.UPDATE:
                return new UpdateCommad(payload)
            case CommandFactory.COMMAND_KEYS.GET_KEY:
                return new GetKeyCommand(payload)
            case CommandFactory.COMMAND_KEYS.UPDATE_KEY:
                return new UpdateKeyCommand(payload)
            case CommandFactory.COMMAND_KEYS.DELETE_KEY:
                return new DeleteKeyCommand(payload)
            case CommandFactory.COMMAND_KEYS.EXAMPLE:
                return new ExampleCommand(payload)
            case CommandFactory.COMMAND_KEYS.TABLE:
                return new TableCommand(payload)
            case CommandFactory.COMMAND_KEYS.DELETE:
                return new DeleteCommand(payload)
            case CommandFactory.COMMAND_KEYS.LIST:
                return new ListCommand(payload)
            case CommandFactory.COMMAND_KEYS.VALIDATE:
                return new ValidateCommand(payload)
            case CommandFactory.COMMAND_KEYS.EXPORT:
                return new ExportCommand(payload)
            case CommandFactory.COMMAND_KEYS.IMPORT:
                return new ImportCommand(payload)
            case CommandFactory.COMMAND_KEYS.VERSION:
                return new VersionCommand()
            case CommandFactory.COMMAND_KEYS.UPGRADE:
                return new UpgradeCommand()
            case CommandFactory.COMMAND_KEYS.DOCS:
                return new DocsCommand()
            case CommandFactory.COMMAND_KEYS.PING:
                return new PingCommand()
            default:
              throw new CommandNotFoundError()
        }
    }
}