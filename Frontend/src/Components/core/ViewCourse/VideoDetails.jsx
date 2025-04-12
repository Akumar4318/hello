import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  setCourseSectionData,
  updateCompletedLectures,
} from "../../../Slice/viewCourseSlice";
import { markLectureAsComplete } from "../../../Services/operstions/courseDetailsAPI";
import ReactPlayer from "react-player";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [previewSource, setPreviewSource] = useState("");
  const [videoData, setVideoData] = useState({});
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-course");
        return;
      }

      const filterData = courseSectionData.find(
        (course) => course._id === sectionId
      );

      const filterVideoData = filterData?.subSection.find(
        (data) => data._id === subSectionId
      );

      setVideoData(filterVideoData || {});
      setPreviewSource(courseEntireData?.thumbnail || "");
      setVideoEnded(false);
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );
    const noOfSubSection = courseSectionData?.[currentSectionIndex]?.subSection?.length;
    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    const noOfSubSection = courseSectionData?.[currentSectionIndex]?.subSection?.length;

    if (currentSubSectionIndex < noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else if (currentSectionIndex + 1 < courseSectionData.length) {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection?.[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPreVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );

    if (currentSubSectionIndex > 0) {
      const preSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${preSubSectionId}`
      );
    } else if (currentSectionIndex > 0) {
      const preSectionId = courseSectionData[currentSectionIndex - 1]?._id;
      const preSubSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection?.length;
      const preSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection?.[
          preSubSectionLength - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${preSectionId}/sub-section/${preSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <div className="relative w-full">
          <ReactPlayer
            ref={playerRef}
            url={videoData?.videoUrl}
            controls={true}
            width="100%"
            height="auto"
            onEnded={() => setVideoEnded(true)}
            playsinline
          />
          {videoEnded && (
            <div
              className="absolute inset-0 gap-y-4 z-[100] grid h-full place-content-center font-inter bg-gradient-to-t from-black via-black/70 via-30% to-transparent"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  customClasses="text-xl max-w-max px-4 mx-auto"
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark as completed" : "Loading"}
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  playerRef.current?.seekTo(0);
                  setVideoEnded(false);
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPreVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
