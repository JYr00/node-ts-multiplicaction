import { option } from 'yargs';
import { CreateTable } from '../domain/use-case/create-table.use-case';
import { SaveFiles } from '../domain/use-case/save-file.use-case';
import { ServerApp } from './server-app';

describe('Test server-app.ts', () => {
    const options = {
        base: 5,
        limit: 20,
        showTable: false,
        fileDestination: 'test-outputs',
        fileName: 'test-table',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    it('should run ServerApp with options', () => {
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFilesSpy = jest.spyOn(SaveFiles.prototype, 'execute');
        // ServerApp.run(options);
        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({
        //     base: options.base,
        //     limit: options.limit,
        // });
        // expect(saveFilesSpy).toHaveBeenCalledTimes(1);
    });

    it('shoulr run with custome values mocked', () => {
        const createTableMock = jest.fn().mockReturnValue('5 x 5 = 25');
        const saveFilesMock = jest.fn().mockReturnValue(true);

        CreateTable.prototype.execute = createTableMock;
        SaveFiles.prototype.execute = saveFilesMock;

        ServerApp.run(options);

        expect(createTableMock).toHaveBeenCalledTimes(1);
        expect(createTableMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });
        expect(saveFilesMock).toHaveBeenCalledTimes(1);
        expect(saveFilesMock).toHaveBeenCalledWith({
            fileContent: '5 x 5 = 25',
            fileName: options.fileName,
            fileDestination: options.fileDestination,
        });
    });
});
