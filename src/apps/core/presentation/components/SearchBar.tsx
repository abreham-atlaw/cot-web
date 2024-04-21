import { MdSearch, MdSettings } from "react-icons/md";

function SearchBar() {
  return (
    <div className="p-4 flex  border-b border-gray-300 fixed top-0 left-72 w-full lg:w-calc lg:left-72 z-20 ">
      <div className="relative flex w-2/5  mr-44">
        <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
        <input
          className="w-full bg-gray-200 border-none rounded-lg pl-12 py-4 text-lg"
          type="text"
          placeholder="Search...."
          
        />
        
      </div>
      <span className="flex items-center">
        <MdSettings className="text-2xl mr-4" />
        <h2>Organization Name</h2>
      </span>
    </div>
  );
}

export default SearchBar;
