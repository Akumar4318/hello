import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/common/Loader";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../Services/operstions/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPasswod] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const { loading } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div  className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>

          <form action="" onSubmit={handleOnSubmit}>
            <label className="relative" htmlFor="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Passowrd <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="New Password"  className="form-style w-full !pr-10"
              />
              <span  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => {
                  setShowPasswod(!showPassword);
                }}
              >
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
              </span>
            </label>

            <label className="relative mt-3 block" htmlFor="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Passowrd <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm New password" className="form-style w-full !pr-10"
              />
              <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword); 
                }}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye  fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button type="submit"  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5"> Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
