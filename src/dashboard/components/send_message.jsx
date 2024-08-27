/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { FaRegSmileBeam } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import EndPoints from '../../Api/baseUrl/endPoints';
import { Error } from '../../components/toasts';

const Send_message = () => {
    const [sendOption, setSendOption] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [contactOptions, setContactOptions] = useState([])

    const handleSendOptionChange = (e) => {
        setSendOption(e.target.value);
        setPhoneNumber('');
        setSelectedContacts([]);
    };

    const fetch_contacts = async () => {
        try {
            const { data } = await EndPoints.contacts.fetch_contacts({ status: 1 })
            if (data.status === "success") {
                const formattedContacts = data.contacts.map(contact => ({
                    value: contact.phone_number,
                    label: `${contact.phone_number}`
                }));
                setContactOptions(formattedContacts);
            }
        } catch (error) {
            Error(error.response?.data?.error || "An error occurred while fetching contacts");
        }
    }

    useEffect(() => {
        fetch_contacts()
    }, [])


    return (
        <div className="bg-white rounded-lg">
            <h1 className="text-3xl font-bold mb-2">Send Message(s)</h1>
            <p className="text-lg text-gray-600 mb-6">Here&apos;s where we&apos;re going to send single or multiple message(s)</p>
            <div className="">
                <div className="relative space-y-3 max-w-screen-md rounded-md bg-white ">
                    <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Send Messages to Phone Numbers</h1>

                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0" placeholder="Write a message..." required ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <FaRegSmileBeam className="w-4 h-4" />
                                    <span className="sr-only">Add emoji</span>
                                </button>
                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                    <IoMdAttach className="w-4 h-4" />
                                    <span className="sr-only">Attach file</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className='text-md font-bold'>Select Contacts to send to:</label>
                        <select
                            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                            value={sendOption}
                            onChange={handleSendOptionChange}
                        >
                            <option value="">Select the best input option</option>
                            <option value="single">Send to single person</option>
                            <option value="multiple">Send to Multiple</option>
                        </select>
                    </div>
                    {sendOption === 'single' && (
                        <div>
                            <label className=""> Phone Number </label>
                            <input
                                type="text"
                                placeholder="+(555)245 76514"
                                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    )}
                    {sendOption === 'multiple' && (
                        <div>
                            <label className="">Select Phone Numbers to send message</label>
                            <Select
                                isMulti
                                name="contacts"
                                options={contactOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedContacts}
                                onChange={setSelectedContacts}
                            />
                        </div>
                    )}
                    {(phoneNumber || selectedContacts.length > 0) && (
                        <button className='flex items-center text-red-500' onClick={() => { setPhoneNumber(''); setSelectedContacts([]) }}>
                            <MdDelete className='h-6 w-6' />Delete
                        </button>
                    )}
                    <div>
                        <button type="button" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Send_message;