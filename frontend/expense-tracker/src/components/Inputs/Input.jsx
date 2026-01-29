import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="">
            <label className="text-[13p] text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    // type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    type={type === 'password' && showPassword ? 'text' : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="w-full bg-transparent outline-none"
                />

                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;
