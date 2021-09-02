import { GetStaticProps } from "next";
import { useState } from "react";

// export const getStaticProps: GetStaticProps = async (context) => {

// }


export default function SearchFilters() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="bg-gray-800">
            <div className="flex justify-between px-4 py-3">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-6 w-6 fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M14.32 12.906l1.096 1.096c.412-.023.83.123 1.145.437l3 3a1.5 1.5 0 01-2.122 2.122l-3-3a1.497 1.497 0 01-.437-1.145l-1.096-1.096a8 8 0 111.414-1.414zM8 14A6 6 0 108 2a6 6 0 000 12z" />
                        </svg>
                    </div>
                    <input
                        className="bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-white rounded-lg pl-10 pr-2 py-2 w-11/12"
                        placeholder="Search by keywords"
                    />
                </div>

                <button onClick={() => { setIsOpen(!isOpen) }} className={`${!isOpen ? 'bg-gray-700' : 'bg-gray-600 '} inline-flex items-center   hover:bg-gray-600  focus:outline-none focus:shadow-outline  rounded-lg shadow pl-3 pr-4`}>
                    <svg
                        className="h-6 w-6 fill-current text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm4 5a1 1 0 100 2h4a1 1 0 100-2h-4z" />
                    </svg>
                    <span className="ml-1 font-medium text-white">Filters</span>
                </button>
            </div>
            <form className={!isOpen ? 'hidden' : ''}>
                <fieldset className="px-4 py-4 border-t border-gray-900">
                    <div className="flex -mx-2">
                        <label className="block w-1/2 px-2">
                            <span className="text-sm font-medium text-gray-500">Bedrooms</span>
                            <select className="mt-1 form-select block w-full text-white shadow">
                                <option>4</option>
                                <option>4</option>
                                <option>4</option>
                                <option>4</option>
                            </select>
                        </label>


                        <label className="block w-1/2 px-2">
                            <span className="text-sm font-medium text-gray-500">Bathrooms</span>
                            <select className="mt-1 form-select block w-full text-white shadow">
                                <option>2</option>
                                <option>2</option>
                                <option>2</option>
                                <option>2</option>
                            </select>
                        </label>
                    </div>
                    <div className="mt-4">
                        <label className="">
                            <span className="text-sm font-medium text-gray-500">Price Range</span>
                            <select className="mt-1 form-select block w-full text-white shadow">
                                <option>Up to $2,000 /wk</option>
                                <option>Up to $2,000 /wk</option>
                                <option>Up to $2,000 /wk</option>

                            </select>
                        </label>
                    </div>
                </fieldset>

                <fieldset className="
                    px-4 
                    py-4 
                    border-t 
                    border-gray-900
                    "
                >
                    <span className="text-sm font-medium text-gray-400">Property Type</span>
                    <label className="mt-3 flex items-center">
                        <input className="form-radio" type="radio" name="propertyType" value="house" />
                        <span className="ml-2 text-white">House</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-radio" type="radio" name="propertyType" value="apartment" />
                        <span className="ml-2 text-white">Apartment</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-radio" type="radio" name="propertyType" value="loft" />
                        <span className="ml-2 text-white">Loft</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-radio" type="radio" name="propertyType" value="townhouse" />
                        <span className="ml-2 text-white">Townhouse</span>
                    </label>
                </fieldset>
                <fieldset className="px-4 py-4 border-t border-gray-900">

                    <span className="text-sm font-medium text-gray-400">Amenities</span>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="balcony" />
                        <span className="ml-2 text-white">Balcony</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="airConditioning" />
                        <span className="ml-2 text-white">Air conditioning</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="pool" />
                        <span className="ml-2 text-white">Pool</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="beach" />
                        <span className="ml-2 text-white">Beach</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="petFriendly" />
                        <span className="ml-2 text-white">Pet friendly</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="kidFriendly" />
                        <span className="ml-2 text-white">Kid friendly</span>
                    </label>
                    <label className="mt-3 flex items-center">
                        <input className="form-checkbox" type="checkbox" name="parking" />
                        <span className="ml-2 text-white">Parking</span>
                    </label>
                </fieldset>
                <div className="bg-gray-900 px-4 py-4">
                    <button className="block w-full bg-indigo-500 hover:bg-indigo-400 font-medium text-white px-4 py-2 rounded-lg">Update results</button>
                </div>
            </form>
        </section >
    );
}
