import Events from 'events';
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/termialController.js";
import EventManager from './src/eventManager.js';

const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);

async function index()
{   
    const componentEmitter = new Events();
    const socketClient = new SocketClient(config);
    const eventManager = new EventManager({ componentEmitter, socketClient });
    const controller = new TerminalController();
    
    const events = eventManager.getEvents();
    
    const data = {
        roomId: config.room,
        userName: config.username
    };
    
    await socketClient.initialize();
    socketClient.attachEvents(events);
    await controller.initializeTable(componentEmitter);
    eventManager.joinRoomAndWaitForMessages(data);
}

index();