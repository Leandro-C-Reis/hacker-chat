
export default class Controller {
    #users = new Map();

    constructor({ socketServer }) {
        this.socketServer = socketServer;
    }

    onNewConnection(socket) {
        const { id  } = socket;
        console.log('Connection stablished with', id);
        
        const userData = { id, socket };
        this.#updateGlobalUserData(id, userData);

        socket.on('data', this.#onSocketdata(id));
        socket.on('error', this.#onSocketClosed(id));
        socket.on('end', this.#onSocketClosed(id));
    }

    #onSocketdata = (id) => {
        return data => {
            console.log('data', data.toString());  
        }
    }

    #onSocketClosed = (id) => {
        return data => {
            console.log('data', data.toString());

        }
    }

    #updateGlobalUserData = (socketId, userData) => {
        const users = this.#users;
        const user = users.get(socketId) ? users.get(socketId) : {};

        const updatedUserData = {
            ...user,
            ...userData
        };

        users.set(socketId, updatedUserData);

        return users.get(socketId);
    }
 }