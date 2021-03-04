"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDataAccess = void 0;
const Schema_1 = require("./Schema");
const DataAccessBase_1 = require("./DataAccessBase");
class TodoDataAccess extends DataAccessBase_1.DataAccessBase {
    constructor() {
        super(Schema_1.TodoModel);
    }
}
exports.TodoDataAccess = TodoDataAccess;
