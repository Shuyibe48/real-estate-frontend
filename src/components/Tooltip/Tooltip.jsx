const Tooltip = ({ children, tooltipText }) => {
  return (
    <div className="relative group">
      <h1 className="text-lg font-bold cursor-pointer">{children}</h1>
      <div className="absolute w-[200px] bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-light">{tooltipText}</span>
      </div>
    </div>
  );
};

export default Tooltip;
