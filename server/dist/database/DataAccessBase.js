"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccessBase = void 0;
class DataAccessBase {
    constructor(model) {
        this.model = model;
    }
    GetAll() {
        return new Promise((callback, error) => {
            this.model.find((err, result) => {
                if (err) {
                    error(err);
                }
                if (result) {
                    callback(result);
                }
            });
        });
    }
    Add(item) {
        return new Promise((callback, error) => {
            this.model.create(item, (err, result) => {
                if (err) {
                    error(err);
                }
                callback(!result);
            });
        });
    }
    Get(id) {
        return new Promise((callback, error) => {
            this.model.find({ Id: id }, (err, result) => {
                if (err) {
                    error(err);
                }
                callback(result);
            });
        });
    }
    Remove(id) {
        return new Promise((callback, error) => {
            this.model.deleteOne({ Id: id }, undefined, (err) => {
                if (err) {
                    error(err);
                }
                callback();
            });
        });
    }
    Update(id, item) {
        return new Promise((callback, error) => {
            this.model.updateOne({ Id: id }, item, undefined, (err) => {
                if (err) {
                    error(err);
                }
                callback(true);
            });
        });
    }
}
exports.DataAccessBase = DataAccessBase;
