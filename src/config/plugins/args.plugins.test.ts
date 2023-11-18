const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugins');
    return yarg;
};

describe('Test args.plugins.ts', () => {
    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });
    it('should return default values', async () => {
        const yarg = await runCommand(['-b', '5']);
        expect(yarg).toEqual(
            expect.objectContaining({
                b: 5,
                l: 10,
                s: false,
                n: 'table',
                d: 'outputs',
            }),
        );
    });
    it('should return configuration with custom values', async () => {
        const yarg = await runCommand([
            '-b',
            '5',
            '-l',
            '20',
            '-s',
            '-n',
            'custom-name',
            '-d',
            'custom-dir',
        ]);
        expect(yarg).toEqual(
            expect.objectContaining({
                b: 5,
                l: 20,
                s: true,
                n: 'custom-name',
                d: 'custom-dir',
            }),
        );
    });
});
