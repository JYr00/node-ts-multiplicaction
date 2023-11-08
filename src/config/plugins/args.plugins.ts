import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplicador de la tabla base',
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplicador limite de la tabla base',
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla en consola',
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'table',
        describe: 'Nombre del archivo',
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'Ruta de destino del archivo',
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw new Error('La base tiene que ser un número');
        }
        if (isNaN(argv.l)) {
            throw new Error('El limite tiene que ser un número');
        }
        return true;
    })
    .parseSync();
