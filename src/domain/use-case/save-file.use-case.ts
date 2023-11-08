import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFiles implements SaveFileUseCase {
    constructor /** repository: StorageRepository */() {}

    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table',
    }: Options): boolean {
        try {
            // fs deberia estar en el repository de storage
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
