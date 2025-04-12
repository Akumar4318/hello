import React from 'react'
import { Link } from 'react-router-dom'
import RatingStar from '../../common/RatingStar'


const Course_Card = ({course,Height}) => {

    // const[avgReviewCount,setAvgReviewCount]=useState(0);
    // useEffect(()=>{
    //     const count=getAvgRating(course.ratingAndReview);
    //     setAvgReviewCount(count)
    // },[course])


  return (
    <div>

        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img  className={`${Height} w-full rounded-xl object-cover `} src={course?.thumbnail} alt='course ka thumbnail'/>
                </div>

                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p  className="text-sm text-richblack-50">By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div  className="flex items-center gap-2">
                        {/* <span className="text-yellow-5">{avgReviewCount || 0}</span> */}
                        {/* <RatingStar Review_Count={avgReviewCount}/> */}
                        {/* <span  className="text-richblack-400">{course?.ratingAndReviews?.length}Rating</span> */}

                    </div>
                    <p className="text-xl text-richblack-5"> ₹ {course?.price}</p>
                </div>
            </div>

        </Link>
    </div>
  )
}

export default Course_Card