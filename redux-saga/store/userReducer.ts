import { commons } from 'components/common';
import { actionTypes } from './actions'

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
        case actionTypes.SET_USER_INFO: {
            return {
                ...state,
                ...action.payload,
                userToken: action.token
            }
        }

        default:
            return state
    }
}

export default userReducer;
