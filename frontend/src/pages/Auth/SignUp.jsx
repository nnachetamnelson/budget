import React, {  useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate, Link } from 'react-router-dom';
import Inputs from '../../components/Inputs/Inputs';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/profilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setfullName] = useState('');
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(UserContext);
    const [error, setError] = useState(null);
  
    const navigate = useNavigate();
    const handleSignUP =async (e) => {
      e.preventDefault();
      

      let profileImageUrl = "";


      if (!fullName) {
        setError('Please enter your name');
        return;
      }

          if (!validateEmail(email)) {
              setError('Please enter a valid email address.');
              return;
            }
        
            if (!password) {
              setError('Please enter the password.');
              return;
            }
      
            setError("");



            try {

              if (profilePic){
                const imguploadRes = await uploadImage(profilePic);
                profileImageUrl= imguploadRes.imageUrl || "";
              }
              const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
              });
        
              const { token, user } = response.data;
        
              if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard'); 
              }
            } catch (error) {
              if (error.response && error.response.data.message) {
                setError(error.response.data.message);
              } else {
                setError('Something went wrong. Please try again.');
              }
            }
        


    };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:mt-10 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUP}>
         < ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
         

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Inputs
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            label='full Name'
            placeholder="John Doe"
            type="text"
            
          />
               <Inputs
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            placeholder="example@example.com"
            type="text"
            
          />
          <div className='col-span-2'>
          <Inputs
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='password'
            placeholder="min 8 character"
            type="password"
            
          />
          </div>
        
          </div>

          {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}
                    <button type='submit' className='btn-primary '>
                      SIGN UP
                    </button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>
                      have an account?{" "}
                      <Link className='font-medium text-primary underline' to="/login">
                      Login
                      </Link>
                    </p>

        </form>
      </div>


    </AuthLayout>
  )
}

export default SignUp