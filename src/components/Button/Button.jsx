const Button = ({text}) => {
  return (
    <button className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold">
      {text}
    </button>
  );
};

export default Button;
