import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonBusy from "components/ButtonBusy";
export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const { status } = useSession();

  const signupHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsSigningUp(true);
    const payload = { name, email, password };
    await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 201) {
          setErrorMessage(null);
          router.push("/login");
        }
        setIsSigningUp(false);
        return res.json();
      })
      .then((res) => {
        if (res.hasError) setErrorMessage(res.errorMessage);
      })
      .catch((err) => {
        setIsSigningUp(false);
        setErrorMessage(err);
      });
  };

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [router, status]);

  if (status === "unauthenticated") {
    return (
      <div className="px-6 h-full flex items-center text-gray-800">
        <div className="w-full flex xl:justify-center lg:justify-between justify-center items-center flex-wrap g-6">
          <div className="relative h-96 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <Image
              alt="Login image"
              className="absolute top-0 left-0"
              src="/images/draw2.webp"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  disabled={isSigningUp}
                  className="disabled:bg-gray-500 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={signupHandler}
                >
                  {isSigningUp ? (
                    <ButtonBusy>Registering</ButtonBusy>
                  ) : (
                    "Sign up"
                  )}
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
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

  return null;
}
