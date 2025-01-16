import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const Pin = ({ item }) => {
  return (
    <Marker position={[item?.latitude, item?.longitude]}>
      <Popup>
        <div className="flex justify-start items-start gap-2 min-w-[500px]">
          <img
            className="w-[150px] h-[80px] object-cover rounded-md"
            src={item?.images[0]}
            alt=""
          />
          <div className="flex flex-col items-start gap-1 max-w-[150px]">
            <Link
              to={`/list/${item?._id}`}
              className="text-blue-500 font-semibold text-sm line-clamp-2"
            >
              {item?.title}
            </Link>
            <span className="text-gray-600 text-xs">
              {item?.bedrooms} bedrooms
            </span>
            {item?.price && (
              <b className="text-green-600 text-base">
                $ {item?.price?.toLocaleString()}
              </b>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
