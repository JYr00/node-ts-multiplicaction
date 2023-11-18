import { SaveFiles } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'any_content',
        fileName: 'any_file_name',
        fileDestination: 'outputstest',
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    afterEach(() => {
        const existFile = fs.existsSync(options.fileDestination);
        if (existFile) fs.rmSync(options.fileDestination, { recursive: true });
    });

    it('should save file with default values', () => {
        const saveFile = new SaveFiles();
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    it('should retur false if directory could not be created', () => {
        const saveFile = new SaveFiles();
        const mkdirSpy = jest
            .spyOn(fs, 'mkdirSync')
            .mockImplementationOnce(() => {
                throw new Error('this is a custom error message for testing');
            });
        const result = saveFile.execute(options);
        expect(result).toBeFalsy();
        mkdirSpy.mockRestore();
    });
});
