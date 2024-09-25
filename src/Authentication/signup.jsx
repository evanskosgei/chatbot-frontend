/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TbMessageChatbot } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EndPoints from '../Api/baseUrl/endPoints';
import { Success, Error } from '../components/toasts';
import { setToken } from '../utils/helpers';
import { useAuth } from '../providers/AuthProvider';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const onSubmit = async (values) => {
        const formData = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        try {
            const { data } = await EndPoints.Auth.register(formData);
            Success(data.message);
            setToken(data.access_token);
            setUser(data.user);
            navigate('/home');
        } catch (error) {
            console.log(error)
            Error(error.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-wrap lg:h-screen overflow-y-scroll lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
                    <p className="mt-4 text-gray-500">
                        Join our community and start your journey with us. Sign up now to access all our features!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="username" className="text-gray-800 text-[15px] mb-2 block">User Name</label>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className="w-full rounded-lg border border-gray-600 outline-none p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter username"
                        />
                        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="email" className="text-gray-800 text-[15px] mb-2 block">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full rounded-lg border border-gray-600 outline-none p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="text-gray-800 text-[15px] mb-2 block">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                                className="w-full rounded-lg border border-gray-600 outline-none p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                            >
                                {showPassword ? <FaRegEyeSlash className="size-4 text-gray-400" /> : <FaRegEye className="size-4 text-gray-400" />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="text-gray-800 text-[15px] mb-2 block">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === getValues("password") || "Passwords do not match"
                                })}
                                className="w-full rounded-lg border border-gray-600 outline-none p-4 pe-12 text-sm shadow-sm"
                                placeholder="Confirm password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                            >
                                {showConfirmPassword ? <FaRegEyeSlash className="size-4 text-gray-400" /> : <FaRegEye className="size-4 text-gray-400" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Already have an account?
                            <Link className="underline ml-1" to="/">Login</Link>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-screen w-full sm:h-screen lg:h-screen bg-gray-800 text-white lg:w-1/2 flex items-center justify-center">
                <TbMessageChatbot className="text-9xl" style={{ fontSize: '15rem' }}  />
            </div>
        </div>
    );
};

export default Signup;