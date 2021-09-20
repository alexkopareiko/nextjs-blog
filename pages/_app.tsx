import { END } from 'redux-saga'
import { btnLoginClick } from 'redux-saga/saga/identity';
import { wrapper } from '../redux-saga/store/store'
import '../styles/global.css'


function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    )
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
    // if (store.getState().identity.userId === -1) {
    //     store.dispatch(btnLoginClick({
    //         userEmail: "asdf@asdf.ru",
    //         userPasswd: "123"
    //     }));
    // }


    //   1. Wait for all page actions to dispatch
    const pageProps = {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        namespacesRequired: ['common']
    };

    //   2. Stop the saga if on server
    if (store && ctx.req) {
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }

    // 3. Return props
    return {
        pageProps
    };
});

export default wrapper.withRedux(App)