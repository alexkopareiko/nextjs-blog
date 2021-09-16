import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import { btnLoginClick } from 'redux-saga/store/actions'
import { wrapper } from '../redux-saga/store/store'
import Home from './home'


const Index = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Home />
    </>

  );

}

// @ts-ignore
// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   store.dispatch(btnLoginClick({
//     userEmail: "asdf@asdf.ru",
//     userPasswd: "123"
//   }));

//   await store.sagaTask.toPromise()
// })


export default Index;