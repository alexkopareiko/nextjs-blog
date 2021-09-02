import Head from "next/head";
import Header from "./header";
import SearchFilters from "./searchFilters";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Aleksandr";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  return (
    <div className={"min-h-screen bg-gray-200 antialiased"}>

      <Header />
      <SearchFilters />
      <main className="py-6">
        <div className="px-4">
          <h3 className="text-gray-900 text-xl">Los Angeles</h3>
          <p className="text-gray-600">
            Live like the stars in these luxurious Southern California estates.
          </p>
        </div>

        <div className="mt-5 ">
          <div className="px-4 sm:grid sm:grid-cols-2 sm:pb-8 lg:grid-cols-3 2xl:grid-cols-4">

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 sm:mt-6 sm:w-65 sm:px-2">
              <div className="relative pb-5/6" >
                <img
                  className="rounded-lg shadow-md inset-0 h-full w-full object-cover "
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
                  alt=""
                />
              </div>
              <div className="relative px-4 -mt-16">
                <div className="bg-white rounded-lg px-4 py-4 shadow-lg">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-medium uppercase tracking-wide text-xs">
                      Plus
                    </span>
                    <div className="ml-2 text-xs text-gray-600 font-medium uppercase tracking-wide">
                      3 beds &bull; 2 baths
                    </div>
                  </div>
                  <h4 className="mt-1 text-gray-900 font-medium text-lg">
                    Modern home in city center
                  </h4>
                  <div className="mt-1">
                    <span className="text-gray-900">$1,400</span>
                    <span className="ml-1 text-sm text-gray-600">/wk</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <svg className="h-4 w-4 fill-current text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.283 10.93a1 1 0 01-1.451-1.054l.472-2.754-2-1.951a1 1 0 01.553-1.706l2.766-.402L4.86.557a1 1 0 011.793 0L7.89 3.063l2.766.402a1 1 0 01.554 1.706l-2.002 1.95.473 2.755A1 1 0 018.23 10.93l-2.474-1.3-2.473 1.3z" />
                    </svg>
                    <span className="ml-2">34 reviews</span>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </main>

      {/* <Head {...children}>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head> */}

      {/* <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={"text-6xl font-bold text-purple-500"}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.jpg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={"text-6xl font-bold text-purple-500"}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header> */}
      {/* <main>{children}</main> */}
      {/* {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )} */}
    </div>
  );
}
