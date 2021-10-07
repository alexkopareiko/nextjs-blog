import Link from "next/link";
import { useDispatch } from "react-redux";
import identityEntity from "../redux-saga/models/IdentityEntity";
import { ENTITIES } from "../constants";

const login = () => {
    const dispatch = useDispatch()
    const loginUser = async event => {
        event.preventDefault();
        const action = identityEntity.getActions("IdentityEntity").sagaLogin.action;
        dispatch(action({
            userEmail: event.target.userEmail.value,
            userPasswd: event.target.userPasswd.value,
        }));
    }

    return (
        <div className="relative">
            <img
                src="https://www.techadvisor.com/cmsdata/features/3797568/iphone_13_news_18_thumb1200_16-9.png"
                className="absolute inset-0 object-cover w-full h-full"
                alt="img"
            />
            <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                <svg
                    className="absolute inset-x-0 bottom-0 text-white"
                    viewBox="0 0 1160 163"
                >
                    <path
                        fill="currentColor"
                        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                    />
                </svg>
                <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                Choose Your IPhone
                            </h2>
                            <Link href={"/"} >
                                <a className="sm:text-center sm:mb-6 text-white text-xl bg-black rounded-xl p-2">Main</a>
                            </Link>
                        </div>
                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                    Welcome ! let's login
                                </h3>

                                <br />
                                <form onSubmit={loginUser}>
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="email"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            placeholder="john.doe@example.org"
                                            required
                                            type="text"
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="email"
                                            name="userEmail"
                                        />
                                    </div>
                                    <br />
                                    <div className="mb-1 sm:mb-2">
                                        <label
                                            htmlFor="password"
                                            className="inline-block mb-1 font-medium"
                                        >
                                            Password
                                        </label>
                                        <input
                                            placeholder="password"
                                            required
                                            type="password"
                                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                            id="password"
                                            name="userPasswd"
                                        />
                                    </div>
                                    <br />
                                    <div className="mt-4 mb-2 sm:mb-4">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center text-black justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                        >
                                            Sign-in
                                        </button>
                                    </div>
                                    <br />
                                    <p className="flex flex-wrap justify-center gap-5 text-xs text-gray-600 sm:text-sm">
                                        No account ?
                                        <Link href={`/registration`}>
                                            <a className=' text-blue-500' href='#'>sign Up</a>
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default login;