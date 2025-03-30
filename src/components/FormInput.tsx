import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type FormInputProps = React.ComponentProps<"input"> &  {
    id?: string;
    name?: string;
    type: string;
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    fullWidth?: boolean;
    register?: UseFormRegisterReturn;

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
    fullWidth = false,
    register,
    ...extra
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
                {...register} 
                {...extra}
            />
        </div>
    );
};

export default FormInput;