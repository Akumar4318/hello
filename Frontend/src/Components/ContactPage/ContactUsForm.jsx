import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../Services/apiconnector"
import CountryCode from '../../data/countrycode.json'
import { contactusEndpoint } from "../../Services/api";
import toast from "react-hot-toast";


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const sumbmitContactForm = async (data) => {
   
    try {
      setLoading(true);
      const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
    //   const response = { status: "OK" };
      console.log("Logging response", response);
      toast.success('Message send successfully')
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="flex flex-col gap-7 w-full max-w-[600px] mx-auto" onSubmit={handleSubmit(sumbmitContactForm)}>
      <div className="flex flex-wrap gap-5">
        {/* First Name */}
        <div className="flex flex-col gap-2 w-full lg:w-[48%]">
          <label htmlFor="firstName" className="lable-style">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-style"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span className="text-[12px] text-yellow-100">Please enter your first name</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 w-full lg:w-[48%]">
          <label htmlFor="lastName" className="lable-style">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-style"
            placeholder="Enter your last name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <span className="text-[12px] text-yellow-100">Please enter your last name</span>}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-style"
          placeholder="Enter your email address"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="text-[12px] text-yellow-100">Please enter your email address</span>}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[90px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code} >
                    {ele.code}  -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          className="form-style"
          placeholder="Enter your message here"
          {...register("message", { required: true })}
        />
        {errors.message && <span className="text-[12px] text-yellow-100">Please enter your message</span>}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black 
        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}  
        disabled:bg-richblack-500 sm:text-[16px]`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
