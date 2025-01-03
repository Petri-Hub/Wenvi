import { EnvironmentFileListingError } from "../errors/EnvironmentFileListingError";
import { EnvironmentFileRetrievalError } from "../errors/EnvironmentFileRetrievalError";
import { IRepository } from "../interfaces/IRepository";
import { EnvironmentFile } from "../types/EnvironmentFile";
import fs from 'fs'
import path from 'path'

export class LocalEnvironmentRepository implements IRepository{
    public async get(subject: string, environment: string): Promise<string | null> {
        try{
           
            const directory = path.join(process.cwd(), 'environments', subject)
            const filePath = path.join(directory, `.env.${environment}`)
            const environmentVariables = fs.readFileSync(filePath, 'utf-8')
            
            return environmentVariables

        } catch(error){
            throw new EnvironmentFileRetrievalError(error)
        }
    }

    public async list(): Promise<EnvironmentFile[]> {
        try{

            const results = []
            const subjects = this.getSubjects()
            
            for(const subjectName of subjects){
                const environments = this.getEnvironmentsFromSubject(subjectName)
                
                for(const environmentName of environments){
                    results.push({
                        subject: subjectName,
                        environment: environmentName.split('.').pop() as string
                    })
                }               
            }

            return results

        } catch(error){
            throw new EnvironmentFileListingError(error)
        }
    }

    public async listSubjects(): Promise<string[]> {
        return this.getSubjects()
    }

    public async listEnvironments(subject: string): Promise<string[]> {
        return this.getEnvironmentsFromSubject(subject)
    }

    public getSubjects(): string[] {
        const directoryPath = path.join(process.cwd(), 'environments')
        const directoryContents = fs.readdirSync(directoryPath)

        const subjects = directoryContents.filter(contentName => {
            const stats = fs.statSync(path.join(directoryPath, contentName))
            const isDirectory = stats.isDirectory()

            return isDirectory
        })
        
        return subjects
    }

    public getEnvironmentsFromSubject(subject: string): string[] {
        const directoryPath = path.join(process.cwd(), 'environments', subject)
        const fileNames = fs.readdirSync(directoryPath)
        const environments = fileNames.filter(fileName => fileName.startsWith('.env'))
        
        return environments
    }

    public async exists(): Promise<boolean> {
        return fs.existsSync(
            path.join(process.cwd(), 'environments')
        )
    }

    public async example(): Promise<string | null> {
        const examplePath = path.join(process.cwd(), 'environments', '.env.example')

        if(!fs.existsSync(examplePath)){
            return null
        }

        return fs.readFileSync(examplePath, 'utf-8')
    }
}