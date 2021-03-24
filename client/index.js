import Events from 'events';
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/termialController.js";

const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);

async function index()
{   
    const componentEmitter = new Events();
    
    const controller = new TerminalController();
    await controller.initializeTable(componentEmitter);
}

index();