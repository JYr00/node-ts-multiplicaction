import { ServerApp } from "./presentation/server-app";

describe('Test app.ts', () => {

    it('should call Server.run with values', async () => { 
        const serverRunSpy = jest.fn();

        ServerApp.run = serverRunSpy;
        process.argv = [
            'node',
            'app',
            '-b','5',
            '-l','10',
            '-s',
            '-n','table',
            '-d','outputs',
        ];

        await import('./app');

        expect(serverRunSpy).toHaveBeenCalledTimes(1);
        expect(serverRunSpy).toHaveBeenCalledWith({
            base: 5,
            limit: 10,
            showTable: true,
            fileName: 'table',
            fileDestination: 'outputs',
        });

    });

});