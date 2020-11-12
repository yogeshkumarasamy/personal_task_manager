import { Model } from "./mvc/model.js";
import { View } from "./mvc/view.js";
import { Controller } from "./mvc/controller.js";


const app = new Controller(new Model(), new View());