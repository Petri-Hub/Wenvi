import { EnvironmentFile } from "../types/EnvironmentFile";

export interface IRepository {
   get(subject: string, environment: string): Promise<string | null>
   list(): Promise<EnvironmentFile[]>
   exists(): Promise<boolean>
   listSubjects(): Promise<string[]>
   listEnvironments(subject: string): Promise<string[]>
   getExample(): Promise<string>
   createExample(): Promise<void>
   createSubject(subject: string): Promise<void>
   createEnvironment(subject: string, environment: string): Promise<void>
}