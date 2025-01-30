const Button = ({text}) => {
  return (
    <button className="bg-rose-500 hover:bg-rose-700 text-white px-5 py-[7px] rounded-md transition duration-500 font-semibold">
      {text}
    </button>
  );
};

export default Button;
