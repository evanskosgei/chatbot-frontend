/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
    const { user, setUser } = useAuth()
    return (
        <>
            <nav className="bg-slate-200 border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            <span className="font-extrabold text-white bg-red-500 p-2 rounded-full" style={{ width: '2rem', height: '2rem', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>V</span>
                            write
                        </span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <h1 className="text-md font-bold text-gray-950">{user.username}</h1>
                        <Link onClick={() => setUser(null)} className="text-lg text-blue-600 hover:underline flex items-center">
                            <AiOutlineLogout />Logout</Link>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center font-semibold text-lg">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <a href="/home" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/home/in-business-contacts" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">In Business</a>
                            </li>
                            <li>
                                <a href="/home/deleted-contacts" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">Deleted</a>
                            </li>
                            <li>
                                <a href="/home/send-messages" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">Send Message(s)</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;