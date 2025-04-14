import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      {/* Floating Hamburger Button (mobile only) */}
      {!isSidebarOpen && (
        <button
          className="absolute top-4 left-4 z-50 block md:hidden text-white bg-richblack-700 p-2 rounded-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <GiHamburgerMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-[320px] max-w-[350px] bg-richblack-800 border-r border-richblack-700 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0 md:block
        `}
      >
        {/* Header with close icon (mobile only) */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-xl"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Top Controls */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            <div
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              onClick={() => navigate("/dashboard/enrolled-courses")}
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              customClasses="ml-auto"
              text="Add Review"
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* Sections and Subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              key={index}
              onClick={() => setActiveStatus(course?._id)}
            >
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* SubSections */}
              {activeStatus === course?._id &&
                course?.subSection.map((topic, index) => (
                  <div
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                      setIsSidebarOpen(false); // Close on mobile
                    }}
                    key={index}
                    className={`flex gap-4 p-5 ${
                      videobarActive === topic._id
                        ? "bg-yellow-200 text-richblack-900"
                        : "bg-richblack-900 text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
