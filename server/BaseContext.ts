import { IContextContainer } from "./container";

import { IIdentity } from "../constants";

declare global {
    namespace Express {
        interface Response {
            answer: (data: any, message?: any, status?: number) => void;
            print: (path: string, param?: any, ssrData?: any) => void;
        }
        interface Request {
            identity: IIdentity;
            ssrData: any;
        }
    }
}

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