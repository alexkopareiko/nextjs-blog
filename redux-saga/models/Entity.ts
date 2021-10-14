import { call, put, take } from 'redux-saga/effects';
import { normalize, schema } from "normalizr";
import { HTTP_METHOD } from "../../constants";
import { action, setAllDataAC } from '../store/actions';
import { commons } from '../../constants';
import { camelizeKeys } from 'humps';

export default class Entity {
  private schema = null;
  private entityName: string;
  public static actions: any = [];
  private className;

  constructor(name: string = null, definition: any = {}, options: any = {}) {
    if (name !== null) this.schema = new schema.Entity(name, definition, options);
    this.entityName = name;
    this.className = this.constructor.name;
    this.xFetch = this.xFetch.bind(this);
    this.actionRequest = this.actionRequest.bind(this);
    this.xRead = this.xRead.bind(this);
    this.xSave = this.xSave.bind(this);

    Entity.addAction = Entity.addAction.bind(this);
    Entity.getActions = Entity.getActions.bind(this);

    //this.initAction();
  }

  public getSchema() {
    return this.schema;
  }
  public getEntityName() {
    return this.entityName;
  }

  private initAction() {
    const propertyNames = Object.getOwnPropertyNames(this.constructor.prototype);
    const sagas = propertyNames.filter(e => e.startsWith('saga'));

    const obj = {};
    sagas.forEach(e => {
      this[e] = this[e].bind(this);
      obj[e] = {
        'action': function (data = {}) {
          return action(e, data);
        },
        'saga': this[e]
      };
    });
    Entity.actions[this.className] = obj;
  }


  private xFetch = (endpoint: string, method: HTTP_METHOD, data = {}, token?: string) => {
    let fullUrl = commons.baseUrl + '/api' + endpoint;
    const params: any = {
      method,
      credentials: 'include',
      headers: {
        Authorization: 'bearer ' + token, // get token from cookies
      },
    };

    if (method !== HTTP_METHOD.GET) {
      params['headers']['content-type'] = 'application/json';
      params['body'] = JSON.stringify(data);

    } else {
      const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
      fullUrl += (opts.length > 0 ? '?' + opts : '');
    }

    return fetch(fullUrl, params)
      .then((response) => {
        return response.json().then((json) => ({ json, response }));
      })
      .then(({ json, response }) =>
        Promise.resolve({
          success: response.ok ? true : false,
          response: json
        })
      );
  }

  protected static addAction(saga) {
    Entity.actions.push(saga);
  }

  public static getActions() {
    return Entity.actions;
  }

  public getOneAction(action, data) { //need to finish
    return Entity.actions;
  }

  public * actionRequest(endpoint?: string, method?: HTTP_METHOD, data?: any, token?: string) {
    const result = yield call(this.xFetch, endpoint, method, data, token)
    const schema = (Array.isArray(result.response.data) ? [this.schema] : this.schema)
    if (result.success === true && result.response.error === false && this.schema ) {
      const normalizedData = normalize(camelizeKeys(result.response.data), schema);
      return yield put(setAllDataAC(this.getEntityName(), normalizedData))
    }
    return result;
  }

  public xSave(point: string, data: any = {}, token?: string) {
    return this.actionRequest(point, HTTP_METHOD.POST, data, token);
  }

  public xRead(point: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET, token?: string) {
    return this.actionRequest(point, method, data, token);
  }

  public xDelete(point: string, data: any = {}) {
    return this.actionRequest(point, HTTP_METHOD.DELETE, data);
  }
}