import React from 'react';

interface FormInputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    fullWidth?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    name,
    type,
    label,
    value,
    onChange,
    placeholder,
    required = false,
    className = '',
    fullWidth = false
}) => {
    return (
        <div className={fullWidth ? 'w-full' : className}>
            <label htmlFor={id} className="block mb-1 text-slate-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-md bg-stone-100 border-0 focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default FormInput;