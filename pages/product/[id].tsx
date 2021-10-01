import { connect } from 'react-redux';

import Layout from '../../components/layout'
import Link from 'next/link'
import ReviewCard from 'components/reviewCard'

import { getProductById, } from 'redux-saga/models/ProductEntity';
import wrapper from '../../redux-saga/store/store'

function Product(props) {
    const identity = props.identity;
    const product = props.product;
    const userOwner = props.userOwner;
    const reviewsForProd = props.reviewsForProd;

    return (
        <Layout props={identity}>
            <Link href={"/"} >
                <a className="fixed z-10"><span className="px-3 py-2 bg-indigo-300 rounded-xl mx-3 hover:bg-indigo-200">Back</span></a>
            </Link>
            {
                product ?
                    <article>

                        <h1 className="text-gray-900 text-2xl px-3 mt-3">{product.get('prodTitle')}</h1>
                        <div className="flex shadow-md relative flex-col">
                            <div className="pt-5">
                                <img src={product.get('prodImg')} className="inset-0 w-full" />
                            </div>
                            <p className="text-2xl px-3 mt-3">Description:</p>
                            <p className="px-3 mt-1">
                                {product.get('prodDesc')}
                            </p>
                            <p className="text-2xl px-3 mt-3">Characteristics:</p>

                            <div className="mt-1">
                                <table className="table-fixed w-full ">
                                    <thead >
                                        <tr className="bg-gray-200">
                                            <th className="w-1/2"></th>
                                            <th className="w-1/2"></th>

                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {/* <tr className="px-3 text-center">
                                            <td className="px-3">Category</td>
                                            <td className="px-3">{product.category.catName}</td>

                                        </tr> */}

                                        <tr className="bg-gray-300 text-center ">
                                            <td className="py-1 px-3">Price</td>
                                            <td className=" py-1px-3">$&nbsp;{product.get('prodPrice')}</td>
                                        </tr>
                                        <tr className="text-center">
                                            <td className="py-1 px-3">Year</td>
                                            <td className="py-1px-3">{product.get('prodYear')}</td>
                                        </tr>
                                        {/* <tr className="bg-gray-300 text-center">
                                            <td className="py-1">Rating</td>
                                            <td className="py-1">{product.rating}</td>
                                        </tr> */}
                                        <tr className="text-center">
                                            <td className="py-1">Reviews</td>
                                            <td className="py-1">{reviewsForProd.size}</td>
                                        </tr>
                                        {
                                            userOwner ?
                                                <tr className="bg-gray-300">
                                                    <td className="px-3 py-1 text-center">Seller</td>
                                                    <td className="px-3 py-2 flex flex-col items-center">
                                                        <img src={userOwner.get('userImg')} alt="" className="rounded w-10 h-10" />
                                                        <div>
                                                            {userOwner.get('userFirstName')}&nbsp;{userOwner.get('userLastName')}
                                                        </div>

                                                    </td>
                                                </tr> :
                                                <></>
                                        }

                                    </tbody>
                                </table>

                            </div>

                            {
                                reviewsForProd.size === 0 ? '' :
                                    (
                                        <div>
                                            <p className="text-2xl px-3 mt-3">Reviews for {product.prodTitle}:</p>
                                            {
                                                // reviewsForProd && reviewsForProd.valueSeq().map((r) => {
                                                //     return (
                                                //         <ReviewCard key={r.revId} review={r} users={users} />
                                                //     );
                                                // })
                                            }
                                        </div>
                                    )
                            }

                            {/* {
                                reviewsForOwner.length === 0 ? '' :
                                    (<p className="text-2xl px-3 mt-3">Reviews for {userOwner.userFirstName}&nbsp;{userOwner.userLastName}:</p>)
                            }
                            {
                                reviewsForOwner.length === 0 ? '' :
                                    reviewsForOwner.map((r) => (
                                        <ReviewCard key={r.revId} review={r} users={users} />
                                    ))
                            } */}

                        </div>
                    </article>
                    :
                    <div className="my-10 flex justify-center text-red-500 font-bold">
                        <h1>There is no such product...</h1>
                    </div>
            }
        </Layout>
    )
}

// @ts-ignore
Product.getInitialProps = wrapper.getInitialAppProps(store => (ctx: any) => {
    store.dispatch(getProductById(ctx.query.id));
    return {
        prodId: ctx.query.id
    }
});

const mapStateToProps = (state, props) => {
    const { entities } = state;
    const product = entities.get('products').filter((item: any) => item.get('prodId') == props.prodId)[0];
    const userOwner = entities.get('users').filter((item: any) => item.get('userId') == product.get('userId'))[0];
    const reviewsForProd = entities.get('reviews').filter((item: any) => item.get('prodId') == props.prodId);
    return {
        reviewsForProd,
        product,
        identity: state.identity,
        users: entities.get('users'),
        userOwner
    }
}

export default connect(mapStateToProps)(Product)