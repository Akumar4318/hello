import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"




const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
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
    //     (() => {
    //       if (!courseSectionData.length) {
    //         return;
    //       }

    //       const currentSectionIndex = courseSectionData.find(
    //         (data) => data._id === sectionId
    //       );

    //       const currentSubSectionIndex = courseSectionData?.[
    //         currentSectionIndex
    //       ]?.subSection.findIndex((data) => data._id === subSectionId);

    //       const activeSubSectionId=courseSectionData(currentSectionIndex)?.subSection.[currentSubSectionIndex]?._id;
    // set current section here
    //       setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

    // set current sub section here
    //       setVideoBarActive(activeSubSectionId)
    //     })();
    //   },[courseSectionData,courseEntireData,location.pathname]);

    const setActiveFlags = () => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.find(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

      // set current sub section here
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* btn heading div */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* only for buttons */}
          <div className="flex w-full items-center justify-between ">
            <div
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
               <IoIosArrowBack size={30} />
            </div>
            <div>
              <IconBtn
                customClasses="ml-auto"
                text="Add Review"
                onClick={() => {
                  setReviewModal(true);
                }}
              />
            </div>
          </div>
          {/* for heading or title */}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for section and subSections */}

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              key={index}
              onClick={() => {
                setActiveStatus(course?._id);
              }}
            >
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>

                <div className="flex items-center gap-3">
                  {/* add arrow here */}
                  <span
                    className={${
                      activeStatus === course?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* subSections */}
              <div>
                {activeStatus === course?._id &&
                  course?.subSection.map((topic, index) => (
                    <div
                      onClick={() => {
                        navigate(
                          /view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic?._id}
                        );

                        setVideoBarActive(topic?._id);
                      }}
                      key={index}
                      className={flex gap-4 p-5 ${
                        videobarActive === topic._id
                          ? "bg-yellow-200 text-richblack-900"
                          : "bg-richblack-900 text-white"
                      }}
                    >
                      <input
                        type="checkbox"
                        id=""
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />

                      <span>{topic.title}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;


