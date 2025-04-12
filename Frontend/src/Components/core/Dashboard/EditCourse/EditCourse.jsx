import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../Services/operstions/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../Slice/courseSlice'

const EditCourse = () => {

    const {course}=useSelector((state)=>state.course)
    const dispatch=useDispatch()
    const{courseId}=useParams()
   
    const[loading,setLoading]=useState(false)
    const{token}=useSelector((state)=>state.auth)


    useEffect(()=>{

        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId,token)
           
            
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
               
                dispatch(setCourse(result?.courseDetails))
                
            }
            setLoading(false)
        }

        populateCourseDetails()
    },[])

if(loading){
    return (
        <div>

        </div>
    )
}

  return (
    <div>
        <h1 className='text-white'>Edit Course</h1>
        <div>
            {
                course ? (<RenderSteps/>):(
                    <p>
                        course not found
                    </p>
                )
            }
        </div>
        
    </div>
  )
}

export default EditCourse