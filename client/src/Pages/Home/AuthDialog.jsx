import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Google as GoogleIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthDialog = ({ open, handleClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      onLoginSuccess(); // Callback after successful login
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLoginSuccess(); // Callback after successful Google login
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      onLoginSuccess(); // Callback after successful sign-up
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className="backdrop-blur-sm"
      PaperProps={{
        className: "rounded-3xl overflow-hidden",
      }}
    >
      <div className="relative w-full h-[650px] bg-gradient-to-b from-purple-700 to-indigo-900">
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div
            className={`absolute w-full h-full bg-white transition-transform duration-500 ${
              isLogin ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="text-gray-800 p-9">
              <h2 className="p-4 mb-1 text-3xl font-black text-center">Hi! Welcome Back</h2>
              <p className="text-sm text-center text-gray-600 mb-9">Login to access your account</p>
              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 px-4 mb-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-3 px-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
                />
                <div
                  className="absolute text-gray-600 cursor-pointer right-3 top-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
              <div className="flex items-center mb-7">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-600 text-md">
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 mb-4 text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Login
              </button>
              <div className="flex items-center justify-center my-5">
                <hr className="w-1/4 border-gray-500" />
                <span className="mx-1 text-gray-700 text-md">Or With</span>
                <hr className="w-1/4 border-gray-500" />
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <GoogleIcon className="mr-2" /> Login with Google
              </button>
              <div className="text-center">
                <button
                  onClick={toggleAuth}
                  className="text-purple-800 hover:underline"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={handleSignup}>
          <div
            className={`absolute w-full h-full bg-white transition-transform duration-500 ${
              isLogin ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <div className="p-8 text-gray-800">
              <h2 className="mb-2 text-3xl font-black text-center">Create an Account</h2>
              <p className="mb-4 text-sm text-center text-gray-600">
                Make your safar suffer free!
              </p>
              <input
                type="text"
                placeholder="User Name"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="w-full p-3 mb-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full p-3 mb-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                className="w-full p-3 mb-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-orange-600"
                />
                <div
                  className="absolute text-gray-600 cursor-pointer right-3 top-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                className="w-full p-3 mb-4 border-b-2 border-gray-300 outline-none focus:border-orange-600"
              />
              <button
                type="submit"
                className="w-full py-2 mb-3 text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Sign Up
              </button>
              <div className="flex items-center justify-center my-3">
                <hr className="w-1/4 border-gray-500" />
                <span className="mx-1 text-gray-700 text-md">Or With</span>
                <hr className="w-1/4 border-gray-500" />
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <GoogleIcon className="mr-2" /> Sign Up with Google
              </button>
              <div className="text-center">
                <button
                  onClick={toggleAuth}
                  className="text-purple-700 hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AuthDialog;