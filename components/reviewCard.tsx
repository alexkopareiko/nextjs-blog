import { GetStaticProps } from "next";
import useSWR from 'swr'
const times = require('lodash/times');

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ReviewCard(props: { productId: Number; }) {
    const { productId } = props;
    const { data, error } = useSWR("http://localhost:3000/api/reviews/" + productId, fetcher)
    console.log(data)
    if (error) return <div>failed to load</div>
    if (!data || data.length === 0) return <div>loading...</div>
    const review = data;
    return (
        <div className="shadow-md rounded-lg my-3 px-3">
            <div className="flex mx-2 my-2">
                {[...Array(Number(review.revRating))].map((elementInArray, i) => (
                    <svg key={i}
                        className="h-4 w-4 fill-current text-teal-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 12 12"
                    >
                        <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                )
                )
                }
            </div>
            <div>

            </div>

        </div>
    );
}

// ReviewCard.getInitialProps = async (ctx) => {
//     console.log(ctx)
//     const res = await fetch("http://localhost:3000/api/reviews/" + ctx.query.id);
//     const review = await res.json();
//     return {
//         review
//     }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//     console.log(context.params)
//     return {
//         props: context.params, // will be passed to the page component as props
//     }
// }