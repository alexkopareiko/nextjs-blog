import Head from "next/head";
import Header from "./header";
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
      <section className="flex justify-between bg-gray-800 px-4 py-3">
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

        <button className="inline-flex items-center  bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:shadow-outline  rounded-lg shadow pl-3 pr-4">
          <svg
            className="h-6 w-6 fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm4 5a1 1 0 100 2h4a1 1 0 100-2h-4z" />
          </svg>
          <span className="ml-1 font-medium text-white">Filters</span>
        </button>
      </section>
      <main className="px-4 py-6">
        <h3 className="text-gray-900 text-xl">Los Angeles</h3>
        <p className="text-gray-600">
          Live like the stars in these luxurious Southern California estates.
        </p>
        <div className="mt-5">
          <div>
            <div>
              <img
                className="rounded-lg shadow-md h-64 w-full object-cover "
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
