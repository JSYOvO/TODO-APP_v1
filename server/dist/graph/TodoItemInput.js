"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemInput = void 0;
const type_graphql_1 = require("type-graphql");
let TodoItemInput = class TodoItemInput {
    constructor() {
        this.Title = "";
        this.Description = "";
        this.Completed = false;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TodoItemInput.prototype, "Id", void 0);
__decorate([
    type_graphql_1.Field({ description: "The item title" }),
    __metadata("design:type", String)
], TodoItemInput.prototype, "Title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true, description: "The item description" }),
    __metadata("design:type", String)
], TodoItemInput.prototype, "Description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true, description: "The item due date" }),
    __metadata("design:type", Date)
], TodoItemInput.prototype, "DueDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], TodoItemInput.prototype, "CreationDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], TodoItemInput.prototype, "Completed", void 0);
TodoItemInput = __decorate([
    type_graphql_1.InputType()
], TodoItemInput);
exports.TodoItemInput = TodoItemInput;
