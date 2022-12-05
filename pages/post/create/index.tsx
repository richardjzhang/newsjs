import { useState } from "react";

export default function PostCreatePage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<FileReader["result"]>(null);
  const [imageInput, setImageInput] = useState<string | Blob>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          setErrorMessage(null);
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

  return (
    <div>
      <h1 className="mb-3 text-2xl font-semibold">Create a post</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-2 text-lg">Title</div>
        <input
          className="mb-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
          id="titleInput"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mb-2 text-lg">Description</div>
        <textarea
          className="mb-5 h-80 resize-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="descriptionInput"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mb-2 text-lg">Attach an image</div>
        <div className="mb-7 flex align-c">
          <div>
            <input
              className="file:cursor-pointer file:mr-4 file:py-2 file:px-4
      file:rounded file:border file:border-blue-400 border-solid
      file:text-sm file:font-semibold
      file:bg-transparent file:text-blue-700"
              type="file"
              onChange={(e) => handleImage(e)}
            />
          </div>
          <div className="flex-1">
            {image && typeof image === "string" && (
              <img src={image} className="w-full" />
            )}
          </div>
        </div>
        <button className="w-full px-7 py-3 bg-blue-600 text-white text-lg leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Submit
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
