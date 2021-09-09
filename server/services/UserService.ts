import BaseContext from '../BaseContext'

export default class UserService extends BaseContext {
    public getAllUsers() {
        const { UserModel } = this.di;
        return UserModel.findAll({})
    }

    public getUserById(id: number) {
        const { UserModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return UserModel.findByPk(id)
    }
}