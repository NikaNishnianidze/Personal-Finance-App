import searchIcon from "../../public/assets/images/icon-search.svg";
import sortIcon from "../../public/assets/images/icon-sort-mobile.svg";
import filterIcon from "../../public/assets/images/icon-filter-mobile.svg";
import { useUser } from "../context/UserProvider";
import { useEffect, useState } from "react";
import caretLeft from "../../public/assets/images/icon-caret-left.svg";
import caretRight from "../../public/assets/images/icon-caret-right.svg";
import caretDown from "../../public/assets/images/icon-caret-down.svg";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
const filterItems = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
];
export default function Transactions() {
  const { finance, setFinance } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<boolean>(false);
  const [sortIndex, setSortIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<boolean>(false);
  const [filterIndex, setFilterIndex] = useState<number | null>(null);
  const transactionsPerPage = 9;
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const filteredTransactions = finance.transactions
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        filterIndex === 0 || filterIndex === null
          ? true
          : item.category === filterItems[filterIndex];

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortIndex) {
        case 0:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 1:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 2:
          return a.name.localeCompare(b.name);
        case 3:
          return b.name.localeCompare(a.name);
        case 4:
          return b.amount - a.amount;
        case 5:
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    finance.transactions.length / transactionsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const sortItems = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];

  const handleSort = (i: number) => {
    setSortIndex(i);
    setSort(false);
  };
  const handleFilter = (i: number) => {
    setFilterIndex(i);
    setFilter(false);
  };

  return (
    <div className="flex flex-col items-center pt-[33px] px-[16px]">
      <p className="text-[32px] w-[343px] tb:w-[688px]  text-[#201F24] dk:w-[1060px] dk:ml-[300px] font-bold leading-[120%]">
        Transactions
      </p>
      <div className="main-container tb:mb-[100px] py-[24px] tb:p-[32px] tb:w-[688px] dk:w-[1060px] dk:ml-[300px] px-[20px] bg-white rounded-[12px] mt-[41px] w-[343px] mb-[60px]">
        <div className="filters mb:flex mb:items-center mb:gap-[24px] relative">
          {sort && (
            <div className="absolute w-[114px] bg-white py-[12px] top-14 right-0 tb:right-53 flex flex-col pl-[20px] rounded-[8px] shadow-sort">
              <p className="text-[#696868] text-[14px] font-normal ">Sort by</p>
              <div className="sort mt-[25px] flex flex-col gap-[25px]">
                {sortItems.map((item, i) => {
                  return (
                    <p
                      onClick={() => handleSort(i)}
                      key={i}
                      style={{ fontWeight: sortIndex == i ? 700 : 400 }}
                      className="text-[14px] text-[#201F24] font-normal"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
          {filter && (
            <div className="absolute top-15 right-0 w-[177px] py-[12px] px-[20px] bg-white shadow-sort rounded-[8px]">
              <p className="text-[#696868] font-normal text-[14px]">Category</p>
              <div className="filter max-h-[200px] overflow-y-auto flex flex-col gap-[25px] mt-[25px]">
                {filterItems.map((item, i) => {
                  return (
                    <p
                      style={{ fontWeight: filterIndex == i ? 700 : 400 }}
                      onClick={() => handleFilter(i)}
                      key={i}
                      className="text-[14px] font-normal text-[#201F24]"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
          <div className="search-filter-category mb:flex mb:items-center mb:gap-[24px] dk:justify-between dk:w-[996px]">
            <div className="search flex justify-between tb:w-[160px] w-[215px] px-[15px] rounded-[8px] border-[#98908B] border-[1px]">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-[143px] py-[12px] tb:w-[90px] outline-none text-[14px] text-[#98908B] font-normal leading-[150%]"
                placeholder="Search transaction"
              />
              <img src={searchIcon} alt="search icon" />
            </div>
            <div className="sort-filter mb:flex mb:items-center mb:gap-[24px]">
              <div
                onClick={() => setSort(!sort)}
                className="sort mb:block tb:hidden"
              >
                <img src={sortIcon} alt="sort icon" />
              </div>
              <div
                onClick={() => setSort(!sort)}
                className="sort-tb tb:block mb:hidden tb:flex tb:gap-[8px] tb:items-center"
              >
                <p className="text-[#696868] text-[14px] font-normal">
                  Sort by
                </p>
                <div className="w-[114px] py-[12px] gap-[16px] px-[20px] border-[1px] border-[#98908B] rounded-[8px] flex items-center">
                  <p className="text-[14px] text-[#201F24] font-normal">
                    {sortIndex !== null ? sortItems[sortIndex] : "Latest"}
                  </p>
                  <img src={caretDown} alt="caret down" />
                </div>
              </div>
              <div
                onClick={() => setFilter(!filter)}
                className="categoryfilter mb:block tb:hidden"
              >
                <img src={filterIcon} alt="filter icon" />
              </div>
              <div className="filter-category mb:hidden tb:block tb:flex tb:gap-[8px] tb:items-center">
                <p className="text-[14px] text-[#696868] font-normal">
                  Category
                </p>
                <div
                  onClick={() => setFilter(!filter)}
                  className="category w-[177px] py-[12px] px-[20px] border-[1px] flex items-center gap-[16px] border-[#98908B] rounded-[8px]"
                >
                  <p className="text-[14px] text-[#201F24] font-normal">
                    {filterIndex !== null
                      ? filterItems[filterIndex]
                      : "All Transactions"}
                  </p>
                  <img src={caretDown} alt="caret down" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basic-info tb:block mb:hidden tb:flex tb:items-center tb:justify-between tb:mt-[24px] tb:py-[12px] text-[#696868] text-[12px] font-normal">
          <div className="sender mr-auto text-left w-[272px] dk:w-[428px]">
            Recipient / Sender
          </div>
          <div className="category ml-auto text-left w-[80px] dk:w-[120px]">
            Category
          </div>
          <div className="date ml-auto text-left dk:text-right w-[88px] dk:w-[120px]">
            Transaction Date
          </div>
          <div className="amount  text-right w-[88px] dk:w-[170px] text-[12px] font-normal">
            Amount
          </div>
        </div>
        <div className="transactions-box flex flex-col items-center justify-center">
          <div className="list-of-transactions mt-[35.5px] flex flex-col gap-[20px]">
            {currentTransactions.map((item, index) => (
              <div key={index}>
                <div className="transaction w-[303px] flex items-center tb:w-[624px] dk:w-[996px] justify-between mb-[20px]">
                  <div className="photo-name flex items-center gap-[16px]">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-[32px] h-[32px] rounded-[50%]"
                    />
                    <div className="name-category mb:flex mb:flex-col tb:flex-row tb:gap-[152px]">
                      <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                        {item.name}
                      </p>
                      <p className="mb:block tb:hidden text-[#696868] text-[14px] font-normal leading-[150%]">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="profit flex flex-col tb:flex-row gap-[8px] tb:ml-[34px] tb:gap-[65px] dk:gap-[135px]">
                    <p className="text-[#696868] dk:w-[90px] dk:text-left tb:block mb:hidden text-[14px] font-normal leading-[150%]">
                      {item.category}
                    </p>
                    <p
                      className={`text-[14px] font-bold leading-[150%] tb:order-2 ${
                        item.amount < 0 ? "text-[#201F24]" : "text-[#277C78]"
                      }`}
                    >
                      {item.amount < 0
                        ? `-$${Math.abs(item.amount).toFixed(2)}`
                        : `$${item.amount.toFixed(2)}`}
                    </p>
                    <p className="text-[#696868] text-[12px] tb:order-1 font-normal leading-[150%]">
                      {formatter.format(new Date(item.date))}
                    </p>
                  </div>
                </div>
                <div className="divider w-[303px] tb:w-[624px] dk:w-[996px] h-[1px] bg-divider"></div>
              </div>
            ))}
          </div>

          <div className="pagination mb:flex mb:justify-center gap-[8px] mt-[20px] tb:justify-between tb:w-[624px] dk:w-[996px]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-[12px] py-[8px] bg-[#fff] border-[1px] tb:w-[94px] border-[#98908B] tb:flex tb:items-center tb:gap-[16px]  w-[40px] h-[40px] rounded-[8px] text-[#696868] font-bold"
            >
              <img src={caretLeft} alt="" />
              <span className="hidden tb:inline">Prev</span>
            </button>
            <div className="pages-mb mb:block tb:hidden gap-[8px]">
              {Array.from({ length: totalPages }, (_, i) => {
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  i === currentPage - 1 ||
                  i === currentPage ||
                  i === currentPage - 2
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-[12px] py-[8px] border-[1px] mr-3  border-[#98908B] rounded-[8px] w-[40px] h-[40px] ${
                        currentPage === i + 1
                          ? "bg-[#201F24] text-white"
                          : "bg-[#FFFFFF] text-[#98908B]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (i === 1 && currentPage > 3) {
                  return (
                    <span
                      key={i}
                      className="px-[12px] py-[8px] text-[#696868] font-bold"
                    >
                      ...
                    </span>
                  );
                } else if (
                  i === totalPages - 2 &&
                  currentPage < totalPages - 2
                ) {
                  return (
                    <span
                      key={i}
                      className="px-[12px] py-[8px] text-[#696868] font-bold"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <div className="pages mb:hidden tb:block">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-[12px] py-[8px] border-[1px] mr-3 border-[#98908B] rounded-[8px] w-[40px] h-[40px] ${
                    currentPage === i + 1
                      ? "bg-[#201F24] text-white"
                      : "bg-[#FFFFFF] text-[#98908B]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-[12px] border-[1px] tb:flex tb:items-center tb:gap-[16px] border-[#98908B] tb:w-[94px] w-[40px] h-[40px] py-[8px] bg-[#F8F4F0] rounded-[8px] text-[#696868] font-bold"
            >
              <span className="hidden tb:inline">Next</span>
              <img src={caretRight} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
