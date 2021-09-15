import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import { wrapper } from '../store'
import { loadData, startClock, tickClock } from '../actions'
import Home from './home'
import Page from 'components/page';


const Index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])
  return (
    // <Home />
    <Page />
  );

}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  store.dispatch(tickClock(false))

  if (!store.getState().placeholderData) {
    store.dispatch(loadData())
    store.dispatch(END)
  }

  await store.sagaTask.toPromise()
})

export default Index;