import Layout, { siteTitle } from '../components/layout'

import PropertyCard from "../components/propertyCard";
import React from 'react';

export default function Home({ data }) {
  console.log(data)
  return (
    <Layout>
      {
        data && data.map((p) =>
          <PropertyCard product={p} key={p.prodId} />
        )
      }
    </Layout>
  );

}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/products/list");
  const data = await res.json();
  return {
    data,
  }
}

