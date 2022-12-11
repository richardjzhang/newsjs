import { useState } from "react";
import Image from "next/legacy/image";
import ButtonBusy from "components/ButtonBusy";

export default function PostCreatePage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<FileReader["result"]>(null);
  const [imageInput, setImageInput] = useState<string | Blob>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageInput(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("image", imageInput);

    await fetch("/api/post/create", {
      method: "POST",
      body: form,
    })
      .then((res) => {
        if (res.status === 201) {
          setShowSuccess(true);
          clearInputs();
        }
        return res.json();
      })
      .then((res) => {
        if (res.hasError) setErrorMessage(res.errorMessage);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  function clearInputs() {
    setTitle("");
    setDescription("");
    setImage(null);
    setImageInput("");
    setErrorMessage("");
    setUploading(false);
  }

  return (
    <div>
      <h1 className="mb-3 text-2xl font-semibold">Create a post</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-2 text-lg">Title</div>
        <input
          className="mb-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
          id="titleInput"
          placeholder="e.g. Next.js is awesome!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mb-2 text-lg">Description</div>
        <textarea
          className="mb-5 h-80 resize-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="descriptionInput"
          placeholder="e.g. Next.js is a React framework that allows you to build server-side rendered applications."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mb-2 text-lg">Attach an image for your post</div>
        <div>
          <label
            htmlFor="dropzone-file"
            className="py-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {image && typeof image === "string" ? (
              <div className="relative h-60 w-full">
                <Image
                  alt="Uploaded image"
                  src={image}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              onChange={(e) => handleImage(e)}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <button
          className="disabled:bg-gray-500 mt-9 w-full px-7 py-3 bg-blue-600 text-white text-lg leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          disabled={uploading}
        >
          {uploading ? <ButtonBusy /> : "Submit"}
        </button>
      </form>
      <div className="mt-4 flex justify-center text-red-500 capitalize">
        {errorMessage}
      </div>
      {showSuccess && (
        <div className="mt-4 flex justify-center text-green-500 capitalize">
          Success
        </div>
      )}
    </div>
  );
}
