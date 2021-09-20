import { useSelector } from 'react-redux';

import Layout from '../../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import ReviewCard from 'components/reviewCard'

import { getProductById, } from 'redux-saga/saga/products';
import { getUsers } from 'redux-saga/saga/users';
import { getReviewsByProductId } from 'redux-saga/saga/reviews';

import { wrapper } from '../../redux-saga/store/store'
import { IProduct } from '../../constants';

export default function Product({ prodId, home }) {
    const products = useSelector((state: any) => state.products.items);
    const identity = useSelector((state: any) => state.identity);
    const reviews = useSelector((state: any) => state.reviews.items);
    const users = useSelector((state: any) => state.users.items);

    let product: IProduct;
    if (products.length !== 0 && !isNaN(prodId)) {  //need to get details about request architecture
        product = products.find(p => {
            return Number(p.prodId) === Number(prodId)
        })
    }
    let userOwner = users.find(u => {
        return Number(u.userId) === Number(product.userId)
    })

    return (
        <Layout props={identity}>
            <Link href={"/"} >
                <a className="fixed z-10"><span className="px-3 py-2 bg-indigo-300 rounded-xl mx-3 hover:bg-indigo-200">Back</span></a>
            </Link>
            {
                product?.prodId !== undefined ?
                    <article>

                        <h1 className="text-gray-900 text-2xl px-3 mt-3">{product.prodTitle}</h1>
                        <div className="flex shadow-md relative flex-col">
                            <div className="pt-5">
                                <img src={product.prodImg} className="inset-0 w-full" />
                            </div>
                            <p className="text-2xl px-3 mt-3">Description:</p>
                            <p className="px-3 mt-1">
                                {product.prodDesc}
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
                                            <td className=" py-1px-3">$&nbsp;{product.prodPrice}</td>
                                        </tr>
                                        <tr className="text-center">
                                            <td className="py-1 px-3">Year</td>
                                            <td className="py-1px-3">{product.prodYear}</td>
                                        </tr>
                                        {/* <tr className="bg-gray-300 text-center">
                                            <td className="py-1">Rating</td>
                                            <td className="py-1">{product.rating}</td>
                                        </tr> */}
                                        <tr className="text-center">
                                            <td className="py-1">Reviews</td>
                                            <td className="py-1">{reviews.length}</td>
                                        </tr>
                                        {
                                            userOwner?.userId !== undefined ?
                                                <tr className="bg-gray-300">
                                                    <td className="px-3 py-1 text-center">Seller</td>
                                                    <td className="px-3 py-2 flex flex-col items-center">
                                                        <img src={userOwner.userImg} alt="" className="rounded w-10 h-10" />
                                                        <div>
                                                            {userOwner.userFirstName}&nbsp;{userOwner.userLastName}
                                                        </div>

                                                    </td>
                                                </tr> :
                                                <></>
                                        }

                                    </tbody>
                                </table>

                            </div>

                            {
                                reviews.length === 0 ? '' :
                                    (<p className="text-2xl px-3 mt-3">Reviews for {product.prodTitle}:</p>)
                            }
                            {
                                reviews.length === 0 ? '' :
                                    reviews.map((r) => (
                                        <ReviewCard key={r.revId} review={r} users={users} />
                                    ))
                            }
                            {/* {
                                product.author.reviewsForOwner.length === 0 ? '' :
                                    (<p className="text-2xl px-3 mt-3">Reviews for {product.author.userFirstName}&nbsp;{product.author.userLastName}:</p>)
                            }
                            {
                                product.author.reviewsForOwner.length === 0 ? '' :
                                    product.author.reviewsForOwner.map((r) => (
                                        <ReviewCard key={r.revId} review={r} />
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

// Product.getInitialProps = async (ctx) => {
//     // const cookie = ctx.req ? ctx.req.headers.cookie : document.cookie;
//     // const token = cookie.token;
//     // const result = await xRead("/product/" + ctx.query.id, {}, token);
//     return {
//         prodId: ctx.query.id
//     }
// }
// @ts-ignore
Product.getInitialProps = wrapper.getInitialAppProps(store => (ctx: any) => {
    store.dispatch(getProductById(ctx.query.id));
    store.dispatch(getReviewsByProductId(ctx.query.id));
    store.dispatch(getUsers());
    return {
        prodId: ctx.query.id
    }
});