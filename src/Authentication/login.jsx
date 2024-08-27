/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TbMessageChatbot } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import EndPoints from '../Api/baseUrl/endPoints';
import { useForm } from "react-hook-form";
import { Success, Error } from '../components/toasts';
import { setToken } from '../utils/helpers';
import { useAuth } from '../providers/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUser } = useAuth();
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            const { data } = await EndPoints.Auth.login(values);
            if(data.message == "Login successful"){
                Success(data.message)
                setToken(data.access_token)
                setUser(data.user);
                navigate("/home");
                
            }else{
                throw new Error(data.message)
            }
        } catch (error) {
            Error(error?.response?.data?.message || "Something happened")
        }
    };

    return (
        <section className="flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
                    <p className="mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
                        ipsa culpa autem, at itaque nostrum!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required", minLength: 6 })}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            No account?
                            <Link className="underline ml-1" to="/register">Sign up</Link>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 bg-gray-800 flex items-center justify-center">
                <TbMessageChatbot className="text-white" style={{ fontSize: '15rem' }} />
            </div>
        </section>
    );
};

export default Login;