import { commons, IIdentity } from '../../constants';
import { SET_USER_INFO } from 'redux-saga/saga/identity';



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

        default:
            return state
    }
}

export default identity;
