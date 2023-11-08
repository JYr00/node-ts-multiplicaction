import { SaveFiles } from '../domain/use-case/save-file.use-case';
import { CreateTable } from './../domain/use-case/create-table.use-case';
interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class SercerApp {
    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Sercer running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFiles().execute({
            fileContent: table,
            fileName: fileName || `table-${base}`,
            fileDestination,
        });
        if (showTable) console.log(table);
        wasCreated
            ? console.log('File created!')
            : console.log('File not created!');
    }
}
