import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Dropdown from "./components/Dropdown";
import { IoFilterSharp } from "react-icons/io5";
import { BiExport } from "react-icons/bi";

const url = "http://127.0.0.1:8000/transactions/";
let timeout;

function App() {
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState([]);
  const [sortAmount, setSortAmount] = useState("asc");
  const [sortStatus, setSortStatus] = useState("asc");
  const [sortSource, setSortSource] = useState("asc");
  const [filter, setFilter] = useState("");

  const fetchData = (u, params = {}) => {
    axios
      .get(u, {
        params: params,
      })
      .then((res) => {
        const data = res?.data;
        if (data) {
          setNext(data?.next);
          setPrevious(data?.prev);
          setData(data?.data);
          if (data?.page_no) setPageNo(data?.page_no);
          else setPageNo(0);
          if (data?.count) setCount(data?.count);
          else setCount(0);
        }
      });
  };
  useEffect(() => {
    fetchData(url);
    return () => {};
  }, []);

  useEffect(() => {
    fetchData(url, { filter: filter });
    return () => {};
  }, [filter]);

  const sortHandler = (e, type) => {
    if (type == "amount") {
      setSortAmount((prev) => {
        if (prev == "asc") {
          setData((pr) => {
            return pr.sort((a, b) => b.gross_amount - a.gross_amount);
          });
          return "desc";
        } else {
          setData((pr) => {
            return pr.sort((a, b) => a.gross_amount - b.gross_amount);
          });
          return "asc";
        }
      });
    } else if (type == "status") {
      setSortStatus((prev) => {
        if (prev == "asc") {
          setData((pr) => {
            return pr.sort((a, b) => b.status.localeCompare(a.status));
          });
          return "desc";
        } else {
          setData((pr) => {
            return pr.sort((a, b) => a.status.localeCompare(b.status));
          });
          return "asc";
        }
      });
    } else if (type == "source") {
      setSortSource((prev) => {
        if (prev == "asc") {
          setData((pr) => {
            return pr.sort((a, b) => b.source.localeCompare(a.source));
          });
          return "desc";
        } else {
          setData((pr) => {
            return pr.sort((a, b) => a.source.localeCompare(b.source));
          });
          return "asc";
        }
      });
    }
  };
  return (
    <div className="App px-32 py-16">
      <div className="flex">
        <div className="my-auto w-full grid grid-cols justify-items-start">
          <input
            className="py-2 px-3 text-sm appearance-none border  h-9 border-gray-300 
            focus:outline-none focus:border-gray-400 focus:shadow-md transition duration-100 ease-out mb-8 w-72"
            type="text"
            name="name"
            id="name"
            placeholder="Search here"
            required
            onChange={(e) => {
              let value = e.target.value;
              if (timeout) {
                clearTimeout(timeout);
              }
              timeout = setTimeout(() => {
                fetchData(url, { search: value });
              }, 700);
            }}
          />
        </div>
        <div className="flex gap-4">
          <Dropdown filter={filter} setFilter={setFilter} />
          <div>
            <button
              onClick={() => {
                window.open("http://127.0.0.1:8000/download/");
              }}
              className="px-4 py-[6px] text-sm  justify-center align-middle border rounded-md bg-opacity-20 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <div className="inline-flex gap-2 my-auto">
                <BiExport className="w-5 h-5" aria-hidden="true" />
                <span className="mt-[2px]">Export</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <table className="min-w-full">
        <thead className="border-b">
          <tr className="text-sm font-medium text-gray-900">
            <th scope="col" className=" px-6 py-4">
              Date
            </th>
            <th scope="col" className="px-6 py-4">
              <div className=" flex items-center w-32 mx-auto">
                <span>Gross Amount</span>
                <span className="ml-2 text-lg flex-none cursor-pointer">
                  {sortAmount == "asc" ? (
                    <IoMdArrowDropup
                      onClick={(e) => sortHandler(e, "amount")}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      onClick={(e) => sortHandler(e, "amount")}
                    />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-2">
              <div className=" flex items-center w-16 mx-auto">
                <span>Status</span>
                <span className="ml-2 text-lg flex-none cursor-pointer">
                  {sortStatus == "asc" ? (
                    <IoMdArrowDropup
                      onClick={(e) => sortHandler(e, "status")}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      onClick={(e) => sortHandler(e, "status")}
                    />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" className="px-6 py-2">
              Customer
            </th>

            <th scope="col" className="px-6 py-2">
              Swifter ID
            </th>

            <th scope="col" className="px-6 py-2">
              External ID
            </th>

            <th scope="col" className="px-6 py-2">
              <div className=" flex items-center w-16 mx-auto">
                <span>Source</span>
                <span className="ml-2 text-lg flex-none cursor-pointer">
                  {sortSource == "asc" ? (
                    <IoMdArrowDropup
                      onClick={(e) => sortHandler(e, "source")}
                    />
                  ) : (
                    <IoMdArrowDropdown
                      onClick={(e) => sortHandler(e, "source")}
                    />
                  )}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => {
            let textColor = "text-blue-600";
            let bgColor = "bg-blue-100";
            if (v?.status == "returned") {
              textColor = "text-red-600";
              bgColor = "bg-red-100";
            } else if (v?.status == "authorized") {
              textColor = "text-amber-600";
              bgColor = "bg-amber-100";
            } else if (v?.status == "successful") {
              textColor = "text-green-600";
              bgColor = "bg-green-100";
            } else if (v?.status == "cancelled") {
              textColor = "text-gray-600";
              bgColor = "bg-gray-100";
            }
            let status =
              v?.status?.charAt(0).toUpperCase() + v?.status?.slice(1);

            let so = v?.source;
            if (so == "ecommerce") so = "e-commerce";
            else if (so == "instore") so = "in-store";

            let source = so?.charAt(0).toUpperCase() + so?.slice(1);

            return (
              <tr
                className="border-b  text-gray-900 font-light text-sm"
                key={v.id}
              >
                <td className="px-6 py-4 whitespace-nowrap ">{v?.date}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  $ {v?.gross_amount}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${textColor} font-medium`}
                >
                  <span className={`${bgColor} px-1`}>{status}</span>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">{v?.customer}</td>
                <td className="px-6 py-2 whitespace-nowrap">{v?.swifter_id}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {v?.external_id}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">{source}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex mt-8 justify-between text-sm font-light">
        {pageNo > 0 && (
          <span>
            Viewing {pageNo > 0 ? (pageNo - 1) * 15 + 1 : 0} to{" "}
            {pageNo > 0 ? (pageNo - 1) * 15 + data.length : 0} of {count}
          </span>
        )}
        <div className="flex gap-4">
          {previous && (
            <button
              onClick={() => {
                if (previous) fetchData(previous);
              }}
              className=" border-2 px-4 py-2"
            >
              Previous
            </button>
          )}
          {next && (
            <button
              onClick={() => {
                if (next) fetchData(next);
              }}
              className="border-2 px-4 py-2"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
