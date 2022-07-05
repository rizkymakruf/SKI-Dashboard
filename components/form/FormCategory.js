import { useEffect, useState, useRef } from "react";

export default function FormCategory({ globalCtx, onSubmit, myRef }) {
  useEffect(() => {
    // console.log("dkoa", document.querySelector("input[name=category]").value);
  }, []);

  // const initialValues = { category: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   const { category, value } = e.target;
  //   setFormValues({ ...formValues, [category]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // });

  // const validate = (values) => {
  //   const errors = {};
  //   // const regex = /^[^s@]+@
  //   if (!values.category) {
  //     errors.category = "Category name is required!";
  //   }
  //   return errors;
  // };

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full h-auto relative mb-4">
              {/* <pre>{JSON.stringify(formValues)}</pre> */}
              <p className="text-sm font-bold text-red-600 mb-2">
                Create Main Category
              </p>
              <input
                name="category"
                type="text"
                // value={formValues.category}
                // onChange={handleChange}
                className="placeholder-gray-400 h-10 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500"
                placeholder="Category Name"
                // disabled={globalCtx.isFetch ? "disabled" : ""}
              />
              {/* <p>{formErrors.category}</p> */}
            </div>
            <div className="w-full h-12 flex justify-between gap-2">
              <div className="w-full h-full flex items-center text-xs text-red-400">
                {globalCtx.errorMsg}
              </div>
              <div className="w-auto h-full flex items-center gap-x-2">
                <button
                  disabled={globalCtx.isFetch ? "disabled" : ""}
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
