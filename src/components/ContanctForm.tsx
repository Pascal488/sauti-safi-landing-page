import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from './FormInput';

export default function ContactForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        speciality: '',
        country: 'Tanzania',
        region: '',
        email: '',
        phone: '',
        agreeToTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
           
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Form submitted:', formData);
            navigate('/thank-you', {
                state: {
                    name: formData.firstName,
                    email: formData.email
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full py-16 px-4 md:px-8 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
 
                <div className="flex flex-col ">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 ">
                        <span className="text-slate-800 block">Join us in </span>
                        <span className="text-indigo-600">transforming</span>
                        <br />
                        <span className="text-indigo-500">healthcare</span>
                    </h2>
                </div>

 
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
     
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />

                            <FormInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                            />
                        </div>

                        <FormInput
                            id="speciality"
                            name="speciality"
                            type="text"
                            label="Speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            placeholder="Speciality"
                            required
                            fullWidth
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                id="country"
                                name="country"
                                type="text"
                                label="Country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Country"
                                required
                            />

                            <FormInput
                                id="region"
                                name="region"
                                type="text"
                                label="Region / State"
                                value={formData.region}
                                onChange={handleChange}
                                placeholder="Region / State"
                            />
                        </div>

                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@address.com"
                            required
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
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-3 rounded-r-md bg-stone-100 border-0 focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 rounded"
                                    required
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
                            disabled={isSubmitting}
                            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${isSubmitting
                                    ? 'bg-indigo-300 cursor-not-allowed'
                                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
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