import Layout from '../components/layout'
import { wrapper } from '../redux-saga/store/store'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInfo } from 'redux-saga/store/actions';


export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productReducer.products);
  const userReducer = useSelector((state: any) => state.userReducer);

  // useEffect(() => {
  //   console.log('Products amount', products.length);
  //   dispatch(getProductsInfo());
  // }, []);


  return (

    <Layout props={userReducer}>
      {
        products.length <= 0 ?
          <div className="my-10 flex justify-center text-red-500 font-bold">
            <h1>There are not any products...</h1>
          </div>
          :
          <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
            {
              products && products.map(
                (p) =>
                (
                  <Link href={"/product/" + p.prodId} key={p.prodId}>
                    <a><PropertyCard product={p} /></a>
                  </Link>
                )
              )
            }
          </div>
      }

    </Layout>
  );

}
// @ts-ignore
Home.getInitialProps = wrapper.getInitialAppProps(store => () => {

  store.dispatch(getProductsInfo());

});


// Home.getInitialProps = async (ctx) => {
//     const isServer = typeof window === 'undefined';
//     const cookie = isServer ? ctx.req.headers.cookie : document.cookie;

//     const getCookie = (name) => {
//         var match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//         if (match) return match[2];
//     }

//     if (cookie !== undefined) {
//         const token = getCookie('token');
//         const products = await xRead("/product/list", {}, HTTP_METHOD.GET, token);
//         const currentUser = await xRead("/user/by_token", {}, HTTP_METHOD.GET, token);
//         return {
//             products,
//             currentUser
//         }
//     } else {
//         const products = await xRead("/product/list", {}, HTTP_METHOD.GET);
//         return {
//             products,
//             currentUser: null
//         }
//     }
// }

