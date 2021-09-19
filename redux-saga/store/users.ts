import { IIdentity } from '../../constants';
import { SET_USERS } from 'redux-saga/saga/users';

interface IUsersState {
    items: Array<IIdentity>
}

const initialState: IUsersState = {
    items: []
};

function users(state = initialState, action) {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                items: action.users
            }
        }
        default:
            return state
    }
}

export default users;
