/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
    const { user, setUser } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    return (
        <>
            <nav className="bg-slate-200 border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            <span className="font-extrabold text-white bg-green-800 p-2 rounded-full" style={{ width: '2rem', height: '2rem', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>V</span>
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
                        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col sm:flex sm:flex-row font-medium mt-0 space-y-4 sm:space-y-0 sm:space-x-8 rtl:space-x-reverse text-md w-full sm:w-auto`}>
                            <li>
                                <Link to="/home" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/home/in-business-contacts" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">In Business</Link>
                            </li>
                            <li>
                                <Link to="/home/deleted-contacts" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">Deleted</Link>
                            </li>
                            <li>
                                <Link to="/home/send-messages" className="text-gray-900 hover:underline focus:text-blue-500 active:text-blue-500">Send Message(s)</Link>
                            </li>
                        </ul>

                        <button
                            onClick={toggleMenu}
                            className="sm:hidden text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg p-2 ml-auto"
                        >
                            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;