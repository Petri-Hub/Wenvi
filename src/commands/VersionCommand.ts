import { Command } from "../interfaces/Command";
import * as fs from 'fs';
import * as path from 'path';

export class VersionCommand implements Command {
    public async execute(): Promise<void> {
        const packageJsonPath = path.resolve(__dirname, '../../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const version = packageJson.version;
        
        console.log(`Wenvi CLI v${version}`);
    }
}