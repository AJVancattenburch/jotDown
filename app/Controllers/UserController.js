import { userService } from '../Services/UserService.js';
import { Pop } from '../Utils/Pop.js'

export class UserController {
    constructor() {
        console.log('hello from the user controller');
    }

    async enterUserName() {
        // console.log('logging in');
        // NOTE we could also do window.prompt....but Pop is prettier :))
        let input = await Pop.prompt("Enter your name!")
        // console.log(input, 'user input');
        if (!input) return
        userService.enterUserName(input)
    }

    async logOut() {
      await Pop.confirm("Are you sure?")
      userService.logOut()
    }

}