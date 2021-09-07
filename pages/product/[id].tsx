import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import ReviewCard from 'components/reviewCard'

export default function Product({ product, home, query }) {
    //console.log(product)
    return (
        <Layout {...home}>
            <Head>
                <title></title>
            </Head>
            <article>
                <Link href={"/"}>
                    <a><span className="px-3 py-2 bg-indigo-300 rounded-xl mx-3 hover:bg-indigo-200">Back</span></a>
                </Link>
                <h1 className="text-gray-900 text-xl px-3 mt-3">{product.prodTitle}</h1>
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
                                <tr className="px-3 text-center">
                                    <td className="px-3">Category</td>
                                    <td className="px-3">{product.category.catName}</td>

                                </tr>

                                <tr className="bg-gray-300 text-center ">
                                    <td className="py-1 px-3">Price</td>
                                    <td className=" py-1px-3">$&nbsp;{product.prodPrice}</td>
                                </tr>
                                <tr className="text-center">
                                    <td className="py-1 px-3">Year</td>
                                    <td className="py-1px-3">{product.prodYear}</td>
                                </tr>
                                <tr className="bg-gray-300 text-center">
                                    <td className="py-1">Rating</td>
                                    <td className="py-1">{product.rating}</td>
                                </tr>
                                <tr className="text-center">
                                    <td className="py-1">Reviews</td>
                                    <td className="py-1">{product.reviews.length}</td>
                                </tr>
                                <tr className="bg-gray-300">
                                    <td className="px-3 py-1 text-center">Seller</td>
                                    <td className="px-3 py-2 flex flex-col items-center">
                                        <img src={product.author.userImg} alt="" className="rounded w-10 h-10" />
                                        <div>
                                            {product.author.userFirstName}&nbsp;{product.author.userLastName}
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    {
                        product.reviews.length === 0 ? '' :
                            (<p className="text-2xl px-3 mt-3">Reviews:</p>)
                    }
                    {
                        product.reviews.length === 0 ? '' :
                            product.reviews.map((r) => (
                                <ReviewCard key={r.revId} productId={product.prodId} />
                            ))
                    }

                </div>
            </article>
        </Layout>
    )
}

Product.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const res = await fetch("http://localhost:3000/api/products/" + ctx.query.id);
    const product = await res.json();
    return {
        product
    }
}