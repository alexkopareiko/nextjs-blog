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

    public getUserByEmail(email: string) {
        const { UserModel } = this.di;
        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        if (!validateEmail(email)) return Promise.reject('Parameter is not an email!');
        return UserModel.findOne({
            where: { userEmail: email }
        })
    };

    public getUserByToken(token: string) {
        const { UserModel } = this.di;
        if (token.trim() === "") return Promise.reject('Wrong token');
        return UserModel.findOne({
            where: { userToken: token }
        })
    };


}