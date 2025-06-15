
import React from 'react';

interface FormBlockProps {
  title: string;
  fields: string;
  submitText: string;
  bgColor: string;
  textColor: string;
  inputBgColor: string;
  buttonColor: string;
  buttonTextColor: string;
  maxWidth: string;
  padding: string;
}

export const FormBlockTemplate: React.FC<FormBlockProps> = ({
  title,
  fields,
  submitText,
  bgColor,
  textColor,
  inputBgColor,
  buttonColor,
  buttonTextColor,
  maxWidth,
  padding
}) => {
  const fieldList = fields.split(',').map(field => field.trim()).filter(field => field);

  return (
    <div style={{ backgroundColor: bgColor, color: textColor }} className={`w-full ${padding}`}>
      <div className={`${maxWidth} mx-auto`}>
        <form className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          {fieldList.map((field, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium">{field}</label>
              <input
                type={field.toLowerCase().includes('email') ? 'email' : field.toLowerCase().includes('password') ? 'password' : 'text'}
                style={{ backgroundColor: inputBgColor, color: textColor }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter your ${field.toLowerCase()}`}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            className="w-full py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
};
