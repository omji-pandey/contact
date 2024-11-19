import React, { useState } from "react";
import { useForm } from "react-hook-form";
const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm">{message}</p>
);
const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [formStatus, setFormStatus] = useState(null);

  const submitHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Form submitted successfully!",
        });
        reset();
      } else {
        setFormStatus({
          type: "error",
          message: result.error || "There was an error with the submission.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-800">
      <div className="border-2 rounded-xl border-red-700 p-10 md:p-20 bg-gray-900 shadow-inner">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Contact Us Form
        </h1>

        {formStatus && (
          <div
            className={`mb-4 p-2 text-center ${
              formStatus.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col items-center justify-center"
        >
          <input
            className={`text-white outline-none bg-transparent border-2 border-emerald-600 text-xl py-3 px-5 rounded-full mb-4 mt-5 ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Enter your name"
            aria-label="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}

          <input
            className={`text-white outline-none bg-transparent border-2 border-emerald-600 text-xl py-3 px-5 rounded-full mb-4 mt-5 ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            placeholder="Enter your email address"
            aria-label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}

          <textarea
            className={`text-white outline-none bg-transparent border-2 border-emerald-600 text-xl py-10 pt-4 px-8 rounded-full mb-4 mt-5 ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Enter your message"
            aria-label="Message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 50,
                message: "Message must be at least 50 characters long.",
              },
            })}
          />
          {errors.message && <ErrorMessage message={errors.message.message} />}

          <button
            type="submit"
            className="bg-emerald-600 border-none text-white py-2 px-8 rounded-full mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
