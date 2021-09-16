import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    userId: '',
    userEmail: '',
    userRole: '',
    userPhone: '',
    userFirstName: '',
    userLastName: '',
    userImg: '',
    userToken: '',
    error: false,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_USER_INFO: {
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state
    }
}

export default userReducer;
