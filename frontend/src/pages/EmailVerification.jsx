import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    // const navigate = useNavigate();
    const isLoading = false;

    const handleChange = (ind, value) => {
        const newCode = [...code];

        //handle pasted code
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[ind] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && ind < 5) {
                inputRefs.current[ind + 1].focus();
            }
        }
    };

    const handleKeyDown = (ind, e) => {
        if (e.key === "Backspace" && !code[ind] && ind > 0) {
            inputRefs.current[ind - 1].focus()
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        alert(`Code Submitted: ${verificationCode}`)
    }

    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit(new Event('submit'))
        }
    }, [code])

    return (
        <div className='max-w-md w-full bg-cyan-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='bg-cyan-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-cyan-400 text-transparent bg-clip-text'>
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        {code.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                type='text'
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                            />
                        ))}
                    </div>
                    <button
                        type='submit'
                        disabled={isLoading || code.some((digit) => !digit)}
                        className='w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50'
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmailVerification
