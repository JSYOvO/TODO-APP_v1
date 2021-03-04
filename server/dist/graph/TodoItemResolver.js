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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.TodoItemResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("type-graphql");
const TodoItem_1 = require("./TodoItem");
const TodoItemInput_1 = require("./TodoItemInput");
const Prefill_1 = require("./Prefill");
const TodoDataAccess_1 = require("../database/TodoDataAccess");
let TodoItemResolver = class TodoItemResolver {
    constructor() {
        this.milliSecondsPerDay = 1000 * 60 * 60 * 24;
        this.dataAccess = new TodoDataAccess_1.TodoDataAccess();
    }
    TodoItem(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prefill_1.Prefill.Instance.Items.find((todoItem) => todoItem.Title === title);
        });
    }
    TodoItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prefill_1.Prefill.Instance.Items;
        });
    }
    Add(todoItemInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoItem = {
                Id: todoItemInput.Id,
                CreationDate: todoItemInput.CreationDate,
                DueDate: todoItemInput.DueDate,
                Description: todoItemInput.Description,
                Title: todoItemInput.Title,
                Completed: todoItemInput.Completed,
            };
            todoItem.Completed = false;
            yield Prefill_1.Prefill.Instance.Items.push(todoItem);
            yield this.dataAccess.Add(this.CreateTodoSchema(todoItem));
            return todoItem;
        });
    }
    CreateTodoSchema(todoItem) {
        return {
            Id: todoItem.Id,
            CreationDate: todoItem.CreationDate,
            DueDate: todoItem.DueDate,
            Description: todoItem.Description,
            Title: todoItem.Title,
            Completed: todoItem.Completed,
        };
    }
    Update(todoItemInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Prefill_1.Prefill.Instance.Items.find((x) => x.Id === todoItemInput.Id);
            if (!item)
                return false;
            item.Title = todoItemInput.Title;
            item.Description = todoItemInput.Description;
            item.DueDate = todoItemInput.DueDate;
            yield this.dataAccess.Update(item.Id, this.CreateTodoSchema(item));
            return true;
        });
    }
    Complete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Prefill_1.Prefill.Instance.Items.find((x) => x.Id === id);
            if (!item)
                return false;
            item.Completed = true;
            yield this.dataAccess.Update(item.Id, this.CreateTodoSchema(item));
            return true;
        });
    }
    Remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = Prefill_1.Prefill.Instance.Items.findIndex((x) => x.Id === id);
            if (index < 0) {
                return false;
            }
            Prefill_1.Prefill.Instance.Items.splice(index, 1);
            yield this.dataAccess.Remove(id);
            return true;
        });
    }
    OverdueTodoItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const localCollection = new Array();
            const testDate = new Date();
            yield Prefill_1.Prefill.Instance.Items.forEach((x) => {
                if (x.DueDate && x.DueDate < testDate && !x.Completed) {
                    localCollection.push(x);
                }
            });
            return localCollection;
        });
    }
    DaysCreated(TodoItem) {
        const value = this.GetDateDifference([
            new Date(),
            TodoItem.CreationDate,
        ]);
        if (value === 0) {
            return 0;
        }
        return Math.round(value / this.milliSecondsPerDay);
    }
    GetDateDifference(args) {
        return Math.round(args[0].valueOf() - args[1].valueOf());
    }
};
__decorate([
    type_graphql_1.Query(() => TodoItem_1.TodoItem, { nullable: true }),
    __param(0, type_graphql_1.Arg("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "TodoItem", null);
__decorate([
    type_graphql_1.Query(() => [TodoItem_1.TodoItem], { description: "Get all the TodoItems" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "TodoItems", null);
__decorate([
    type_graphql_1.Mutation(() => TodoItem_1.TodoItem),
    __param(0, type_graphql_1.Arg("TodoItem")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoItemInput_1.TodoItemInput]),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "Add", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("TodoItem")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoItemInput_1.TodoItemInput]),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "Update", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("Id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "Complete", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("Id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "Remove", null);
__decorate([
    type_graphql_1.Query(() => [TodoItem_1.TodoItem], {
        description: "Get items past their due date",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoItemResolver.prototype, "OverdueTodoItems", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoItem_1.TodoItem]),
    __metadata("design:returntype", Number)
], TodoItemResolver.prototype, "DaysCreated", null);
TodoItemResolver = __decorate([
    type_graphql_2.Resolver(() => TodoItem_1.TodoItem)
], TodoItemResolver);
exports.TodoItemResolver = TodoItemResolver;
