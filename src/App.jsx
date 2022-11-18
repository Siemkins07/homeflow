import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import PropertyCard from "./PropertyCard";

function App() {
  const [properties, setProperties] = useState([]);
  const [inputText, setInputText] = useState("");

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);
  const preventForSecondFetchRef = useRef(false);

  useEffect(() => {
    if (preventForSecondFetchRef.current) return;
    preventForSecondFetchRef.current = true;
    const fetchPropertyData = async () => {
      const response = await fetch("/property-data.json");
      const json = await response.json();
      setProperties(json.result.properties.elements);
    };

    fetchPropertyData();
  }, [properties, inputText]);

  const inputHandleSearch = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  const addNewOrDelete = (arrayWithProperties, singleProp) => {
    const presentInArray = arrayWithProperties.includes(singleProp);
    if (!presentInArray) {
      const addNewToArray = [...arrayWithProperties];
      addNewToArray.push(singleProp);
      return addNewToArray;
    } else {
      return arrayWithProperties.filter((property) => property !== singleProp);
    }
  };

  const bookmarksHandler = (property) => {
    setSavedProperties((item) => addNewOrDelete(item, property));
  };

  console.log(savedProperties);

  return (
    <div className="container mx-auto my-5">
      <Header inputHandleSearch={inputHandleSearch} />

      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!properties &&
          properties.map((property) => {
            const isIncludedTextInShortDescription =
              property.short_description.includes(inputText.toLowerCase());
            if (inputText === "" || isIncludedTextInShortDescription) {
              return (
                <PropertyCard
                  key={property.property_id}
                  property={property}
                  bookmarksHandler={bookmarksHandler}
                />
              );
            }
          })}
        ;
      </div>
    </div>
  );
}

export default App;
