/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import EndPoints from '../../Api/baseUrl/endPoints';
import { Success, Error } from '../../components/toasts';

const Add_contacts = () => {
    const [inputType, setInputType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [extractedNumbers, setExtractedNumbers] = useState([]);

    const handleInputTypeChange = (e) => {
        setInputType(e.target.value);
        setPhoneNumber('');
        setCsvFile(null);
        setExtractedNumbers([]);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
        if (file) {
            Papa.parse(file, {
                complete: (results) => {
                    const numbers = results.data.flat().filter(num => num.trim() !== '');
                    setExtractedNumbers(numbers);
                }
            });
        }
    };

    const handleDelete = () => {
        setPhoneNumber('');
        setCsvFile(null);
        setExtractedNumbers([]);
    };

    const handleSubmit = async () => {
        try {
            let contactsToSubmit;

            if (inputType === 'input') {
                if (!phoneNumber.trim()) {
                    Error("Please enter a phone number.");
                    return;
                }
                contactsToSubmit = [{ phone_number: phoneNumber.trim() }];
            } else if (inputType === 'csv') {
                if (extractedNumbers.length === 0) {
                    Error("No phone numbers found in the CSV file.");
                    return;
                }
                contactsToSubmit = extractedNumbers.map(number => ({ phone_number: number.trim() }));
            } else {
                Error("Please select an input type.");
                return;
            }

            const { data } = await EndPoints.contacts.create_contacts(contactsToSubmit);

            if (data.status === "success") {
                Success("Contacts added successfully!");
                setInputType('');
                setPhoneNumber('');
                setCsvFile(null);
                setExtractedNumbers([]);
            } else {
                Error(data.message || "Failed to add contacts.");
            }
        } catch (error) {
            console.error("Error submitting contacts:", error);
            Error(error.response?.data?.error || "An error occurred while adding contacts.");
        }
    };

    return (
        <div className="bg-white rounded-lg ">
            <div className='text-xl font-bold'>
                <Link onClick={() => window.history.back()} className='flex items-center'><GoArrowLeft /> Back</Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Add New Contacts</h1>
            <p className="text-lg text-gray-600 mb-6">Here&apos;s where we&apos;re going to add new contacts</p>

            <div className="">
                <div className="relative space-y-3 max-w-screen-md rounded-md bg-white">
                    <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Enter or Upload Phone Numbers</h1>
                    <div>
                        <select
                            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                            value={inputType}
                            onChange={handleInputTypeChange}
                        >
                            <option value="">Select the best input option</option>
                            <option value="input">Input Phone Number</option>
                            <option value="csv">Upload CSV</option>
                        </select>
                    </div>
                    {inputType === 'input' && (
                        <div>
                            <label className=""> Phone Number </label>
                            <input
                                type="text"
                                placeholder="+(555)245 76514"
                                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                    )}
                    {inputType === 'csv' && (
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <IoCloudUploadOutline className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV or xLs</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} accept=".csv,.xls,.xlsx" />
                            </label>
                        </div>
                    )}
                    {(phoneNumber || csvFile) && (
                        <button onClick={handleDelete} className='flex items-center text-red-500'>
                            <MdDelete className='h-6 w-6' />Delete
                        </button>
                    )}
                    {extractedNumbers.length > 0 && (
                        <div>
                            <p>Extracted numbers: {extractedNumbers.join(', ')}</p>
                        </div>
                    )}
                    <div>
                        <button
                            type="button"
                            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add_contacts;