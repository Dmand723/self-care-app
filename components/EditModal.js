import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { useRef, useState, useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { toast } from "react-toastify";

export default function EditModal({ show, onClose, data }) {
  const [isOn, setIsOn] = useState(data.isPrivate);
  const titleRef = useRef(data.title);
  const descRef = useRef(data.desc);
  const linkRef = useRef(data.link);

  const { editUserRecipe, deleteRecipe } = useContext(recipeContex);
  const { user } = useContext(authContext);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleEdit = () => {
    const newData = {
      createdBy: user.displayName,
      desc: descRef.current.value,
      isPrivate: isOn,
      link: linkRef.current.value,
      title: titleRef.current.value,
      uid: user.uid,
      id: data.id,
    };
    editUserRecipe(newData);
    onClose(false);
    toast.success(`Recipe ${newData.title} updated succsessfully`);
  };

  const handleDelete = () => {
    try {
      deleteRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="seeThru w-full h-full fixed top-0 left-0 z-20"
      style={{
        display: show ? "block" : "none",
      }}
    >
      <div
        style={{
          transform: show ? "translateX(0%)" : "translateX(-200%)",
        }}
        className="absolute top-20 left-0 w-full h-full z-10 transition-all duration-500"
      >
        <div className="container mx-auto max-w-6xl h-[90vh] rounded-3xl bg-slate-600 py-6 px-4">
          <button
            onClick={() => {
              onClose(false);
            }}
            className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-700"
          >
            X
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
            className="flex flex-col w-full"
          >
            <h1 className="headers mb-6">Edit Recipe</h1>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="inputs-edit"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                ref={titleRef}
                defaultValue={data.title}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                className="inputs-edit h-32 resize-none"
                id="desc"
                name="desc"
                placeholder="Description"
                maxLength={317}
                ref={descRef}
                defaultValue={data.desc}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="link"
              >
                Link
              </label>
              <input
                className="inputs-edit"
                type="text"
                id="link"
                name="link"
                placeholder="Link"
                ref={linkRef}
                defaultValue={data.link}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Private
              </label>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  checked={isOn}
                  onChange={handleToggle}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <span className="text-gray-400 text-sm font-bold">
                {isOn ? "Yes" : "No"}
              </span>
            </div>
            <div className="m-auto">
              <button
                className="bg-slate-800 border-yellow-600 text-yellow-600 py-2 px-12 rounded-3xl  hover:bg-slate-700 self-center mx-5"
                type="submit"
              >
                Edit
              </button>
              {/* <button
                onClick={handleDelete}
                className="btn-delete"
                type="submit"
              >
                Delete
              </button> DELETE FUNTION NOT WORK FIX!!!*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
