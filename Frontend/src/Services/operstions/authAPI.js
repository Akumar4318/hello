import { setLoading } from "../../Slice/authSlice";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setToken } from "../../Slice/authSlice";
import { setUser } from "../../Slice/profileSlice"
import { endpoints } from "../api";
import { useNavigate } from "react-router-dom";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// Funtion for send otp

export function sendOtp(email, navigate) {
 
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      // console.log("SENDOTP API RESPONSE............", response);

     

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP send successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Funciton for singUP

export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){

    return async(dispatch)=>{

            const toastId=toast.loading("Loading...")
            dispatch(setLoading(true))

            try {
                
                const response =await apiConnector("POST",SIGNUP_API,{
                    accountType,
                    firstName,
                    lastName,
                    email,
                    confirmPassword,
                    password,
                    otp,

                })

                // console.log("SIGNUP API RESPONSE............", response)
                // console.log("hello from reseponse  signupdata",response.data.success);

                if(!response.data.success){
                    throw new Error (response.data.message)
                }

                toast.success("Signup Successful")
                navigate('/login')

            } catch (error) {
                console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
            }

            dispatch(setLoading(false))
            toast.dismiss(toastId)
    }
}

// function for passwordreset Token

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      // console.log("RESET PASSWOR  TOKEN RESPONSE ....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR");
      console.log(error);
      toast.error("Failed to send email for reseting the passowrd");
    }
    dispatch(setLoading(false));
  };
}

// function for resetPassword

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      // console.log("RESET PASSOWRD RESPONSE ...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      // console.log("Unbale reset Password");
      console.log(error);
      toast.error("Failed to reset the  passowrd");
    }
    dispatch(setLoading(true));
  };
}


// function for login

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
