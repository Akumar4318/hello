import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../Services/operstions/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0);

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-white/10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-2xl border border-richblack-400 bg-richblack-800 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-richblack-700 px-6 py-4">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5 hover:text-pink-200 transition-all" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt="User"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-100">Posting Publicly</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-4">
          {/* Ratings */}
          <div className="flex items-center gap-4">
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={ratingChanged}
            />
            <input
              type="hidden"
              {...register("courseRating", { required: true })}
            />
          </div>
          {errors.courseRating && (
            <span className="text-xs text-pink-200">Please provide a rating</span>
          )}

          {/* Experience Field */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="courseExperience"
              className="text-sm text-richblack-5"
            >
              <sup className="text-pink-200">*</sup> Add your Experience
            </label>
            <textarea
              id="courseExperience"
              className="form-style min-h-[130px] w-full resize-none"
              placeholder="Add your experience here"
              {...register("courseExperience", { required: true })}
            />
            {errors.courseExperience && (
              <span className="ml-1 text-xs text-pink-200">
                Please Add Your Experience
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="rounded-md bg-richblack-300 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all hover:bg-richblack-200"
            >
              Cancel
            </button>
            <IconBtn text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
