import Footer from "../Components/common/Footer"
import ReviewSlider from "../Components/common/ReviewSlider"
import ContactUsForm from "../Components/ContactPage/ContactUsForm"





const Contact = () => {
    return (
     
     <>
      <div>
        <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
          {/* Contact Details */}
          
          {/* Contact Form */}
          <div className="lg:w-[100%]">
            <ContactUsForm />
          </div>
        </div>
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          {/* Reviws from Other Learner */}
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
          <ReviewSlider />
        </div>
       
      </div>

      <div className="w-full">
      <Footer />
      </div>
     </>
    )
  }
  
  export default Contact