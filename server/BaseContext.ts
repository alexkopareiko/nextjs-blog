import { IContextContainer } from "./container";

// import { ResCode, IIdentity } from "../src/constants";

// declare global {
//     namespace Express {
//         interface Response {
//             answer: (data: any, message?: any, status?: number, code?: ResCode) => void;
//         }
//         interface Request {
//             identity: IIdentity;
//         }
//     }
// }

export default class BaseContext {
    [x: string]: any;
    protected di: IContextContainer;
    private static stopInit: boolean = false;

    constructor(opts: IContextContainer) {
        this.di = opts
        if (!BaseContext.stopInit) {
            opts.initModels();
            BaseContext.stopInit = true;
        }
    }
}