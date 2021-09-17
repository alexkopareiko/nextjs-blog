export default function PropertyCard({ product }) {
    return (
        <div className="mt-9 sm:mt-6 sm:px-2">
            <div className="relative pb-5/6" >
                <img
                    className="rounded-lg shadow-md inset-0 w-full object-cover h-64"
                    src={product.prodImg}
                    alt=""
                />
            </div>
            <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                    <div className="flex items-center">
                        {/* <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                            {product.category.catName}
                        </span> */}
                        <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                            ({product.prodYear})
                        </div>
                    </div>
                    <h4 className="mt-1 text-gray-900 font-medium text-lg">
                        {product.prodTitle}
                    </h4>
                    <div className="mt-1">
                        <span className="ml-1 text-sm text-gray-600">$&nbsp;</span>
                        <span className="text-gray-900">{product.prodPrice}</span>

                    </div>
                    {/* <div className="flex items-center mt-2 text-sm text-gray-600">
                        {product.reviews.length ?
                            [...Array(product.rating)].map((e, i) => <svg key={i}
                                className="h-4 w-4 fill-current text-teal-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 12 12"
                            >
                                <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                            </svg>) : ''}
                        <span className="ml-2">{product.reviews.length} reviews</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
