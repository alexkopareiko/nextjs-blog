import Layout from '../components/layout'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React from 'react';
import { xRead } from 'src/request';
import { HTTP_METHOD } from "../constants";
import { useDispatch, useSelector } from 'react-redux';


export default function Home() {
    const count = useSelector((state: any) => state.countReducer.count)
    const dispatch = useDispatch()
    // const { data, error, message } = products.response;
    // if (error) return <div>{message}</div>
    return (
        <></>
        // <Layout props={currentUser}>

        //     <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
        //         {
        //             data && data.map(
        //                 (p) =>
        //                 (
        //                     <Link href={"/product/" + p.prodId} key={p.prodId}>
        //                         <a><PropertyCard product={p} /></a>
        //                     </Link>
        //                 )
        //             )
        //         }
        //     </div>
        // </Layout>
    );

}

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

