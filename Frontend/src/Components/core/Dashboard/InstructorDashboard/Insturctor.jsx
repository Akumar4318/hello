import React, { useEffect, useState } from "react";
import { getInstructorData } from "../../../../Services/operstions/profileAPI";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../Services/operstions/courseDetailsAPI";
import Loader from "../../../common/Loader";
import { Link } from "react-router-dom";

import InstructorChart from "./InstructorChart";

const Insturctor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };

    getCourseDataWithStats();
  }, []);
  
  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenereted,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentEnrolled,
    0
  );

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋👋
        </h1>
        <p className="font-medium text-richblack-200">Let’s start something new</p>
      </div>
  
      {/* Loader */}
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          {/* Chart and Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>
  
            {/* Stats */}
            <div className="flex flex-col gap-4 min-w-[250px]">
              <div className="rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      ₹ {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Your Courses Section */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View all</p>
              </Link>
            </div>
  
            <div className="mt-4 flex flex-wrap gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-full sm:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="rounded-md w-full h-[200px] object-cover"
                  />
                  <div className="mt-3 space-y-1">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-richblack-300">
                      <p>{course.studentEnrolled.length} Students</p>
                      <span>|</span>
                      <p>₹ {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // No Course Created Yet
        <div className="mt-20 rounded-md bg-richblack-800 py-20 p-6 text-center">
          <p className="text-2xl font-bold text-richblack-5">
            You haven’t created a course yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
  
};

export default Insturctor;
