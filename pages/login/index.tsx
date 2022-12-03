import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );

  const loginHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const payload = { email, password };
    const response = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    if (response && response.status === 401) {
      setErrorMessage(response.error);
    }

    if (response && response.status === 200) {
      router.push("/");
    }
  };

  return (
    <div className="px-6 h-full flex items-center text-gray-800">
      <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap g-6">
        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>
            <div className="mb-6">
              <input
                type="email"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center lg:text-left">
              <button
                type="button"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={loginHandler}
              >
                Login
              </button>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-4 flex justify-center text-red-500 capitalize">
              <span className="mr-1 font-bold">Error:</span>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
