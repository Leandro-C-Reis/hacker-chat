import Events from 'events';
import TerminalController from "./src/termialController.js";

async function index()
{   
    const componentEmitter = new Events();
    
    const controller = new TerminalController();
    await controller.initializeTable(componentEmitter);
}

index();