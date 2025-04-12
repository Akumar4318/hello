import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Rating,ThinRoundedStar  } from "@smastrom/react-rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../Services/apiconnector";
import { ratingsEndpoints } from "../../Services/api";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.allReviews);
      }
    })();
  }, []);

  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }

  return (
    <div className="text-white w-full px-4 py-10">
      <div className="max-w-[1200px] mx-auto">
        <Swiper
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="!pl-2"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="!w-[260px]">
              <div className="flex flex-col gap-3 rounded-lg bg-richblack-800 p-4 h-full shadow-md text-richblack-25">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="user"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-richblack-5 text-base">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h3>
                    <p className="text-sm text-richblack-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")}...`
                    : review?.review}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-yellow-100 font-semibold">
                    {review.rating.toFixed(1)}
                  </span>
                  {/* <ReactStars */}
                    {/* count={5} */}
                    {/* value={review.rating} */}
                    {/* size={20} */}
                    {/* edit={false} */}
                    {/* activeColor="#ffd700" */}
                    {/* emptyIcon={<FaStar />} */}
                    {/* fullIcon={<FaStar />} */}
                  {/* /> */}

                  <Rating
                    count={5}
                    itemStyles={myStyles} 
                    value={review.rating} 
                    style={{ maxWidth: 200 }}
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
