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
exports.TodoItem = void 0;
const type_graphql_1 = require("type-graphql");
let TodoItem = class TodoItem {
    constructor() {
        this.Id = "";
        this.Completed = false;
    }
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], TodoItem.prototype, "Id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], TodoItem.prototype, "Title", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The due date for the item",
    }),
    __metadata("design:type", Date)
], TodoItem.prototype, "DueDate", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The date the item was created",
    }),
    __metadata("design:type", Date)
], TodoItem.prototype, "CreationDate", void 0);
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.Int),
    __metadata("design:type", Number)
], TodoItem.prototype, "DaysCreated", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "Completed", void 0);
TodoItem = __decorate([
    type_graphql_1.ObjectType({ description: "A single to do" }),
    __metadata("design:paramtypes", [])
], TodoItem);
exports.TodoItem = TodoItem;
