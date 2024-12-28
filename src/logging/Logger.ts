import chalk from "chalk";

export abstract class Logger{
    public static log(message: string): void {
        console.log(
            chalk.bold.blue('Wenvi > ') +
            chalk.white(message)
        )
    }

    public static error(message: string): void {
        console.log(
            chalk.bold.red('Wenvi > ') +
            chalk.white(message)
        )
    }

    public static success(message: string): void {
        console.log(
            chalk.bold.green('Wenvi > ') +
            chalk.white(message)
        )
    }
}