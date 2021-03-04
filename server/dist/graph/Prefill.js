"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prefill = void 0;
const TodoItem_1 = require("./TodoItem");
const TodoDataAccess_1 = require("../database/TodoDataAccess");
class Prefill {
    constructor() {
        this.items = new Array();
        this.dataAccess = new TodoDataAccess_1.TodoDataAccess();
    }
    Populate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = yield this.dataAccess.GetAll();
                this.items = new Array();
                schema.forEach(item => {
                    const todoItem = new TodoItem_1.TodoItem();
                    todoItem.Id = item.Id;
                    todoItem.Completed = item.Completed;
                    todoItem.CreationDate = item.CreationDate;
                    todoItem.DueDate = item.DueDate;
                    todoItem.Description = item.Description;
                    todoItem.Title = item.Title;
                    this.items.push(todoItem);
                });
            }
            catch (error) {
                console.log(`Unfortunately, we couldn't retrieve all records ${error}`);
            }
        });
    }
    static get Instance() {
        return this.prefill || (this.prefill = new this());
    }
    get Items() {
        return this.items;
    }
}
exports.Prefill = Prefill;
