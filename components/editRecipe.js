import { useRef, useContext } from "react";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { toast } from "react-toastify";

export default function EditRecipe({ recipe, onClose }) {
  const titleRef = useRef();
  const descRef = useRef();
  const linkRef = useRef();
  const starterData = {
    title: recipe.title,
    desc: recipe.desc,
    link: recipe.link,
  };

  const { editPublicRecipe } = useContext(recipeContex);

  const editRecipeHandler = () => {
    const data = {
      ...recipe,
      title: titleRef.current.value,
      desc: descRef.current.value,
      link: linkRef.current.value,
    };
    editPublicRecipe(data);
    titleRef.current.value = "";
    descRef.current.value = "";
    linkRef.current.value = "";
    toast.success(`Recipe Updated Succsessfully: ${data.title}`);
    onClose(false);
  };
  return (
    <form
      className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        editRecipeHandler();
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>
      <input
        className="inputs"
        type=""
        name="title"
        placeholder="Title"
        ref={titleRef}
        defaultValue={starterData.title}
      />
      <textarea
        className="inputs h-[180px] resize-none"
        type="text"
        name="desc"
        placeholder="Description"
        ref={descRef}
        defaultValue={starterData.desc}
      />
      <input
        className=" inputs"
        type="text"
        name="link"
        placeholder="Link"
        ref={linkRef}
        defaultValue={starterData.link}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
      <div className="flex items-center justify-center mt-3">
        <button
          className="btn btn-danger "
          onClick={() => {
            onClose(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
