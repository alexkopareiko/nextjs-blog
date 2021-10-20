import { LOGOUT, SET_USER_INFO } from 'redux-saga/models/IdentityEntity';
import { commons, IIdentity } from '../../constants';

const initialState: IIdentity = {
    userId: -1,
    userEmail: '',
    userRole: '',
    userPhone: '',
    userFirstName: '',
    userLastName: '',
    userImg: commons.imgDummy,
    userToken: '',
}

function identity(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                ...action.identity,
                userToken: action.token
            }
        }
        case LOGOUT: {
            return {
                ...initialState
            }
        }

        default:
            return state
    }
}

export default identity;
