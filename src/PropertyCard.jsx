import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import placeholderPhoto from "./images/placeholderPhoto_640.webp";

function PropertyCard({ property, bookmarksHandler }) {
  const [isSelected, setIsSelected] = useState(false);

  const selectHandler = () => {
    setIsSelected(!isSelected);
    bookmarksHandler(property);
  };

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        <img
          src={
            property.photos[0]
              ? `https://mr0.homeflow.co.uk/${property.photos[0]}`
              : placeholderPhoto
          }
          alt={property.display_address}
        />

        <button
          className="absolute top-0 right-2"
          title="Click to bookmark this property"
          onClick={selectHandler}
        >
          <FaBookmark
            className={isSelected ? "text-red-600" : "text-yellow-400"}
            size="40"
          />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">
          {property.price}
        </p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
