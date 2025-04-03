import FormInput from './FormInput';
import EmailIcon from "../assets/EmailIcon.svg"
import CallUsIcon from "../assets/CallUsIcon.svg"

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, object, string } from 'yup';


export const ContactFormSchema = object().shape({
    email: string().email().required("Email is required"),
    firstName: string().required("FirstName  is required"),
    lastName: string().required("LastName  is required"),
    speciality: string().required("Speciality  is required"),
    country: string().required("Country  is required"),
    region: string().required("Region  is required"),
    phone: string().required("PhoneNumber is required"),
    agreeToTerms: boolean().required("Please agree to terms and conditions")
})

export type TContactFormType = {
    email: string;
    firstName: string;
    lastName: string;
    speciality: string;
    country: string;
    region: string;
    phone: string;
    agreeToTerms: boolean;
};

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const { handleSubmit, register, reset } = useForm({
        resolver: yupResolver(ContactFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            speciality: '',
            country: 'Tanzania',
            region: '',
            email: '',
            phone: '',
            agreeToTerms: false
        }
    })

    const onSubmit: SubmitHandler<TContactFormType> = (data) => {

        setIsSubmitting(true);
        navigate('/thank-you', {
            state: {
                name: data.firstName,
                email: data.email
            }
        });
        setIsSubmitting(false);
        reset()


    };

    return (
        <div className="w-full py-16 px-4 md:px-8 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="flex flex-col  gap-5">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 ">
                        <span className="text-slate-800 block">Join us in </span>
                        <span className="text-indigo-600">transforming</span>
                        <br />
                        <span className="text-indigo-500">healthcare</span>
                    </h2>
                    <p>
                        Have a question or want to work together?
                        Drop us a message and we will get back to you as soon as possible.
                    </p>
                    <div className='bg-[#F8F5EF66] flex   gap-5 p-5 w-[55%]  rounded-2xl'>
                        <div className='flex justify-center bg-[#6D63FF1A] rounded-full h-12 w-12'>
                                <img src={EmailIcon} alt=""  className=' self-center'/>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <span>Email</span>
                            <span>office@voith.ai</span>
                        </div>
                    </div>
                    <div className='bg-[#F8F5EF66] flex  gap-5 w-[55%] p-5 rounded-2xl'>
                        <div className='flex justify-center bg-[#6D63FF1A] rounded-full h-12 w-12'>
                                <img src={CallUsIcon} alt=""  className=' self-center'/>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <span>Call Us</span>
                            <span>+44 7398 362552</span>
                        </div>
                    </div>
                </div>


                <div className='p-8   rounded-2xl shadow-[-5px_18px_55px_45px_rgba(0,_0,_0,_0.1)]'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                type="text"
                                label="First Name"
                                {...register("firstName")}
                                placeholder="First Name"
                            />

                            <FormInput
                                type="text"
                                label="Last Name"
                                {...register("lastName")}
                                placeholder="Last Name"
                            />
                        </div>

                        <FormInput
                            type="text"
                            label="Speciality"
                            {...register("speciality")}
                            placeholder="Speciality"
                            fullWidth
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                type="text"
                                label="Country"
                                {...register("country")}
                                placeholder="Country"
                            />

                            <FormInput
                                type="text"
                                label="Region / State"
                                {...register("region")}
                                placeholder="Region / State"
                            />
                        </div>

                        <FormInput
                            type="email"
                            label="Email address"
                            {...register("email")}
                            placeholder="email@address.com"
                            fullWidth
                        />


                        <div>
                            <label htmlFor="phone" className="block mb-1 text-slate-700">
                                Phone number
                            </label>
                            <div className="flex">
                                <div className="flex items-center px-4 py-3 bg-stone-100 rounded-l-md text-gray-600">
                                    + 255
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    {...register("phone")}
                                    className="flex-1 px-4 py-3 rounded-r-md bg-stone-100 border-0 focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    {...register("agreeToTerms")}
                                    className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 rounded"
                                />
                                <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-600">
                                    By using this product, you acknowledge and agree to abide by the{' '}
                                    <Link to="/terms" className="text-indigo-600 hover:text-indigo-800">
                                        Terms of Use & Privacy Policy
                                    </Link>.
                                    Please ensure you review and understand the terms before proceeding.
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            // disabled={isSubmitting}
                            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${isSubmitting
                                ? 'bg-indigo-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#0A9964] via-purple-400 to-pink-500'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}