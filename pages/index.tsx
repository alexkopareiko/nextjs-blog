import Layout from '../components/layout'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React from 'react';
import { xRead } from 'src/request';


export default function Home({ result }) {
  const { data, error, message } = result.response;
  if (error) return <div>{message}</div>
  return (
    <Layout>
      <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
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
      </div>
    </Layout>
  );

}

Home.getInitialProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie || "" : document.cookie;
  const token = cookie.token;
  const result = await xRead("/product/list", {}, token);
  return {
    result
  }
}

