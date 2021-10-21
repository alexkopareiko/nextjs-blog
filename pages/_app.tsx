import 'tailwindcss/tailwind.css'
import "../styles/global.css";
import React from 'react'
import wrapper from '../redux-saga/store/store';
import { END } from 'redux-saga';
import { setUserInfo } from 'redux-saga/models/IdentityEntity';
import { setSSRInfo } from 'redux-saga/store/actions';



function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  if (ctx.req && ctx.req.hasOwnProperty('ssrData')) {
    const ssrData = ctx.req['ssrData'];
    store.dispatch(setSSRInfo(ssrData));
  }

  if (ctx.req && ctx.req.hasOwnProperty('identity')) {
    const identity = JSON.parse(JSON.stringify(ctx.req['identity']));
    store.dispatch(setUserInfo(identity, identity['userToken']))
  }

  (store).runTriggerSaga()
  //   1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    namespacesRequired: ['common'],
  };

  //   2. Stop the saga if on server
  if (store && ctx.req) {
    store.dispatch(END);
    await (store).sagaTask.toPromise();
  }

  // 3. Return props
  return {
    pageProps,
  };
});

export default wrapper.withRedux(App);