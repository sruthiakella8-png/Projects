import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function InputField({ label, type = 'text', name, value, onChange, error, placeholder,...rest}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-1">{label}</label>
      <div className="relative">

        <input
          type={isPassword && showPassword ? 'text' : type}
          name={name}
          value={value}
          maxLength={30}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 pr-10"
          {...rest}
          
        />
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default InputField;