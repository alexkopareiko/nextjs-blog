import { connect } from 'react-redux';

import Layout from '../../components/layout'
import Link from 'next/link'
import ReviewCard from 'components/ReviewCard'

import wrapper from '../../redux-saga/store/store'
import Entity from 'redux-saga/models/Entity';
import productEntity from 'redux-saga/models/ProductEntity';
import saga from 'redux-saga/decorators/saga';
import React from 'react';
interface MyProps {
    identity, product, userOwner, reviewsForProd, category, usersForReviews, reviewsForOwner
}

@saga(productEntity)
class Product extends React.Component<MyProps> {
    render() {
        const { identity, product, userOwner, reviewsForProd, category, usersForReviews, reviewsForOwner } = this.props;
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
                                            <tr className="px-3 text-center">
                                                <td className="px-3">Category</td>
                                                <td className="px-3">{category.get('catName')}</td>

                                            </tr>
                                            <tr className="bg-gray-300 text-center ">
                                                <td className="py-1 px-3">Price</td>
                                                <td className=" py-1px-3">$&nbsp;{product.get('prodPrice')}</td>
                                            </tr>
                                            <tr className="text-center">
                                                <td className="py-1 px-3">Year</td>
                                                <td className="py-1px-3">{product.get('prodYear')}</td>
                                            </tr>
                                            <tr className="bg-gray-300 text-center">
                                                <td className="py-1">Rating</td>
                                                <td className="py-1">{product.get('rating')}</td>
                                            </tr>
                                            <tr className="text-center">
                                                <td className="py-1">Reviews</td>
                                                <td className="py-1">{reviewsForProd?.size}</td>
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
                                    reviewsForProd?.size === 0 ? '' :
                                        (
                                            <div>
                                                <p className="text-2xl px-3 mt-3">Reviews for {product.get('prodTitle')}:</p>
                                                {
                                                    reviewsForProd && reviewsForProd.valueSeq().map((r) => {
                                                        return (
                                                            <ReviewCard key={r.get('revId')} review={r} users={usersForReviews} />
                                                        );
                                                    })
                                                }
                                            </div>
                                        )
                                }

                                {/* {
                                    reviewsForOwner.size === 0 ? '' :
                                        (
                                            <div>
                                                <p className="text-2xl px-3 mt-3">Reviews for {userOwner.get('userFirstName')}&nbsp;{userOwner.get('userLastName')}:</p>
                                                {
                                                    reviewsForOwner && reviewsForOwner.valueSeq().map((r) => {
                                                        return (
                                                            <ReviewCard key={r.get('revId')} review={r} users={usersForReviews} />
                                                        );
                                                    })
                                                }
                                            </div>
                                        )
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
}

// @ts-ignore
Product.getInitialProps = wrapper.getInitialAppProps(store => (ctx: any) => {
    const action = Entity.getActions()["ProductEntity"].sagaGetProductById.decoratorFunction;
    store.dispatch(action({ id: ctx.query.id }));
    return {
        prodId: ctx.query.id
    }
});

const mapStateToProps = (state, props) => {
    const { entities } = state;
    const product = entities.get('products')?.filter((item: any) => item.get('prodId') == props.prodId).valueSeq().first();
    const userOwner = entities.get('users')?.filter((item: any) => item.get('userId') == product.get('userId')).valueSeq().first();
    const reviewsForProd = entities.get('reviews')?.filter((item: any) => item.get('prodId') == props.prodId);
    const category = entities.get('categories')?.filter((item: any) => item.get('catId') == product.get('catId')).valueSeq().first();
    const findUsersById = (userId) => { return entities.get('users').find(u => u.get('userId') === userId) };
    const usersForReviews = [];
    reviewsForProd?.map(r => usersForReviews.push(findUsersById(r.get('prodUserId'))));
    const reviewsForOwner = entities.get('reviews')?.filter((item: any) => item.get('ownerUserId') === product.get('userId'));
    reviewsForOwner?.map(r => usersForReviews.push(findUsersById(r.get('prodUserId'))));

    return {
        reviewsForProd,
        product,
        identity: state.identity,
        usersForReviews,
        reviewsForOwner,
        userOwner,
        category
    }
}

export default connect(mapStateToProps)(Product)