import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layout'
import wrapper from '../redux-saga/store/store'
import Link from 'next/link'
import PropertyCard from "../components/propertyCard";
import productEntity from 'redux-saga/models/ProductEntity';
import saga from '../redux-saga/decorators/saga'

interface MyProps {
  products,
  identity,
}

@saga(productEntity)
class Index extends React.Component<MyProps> {
  render() {
    
    const { products, identity } = this.props;
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
}


// @ts-ignore
Index.getInitialProps = wrapper.getInitialAppProps(store => () => { 
  const action = productEntity.getOneAction('sagaGetAllProducts');
  store.dispatch(action());
});

const mapStateToProps = (state, props) => {
  const { entities } = state;
  
  return {
    products: entities.get('products'),
    identity: state.identity,
  }
}
const mapDispatchToProps = (dispatch) => {
  // const action = productEntity.getOneAction('sagaGetAllProducts');
  // dispatch(action());
  return {
      
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index)


