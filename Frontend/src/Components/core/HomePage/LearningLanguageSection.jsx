/* eslint-disable no-unused-vars */
import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from '../HomePage/Button'
import { motion } from "framer-motion";
const LearningLanguageSection = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
        >
            <div className="text-4xl font-semibold text-center my-24 ">
                Your swiss knife for
                <HighlightText text={" learning any language"} />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3"
                >
                    Using spin making learning multiple languages easy. with 20+
                    languages realistic voice-over, progress tracking, custom schedule
                    and more.
                </motion.div>
                <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src={Know_your_progress}
                        alt=""
                        className="object-contain lg:-mr-32"
                        whileHover={{ scale: 1.05 }}
                    />
                    <motion.img
                        src={Compare_with_others}
                        alt=""
                        className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                        whileHover={{ scale: 1.05 }}
                    />
                    <motion.img
                        src={Plan_your_lessons}
                        alt=""
                        className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
                        whileHover={{ scale: 1.05 }}
                    />
                </motion.div>
            </div>
    
            <motion.div 
                className="w-fit mx-auto lg:mb-20 mb-8 -mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <CTAButton active={true} linkto={"/signup"}>
                    <div className="">Learn More</div>
                </CTAButton>
            </motion.div>
        </motion.div>
    );
};

export default LearningLanguageSection