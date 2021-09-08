export default function ReviewCard({ review }) {
    return (
        <div className="shadow-md rounded-lg my-3 px-3">
            <div className="flex mx-2 my-2">
                <div className="flex flex-col items-center w-24 px-5">
                    <img src={review.prodUser.userImg} alt="" className="rounded w-10 h-10" />
                    <div>
                        {review.prodUser.userFirstName}
                    </div>
                </div>
                <div className="flex flex-col px-3">
                    <div className="flex">
                        {[...Array(Number(review.revRating))].map((elementInArray, i) => (
                            <svg key={i}
                                className="h-4 w-4 fill-current text-teal-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 12 12"
                            >
                                <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                            </svg>
                        ))
                        }
                    </div>
                    <div>
                        {review.revFeedback}
                    </div>
                </div>
            </div>
        </div>
    );
}