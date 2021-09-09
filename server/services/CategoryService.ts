import BaseContext from '../BaseContext'

export default class CategoryService extends BaseContext {
    public getAllCategories() {
        const { CategoryModel } = this.di;
        return CategoryModel.findAll({})
    }

    public getCategoryById(id: number) {
        const { CategoryModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return CategoryModel.findByPk(id)
    }
}