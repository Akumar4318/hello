import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImg from '../../../assets/Images/TimelineImage.png'

const timeline=[
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
      },
      {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
      },
      {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
      },
      {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
      },
]

const TimelineSection = () => {

  return (
    <div>
        <div className='flex flex-row gap-15 items-center'>

            {/* Left box */}
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((item,index)=>{

                        return(
                            <div className='flex flex-row gap-5' key={index}>
                                <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img src={item.Logo} alt="" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>
                                        {item.Heading}
                                    </h2>
                                    <p className='text-base'>{item.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            {/* Right Part */}

            <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>

                <img src={timelineImg} alt=""  className='shadow-white object-cover h-fit'/>

                <div className='absolute  lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'>
                    <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>

                    <p className='text-3xl font-bold w-[75px]'>10</p>
                    <p  className="text-caribbeangreen-300 text-sm w-[75px]">Year of Experience</p>
                    </div>
                    
                    <div className="flex gap-5 items-center lg:px-14 px-7">
              <p className="text-3xl font-bold w-[75px]">250</p>
              <p className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </p>
            </div>

                </div>


            </div>


        </div>
    </div>
  )
}

export default TimelineSection