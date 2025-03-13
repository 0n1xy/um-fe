// import React from "react";

// interface ButtonProps {
//   text: string;
//   onClick: () => void;
// }

// const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//     >
//       {text}
//     </button>
//   );
// };

// export default Button;

import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean; // ✅ Thêm hỗ trợ prop disabled
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
