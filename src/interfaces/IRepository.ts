export interface IRepository {
   exists(): Promise<boolean>
   getSubjects(): Promise<string[]>
   getEnvironments(subject: string): Promise<string[]>
   getEnvironment(subject: string, environment: string): Promise<string>
   getExample(): Promise<string>
   createExample(): Promise<void>
   createSubject(subject: string): Promise<void>
   createEnvironment(subject: string, environment: string): Promise<void>
   deleteSubject(subject: string): Promise<void>
   deleteEnvironment(subject: string, environment: string): Promise<void>
   openSubject(subject: string): Promise<void>
   openEnvironment(subject: string, environment: string): Promise<void>
}