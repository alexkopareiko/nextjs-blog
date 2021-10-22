import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, WrappedFieldProps, InjectedFormProps, FormProps, FormErrors } from 'redux-form';
import Layout from '../../components/layout'
import Link from 'next/link'

import wrapper, { AppState } from '../../redux-saga/store/store'
import productEntity from 'redux-saga/models/ProductEntity';
import saga from 'redux-saga/decorators/saga';
import { validate, warn } from '../../components/validate/validateAddNewProduct';
import { renderField } from '../../components/renderFields';


interface MyProps {
    identity, handleSubmit, pristine, reset, submitting
}

@saga(productEntity)
class AddNew extends React.Component<MyProps & InjectedFormProps & WrappedFieldProps> {

    static validate = values => {
        const errors = {}
        if (!values.username) {
            errors['username'] = 'Required'
        } else if (values.username.length > 15) {
            errors['username'] = 'Must be 15 characters or less'
        }
        if (!values.email) {
            errors['email'] = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors['email'] = 'Invalid email address'
        }
        if (!values.age) {
            errors['age'] = 'Required'
        } else if (isNaN(Number(values.age))) {
            errors['age'] = 'Must be a number'
        } else if (Number(values.age) < 18) {
            errors['age'] = 'Sorry, you must be at least 18 years old'
        }
        return errors
    };
    static warn = values => {
        const warnings = {}
        if (values.age < 19) {
            warnings['age'] = 'Hmm, you seem a bit young...'
        }
        return warnings
    }
    render() {
        const { identity, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Layout props={identity}>
                <div className="flex items-center w-full">
                    <h1 className="">Add new product</h1>
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <Field name="title" type="text" component={renderField} label="title" />
                        <Field name="desc" type="text" component={renderField} label="description" />
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
    return {

    }
});

const mapStateToProps = (state, props) => {
    return {
        identity: state.identity,
    }
}

const con = connect(mapStateToProps)(AddNew)

export default reduxForm({
    form: 'addNewProduct',
    validate: AddNew.validate,
    warn: AddNew.warn,
})(con);