import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, WrappedFieldProps, InjectedFormProps, FormProps, FormErrors } from 'redux-form';
import Layout from '../../components/layout'


import wrapper, { AppState } from '../../redux-saga/store/store'
import productEntity from 'redux-saga/models/ProductEntity';
import saga from 'redux-saga/decorators/saga';
import { validate, warn } from '../../components/validate/validateAddNewProduct';
import { renderField, selectField } from '../../components/renderFields';
import categoryEntity from 'redux-saga/models/CategoryEntity';


interface MyProps {
    identity, handleSubmit, pristine, reset, submitting, categories
}

@saga([productEntity, categoryEntity])
class AddNew extends React.Component<MyProps & InjectedFormProps & WrappedFieldProps> {

    static validate = values => {
        const errors = {}

        if (!values.title) {
            errors['title'] = 'Required'
        } else if (values.title.length > 30) {
            errors['title'] = 'Must be 30 characters or less'
        }
        else if (values.title.length < 3) {
            errors['title'] = 'Enter more characters'
        }
        if (!values.desc) {
            errors['desc'] = 'Required'
        } else if (values.desc.length > 3000) {
            errors['desc'] = 'Must be 3000 characters or less'
        }
        else if (values.desc.length < 3) {
            errors['desc'] = 'Enter more characters'
        }
        if (!values.category || 'none' === values.category) {
            errors['category'] = 'Required'
        }
        if (!values.price) {
            errors['price'] = 'Required'
        }
        if (!values.year) {
            errors['year'] = 'Required'
        }
        return errors
    };
    // static warn = values => {
    //     const warnings = {}
    //     if (values.age < 19) {
    //         warnings['age'] = 'Hmm, you seem a bit young...'
    //     }
    //     return warnings
    // }
    render() {
        const { identity, handleSubmit, pristine, reset, submitting, categories } = this.props;

        return (
            <Layout props={identity}>
                <div className=" w-full">
                    <h1 className="text-xl text-center">Add new product</h1>
                    <form onSubmit={handleSubmit} className="flex flex-wrap justify-between w-full m-auto max-w-lg">
                        <Field name="title" type="text" component={renderField} label="title" width="w-full"/>
                        <Field name="desc" type="text" component={renderField} label="description" width="w-full"/>
                        <Field name="category" label="category" options={categories} component={selectField} idField="catId" nameField="catName"/>
                        <div className="w-full"></div>
                        <Field name="price" type="number" component={renderField} label="price" width="w-5/12"/>
                        <Field name="year" type="number" component={renderField} label="year" width="w-5/12"/>
                        <div className="w-full"></div>
                        <div>
                            <button type="submit" disabled={submitting} className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded">
                                Submit
                            </button>
                            <button type="button" disabled={pristine || submitting} onClick={reset} className="flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-indigo-800 text-sm py-1 px-2 rounded">
                                Clear Values
                            </button>
                        </div>
                    </form>
                </div>

            </Layout>
        )
    }
}

// @ts-ignore
AddNew.getInitialProps = wrapper.getInitialAppProps(store => (ctx: any) => {
    const action = categoryEntity.getOneAction('sagaGetAllCategories');
    store.dispatch(action());
    return {

    }
});

const mapStateToProps = (state, props) => {
    const { entities } = state;

    return {
        identity: state.identity,
        categories: entities.get('categories')
    }
}

const con = connect(mapStateToProps)(AddNew)

export default reduxForm({
    form: 'addNewProduct',
    validate: AddNew.validate,
    // warn: AddNew.warn,
})(con);