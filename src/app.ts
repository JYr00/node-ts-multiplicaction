
import { argv } from "./config/plugins/index";
import { SercerApp } from "./presentation/server-app";
 
(async () => {
    await main();
})();

async function main() {
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = argv;
    SercerApp.run({base, limit, showTable, fileName, fileDestination});
    
}