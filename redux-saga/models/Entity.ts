import { LOGOUT } from './IdentityEntity';
import { call, put, select, take } from 'redux-saga/effects';
import { normalize, schema } from "normalizr";
import { HTTP_METHOD } from "../../constants";
import { action, setAllDataAC, setSSRInfo } from '../store/actions';
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
    this.normalize = this.normalize.bind(this);

    Entity.addAction = Entity.addAction.bind(this);

    //this.initAction();
  }

  public getSchema() {
    return this.schema;
  }
  public getEntityName() {
    return this.entityName;
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

  public getOneAction(action) {
    return Entity.actions[this.className][action].decoratorFunction;
  }

  public * actionRequest(endpoint?: string, method?: HTTP_METHOD, data?: any, token?: string) {
    let ssrData = yield select((state) => state.ssrData);
    if (ssrData && Object.keys(ssrData).length !== 0) {
      for (const [key, value] of Object.entries(ssrData)) {
        yield call(this.normalize, value);
      }
      yield put(setSSRInfo({}));
    } else {
      const result = yield call(this.xFetch, endpoint, method, data, token);
      if (result.success === true && result.response.error === false && this.schema) { 
        yield call(this.normalize, result.response.data); 
      }
      else { return result; }
    }
  }

  public *normalize(dataNew) {
    const schema = (Array.isArray(dataNew) ? [this.schema] : this.schema)
    if (this.schema) {
      const normalizedData = normalize(camelizeKeys(JSON.parse(JSON.stringify(dataNew))), schema);
      return yield put(setAllDataAC(this.getEntityName(), normalizedData))
    }
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