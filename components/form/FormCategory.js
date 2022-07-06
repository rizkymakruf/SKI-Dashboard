// import { useForm } from "react-hook-form";
// import { categorySchema } from "./Validation/category";
import { useFormik } from "formik";

function FormCategory() {
  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   let formData = {
  //     name: event.target[0].value,
  //   };
  //   const isValid = await categorySchema.isValid(formData);
  //   console.log("valid?", isValid);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
  });

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-bold text-red-600 mb-2">
                Create Main Category
              </p>
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Category Name"
                className={`w-full shadow py-3 px-4 placeholder-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 `}
                // {...register("name", { required: "password is required!" })}
              />
              {/* ${errors.name ? "ring-2 ring-red-500" : null} */}
              {/* <p className="text-xs text-red-500 pt-2">
                {errors.name?.message}
              </p> */}
            </div>

            <div className="w-full h-12 flex justify-between gap-2">
              <div className="w-auto h-full flex items-center gap-x-2">
                <button
                  type="submit"
                  className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormCategory;
