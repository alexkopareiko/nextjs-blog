import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import { wrapper } from '../redux-saga/store/store'
import { loadData } from '../redux-saga/store/actions'
import Home from './home'
import Page from 'components/page';


const Index = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Page />
      {/* <Home /> */}
    </>

  );

}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {

  if (!store.getState().placeholderData) {
    store.dispatch(loadData())
    store.dispatch(END)
  }

  await store.sagaTask.toPromise()
})

export default Index;