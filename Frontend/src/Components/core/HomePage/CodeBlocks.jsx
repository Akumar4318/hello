import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation} from "react-type-animation"

const CodeBlocks = ({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

        {/* section1 */}
        <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
            {heading}
            <div>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                
                <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active} >
                   <div className='flex items-center gap-2'>
                   {ctabtn1.btnText}
                   <FaArrowRight/>
                   </div>
                </CTAButton>

                <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active} >
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* section 2 entire code anitmation */}

        <div className="h-fit code-boder opacity-90 flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] border-2 border-richblack-300">

   
        {backgroundGradient}
        
        {/* Indexing */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>

    </div>
  )
}

export default CodeBlocks