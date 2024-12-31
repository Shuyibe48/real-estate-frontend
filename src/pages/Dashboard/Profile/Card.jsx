const Card = ({ title, description, icon }) => (
  <div className="p-6 bg-white shadow-md border cursor-pointer rounded-md flex items-start flex-col">
    <div className="w-12 h-12">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Card;
