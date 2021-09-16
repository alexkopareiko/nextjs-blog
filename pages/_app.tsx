import { useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import { btnLoginClick } from 'redux-saga/store/actions'
import { wrapper } from '../redux-saga/store/store'
import '../styles/global.css'


function App({ Component, pageProps }) {
    const dispatch = useDispatch()
    dispatch(btnLoginClick({
        userEmail: "asdf@asdf.ru",
        userPasswd: "123"
    }));
    return (
        <Component {...pageProps} />
    )
}

// @ts-ignore
// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//     store.dispatch(btnLoginClick({
//         userEmail: "asdf@asdf.ru",
//         userPasswd: "123"
//     }));

//     await store.sagaTask.toPromise()
// })


export default wrapper.withRedux(App)