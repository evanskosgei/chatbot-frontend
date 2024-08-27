/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import EndPoints from '../../Api/baseUrl/endPoints';
import { Error, Success } from '../../components/toasts';
import { Link } from 'react-router-dom';
import { IoSearchOutline, IoAdd } from "react-icons/io5";
const Home = () => {
    const [contacts, setContacts] = useState([])
    const currentTime = new Date();
    const hours = currentTime.getHours();

    let greeting;
    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const fetch_new_contacts = async () => {
        try {
            const { data } = await EndPoints.contacts.fetch_contacts({ status: 1 })
            if (data.status == "success") {
                setContacts(data.contacts)
            }
        } catch (error) {
            Error(error.response.data.error || "Something went wrong!")
        }

    }
    useEffect(() => {
        fetch_new_contacts()
    }, [])

    const delete_contact = async (id) => {
        try {
            const { data } = await EndPoints.contacts.delete_contacts(id)
            Success(data)
            fetch_new_contacts()
        } catch (error) {
            Error(error.response.data.error)
        }
    }
    const move_to_business = async (id) => {
        try {
            const { data } = await EndPoints.contacts.move_contacts_to_business(id)
            Success(data)
            fetch_new_contacts()
        } catch (error) {
            Error(error.response.data.error)
        }
    }
    return (
        <div className="bg-white rounded-lg ">
            <h1 className="text-3xl font-bold mb-2">{greeting}!</h1>
            <p className="text-lg text-gray-600 mb-6">Here&apos;s we&apos;re going to display all contacts</p>

            <div className="flex items-center justify-between max-w-lg mx-auto my-4">
                <div className="relative flex-grow mr-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IoSearchOutline className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        id="voice-search"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2.5 transition duration-150 ease-in-out"
                        placeholder="Search contacts..."
                        required
                    />
                </div>
                <Link
                    to="add-contacts"
                    className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-150 ease-in-out"
                >
                    <IoAdd className="w-5 h-5 mr-2" />
                    Add New Contact
                </Link>
            </div>

            <div className="relative overflow-x-auto border">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase bg-gray-200 ">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50 ">

                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                    {contact.id}
                                </th>
                                <td className="px-6 py-4">
                                    {contact.phone_number}
                                </td>
                                <td className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-6 py-4">
                                    <Link onClick={() => move_to_business(contact.id)}>In-Business</Link>
                                </td>
                                <td className="font-medium text-red-600 dark:text-red-500 hover:underline px-6 py-4">
                                    <Link onClick={() => delete_contact(contact.id)}>Remove</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;