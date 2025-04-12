import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../Slice/cartSlice";

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = () => {
    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
      <img
        src={ThumbnailImage}
        alt="Course Thumbnail"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          ₹ {CurrentPrice}
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="text-base md:text-lg lg:text-xl px-4 py-2 rounded-md yellowButton"
            onClick={() => {
              if (user && course?.studentEnrolled.includes(user._id)) {
                navigate("/dashboard/enrolled-courses");
              } else {
                handleBuyCourse();
              }
            }}
          >
            {user && course?.studentEnrolled.includes(user._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(!user || !course?.studentEnrolled.includes(user._id)) && (
            <button onClick={handleAddToCart} className="blackButton">
              Add to Cart
            </button>
          )}
        </div>

        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            30-day money back guarantee
          </p>

          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, index) => (
              <p className="flex gap-2" key={index}>
                <span>{item}</span>
              </p>
            ))}
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100"
              onClick={handleShare}
            >
              <FaShareSquare /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
