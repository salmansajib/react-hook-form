import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onFormSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      throw new Error();
      // console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="p-3 min-h-screen bg-slate-950 text-gray-100">
      <h1 className="mt-7 text-center text-5xl font-semibold">
        React Hook Form
      </h1>

      <form
        className="w-full max-w-[350px] mx-auto mt-[200px] flex gap-3 flex-col items-center bg-slate-900 px-5 py-10 rounded-md border-2 border-gray-400"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {/* email field */}
        <input
          {...register("email", {
            required: "Please add an email.",
            // validate: (value) => value.includes("@"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:
                "Please enter a valid email address (e.g., example@domain.com).",
            },
          })}
          className="w-full px-2 py-1 rounded-[4px] bg-gray-200 text-slate-950 placeholder:text-gray-400"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-left w-full">
            {errors.email.message}
          </p>
        )}
        {/* password field */}
        <input
          {...register("password", {
            required: "Please add a password.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
            pattern: {
              // value:
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
              message:
                "Password must include uppercase, lowercase, a number, and a special character.",
            },
          })}
          className="w-full px-2 py-1 rounded-[4px] bg-gray-200 text-slate-950 placeholder:text-gray-400"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-left w-full">
            {errors.password.message}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-blue-300 hover:bg-blue-400 text-slate-950 w-full py-1 rounded-[4px] transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <Oval
              visible={true}
              height="24"
              width="24"
              color="#020617"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Submit"
          )}
        </button>

        {errors.root && (
          <p className="text-red-500 text-left w-full">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

export default App;
