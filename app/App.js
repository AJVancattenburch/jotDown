import { NotesController } from "./Controllers/NotesController.js";
import { UserController } from "./Controllers/UserController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();

  notesController = new NotesController();

  userController = new UserController();
}

window["app"] = new App();