const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} px-6 py-2 rounded-full font-bold transition-all shadow-md active:scale-95 w-full`}
    >
      {text}
    </button>
  );
};

export default Button;