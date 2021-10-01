import Layout from '../components/layout'
import wrapper from '../redux-saga/store/store'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import React from 'react';
import { getAllProducts } from 'redux-saga/models/ProductEntity';
import { connect } from 'react-redux';

function Index(props) {
  const { products, identity } = props;
  return (
    <Layout props={identity}>
      {
        !products || products.size <= 0 ?
          <div className="my-10 flex justify-center text-red-500 font-bold">
            <h1>There are no any products...</h1>
          </div>
          :
          <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">
            {
              products && products.valueSeq().map((p) => {
                return (
                  <Link href={"/product/" + p.get('prodId')} key={p.get('prodId')}>
                    <a><PropertyCard product={p} /></a>
                  </Link>
                )
              })
            }
          </div>
      }
    </Layout>
  );
}

// @ts-ignore
Index.getInitialProps = wrapper.getInitialAppProps(store => () => {
  store.dispatch(getAllProducts());
});

const mapStateToProps = (state) => {
  const { entities } = state;

  return {
    products: entities.get('products'),
    identity: state.identity,
  }
}

export default connect(mapStateToProps)(Index)


