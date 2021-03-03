import { Mongoose } from "mongoose";

import * as mongoose from "mongoose";
import { Model } from "./Database";

export abstract class DataAccessBase<T extends mongoose.Document> {
    private model: Model;
    constructor(model: Model) {
        this.model = model;
    }

    GetAll(): Promise<T[]> {
        return new Promise<T[]>((response, reject) => {
            this.model.find(
                (err: mongoose.NativeError, result: T[]) => {
                    if (err) reject(err);
                    if (result) response(result);
                }
            );
        });
    }

    Add(item: T): Promise<boolean> {
        return new Promise<boolean>((response, reject) => {
            this.model.create(
                item,
                (
                    err: mongoose.NativeError,
                    doc: mongoose.Document<any>
                ) => {
                    if (err) reject(err);
                    response(!doc);
                }
            );
        });
    }
}
