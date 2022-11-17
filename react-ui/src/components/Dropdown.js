import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdClear, MdOutlineClear } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
function Dropdown({ filter, setFilter }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="border inline-flex gap-2 justify-center w-full px-4 py-2 text-sm font-medium  rounded-md bg-opacity-20 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <IoFilterSharp className="w-5 h-5 " aria-hidden="true" />
          Filter
          <IoMdArrowDropdown className="w-5 h-5 " aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("authorized")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "authorized" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  Authorized
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("initiated")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "initiated" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  Initiated
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("successful")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "successful" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  Successful
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("returned")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "returned" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  Returned
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("cancelled")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "cancelled" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  Cancelled
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-amber-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={(e) => setFilter("")}
                >
                  <span
                    className={`mr-2 ${
                      filter == "" ? "text-gray-600" : "text-gray-200"
                    }`}
                  >
                    <MdClear />
                  </span>
                  Clear
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
