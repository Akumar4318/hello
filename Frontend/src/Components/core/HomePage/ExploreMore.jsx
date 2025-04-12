import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'


const tabName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

const setMyCard=(value)=>{

    setCurrentTab(value)
    let result=HomePageExplore.filter((course)=> course.tag == value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
}


  return (
    <div className=''>
        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of code"}/>
        </div>

        <p className='text-center text-richblack-300 text-lg font-semibold mt-1'>
            Lear to build anything you can imagine
        </p>
        <div className="hidden lg:flex gap-5 m-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabName.map((ele, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCard(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block  lg:h-[100px]"></div>

            {/* course car group */}
      <div className="lg:absolute gap-10 lg:w-11/12 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-40%] lg:translate-y-[80%] text-black lg:mb-0 mb-7 lg:px-0 px-2">

        {
            courses.map((item,index)=>{

                return(
                  <CourseCard
              key={index}
              cardData={item}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
                )
            })
        }
      </div>
    </div>
  )
}

export default ExploreMore