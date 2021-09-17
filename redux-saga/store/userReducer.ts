import { commons } from '../../constants';
import { SET_USER_INFO } from 'redux-saga/saga/identity';

const initialState = {
    userId: '',
    userEmail: '',
    userRole: '',
    userPhone: '',
    userFirstName: '',
    userLastName: '',
    userImg: commons.imgDummy,
    userToken: '',
    error: false,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                ...action.identity,
                userToken: action.token
            }
        }

        default:
            return state
    }
}

export default userReducer;
