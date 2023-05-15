import { appState } from "../AppState.js"

class UserService {
    enterUserName(input) {
        appState.userName = input
        appState.emit('notes', input)
        console.log('appstate user', appState.userName);
    }

    logOut() {
        location.reload(true)
        console.log("user logged out") 
    }
    

}

export const userService = new UserService()