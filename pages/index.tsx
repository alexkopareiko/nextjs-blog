import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React from 'react';

export default function Home({ data, error, message }) {
  if (error) return <div>{message}</div>
  else data = data.data;
  return (
    <div>\_(--)_/</div>
    // <Layout>
    //   <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
    //     {
    //       data && data.map(
    //         (p) =>
    //         (
    //           <Link href={"/product/" + p.prodId} key={p.prodId}>
    //             <a><PropertyCard product={p} /></a>
    //           </Link>
    //         )
    //       )
    //     }
    //   </div>
    // </Layout>
  );

}

Home.getInitialProps = async (ctx) => {
  // const res = await fetch("http://localhost:3000/api/product/list");
  // const data = await res.json();
  // return {
  //   data,
  // }
  return {
    data: 123
  }
}

