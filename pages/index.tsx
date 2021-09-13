import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React from 'react';
var cookie = require('cookie-cutter');
import { xRead } from 'src/request';



export default function Home({ data }) {
  console.log(data)
  // let { data, error, message } = response;
  // if (error) return <div>{message}</div>
  // else data = data.data;
  return (
    <Layout>
      {/* <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
        {
          data && data.map(
            (p) =>
            (
              <Link href={"/product/" + p.prodId} key={p.prodId}>
                <a><PropertyCard product={p} /></a>
              </Link>
            )
          )
        }
      </div> */}
    </Layout>
  );

}

Home.getInitialProps = async (ctx) => {

  const cookie = ctx.req ? ctx.req.headers.cookie : null;
  const token = cookie.token;
  const data = await xRead("/product/list", {}, token);
  return {
    data
  }
}

