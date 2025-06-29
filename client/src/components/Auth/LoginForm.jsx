import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import {useNavigate, Link} from 'react-router-dom';

const LoginForm = () => {

    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError]=useState('');
    const [emailError, setEmailError]=useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email)=>{
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');
        setEmailError('');

        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
          }
        
        try{
            const res = await dispatch(login(formData));
            if(res.meta.requestStatus === 'fulfilled'){
                navigate('/');
            }else if(res.meta.requestStatus === 'rejected'){
                setError(res.payload || 'Invalid Credentials !')
            }
        }catch(err){
            console.error('Login failed. Try again');
            setError('Login failed. Please try again.');
        }
        
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
              Manage your leaves efficiently
          </p>
        </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
      <label htmlFor="email-address" className="sr-only">
          Email address
      </label>
      <input
        id="email-address"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${emailError ? 'border-red-500 placeholder-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'} text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm`}
      />
      </div>
      
      {emailError && <p className="text-red-500 text-xs mt-1 mb-2">{emailError}</p>}
      <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      </div>
      </div>
        {error && <p className="text-red-500 text-xs mt-1 mb-2">{error}</p>}
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >Login</button>
      </div>
    </form>
    <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Don't have an account?{' '}
            <Link 
                to="/register" 
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Sign up here
            </Link>
            </p>
        </div>
    </div>
    </div>
  )
}

export default LoginForm