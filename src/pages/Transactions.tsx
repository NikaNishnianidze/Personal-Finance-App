import searchIcon from "../../public/assets/images/icon-search.svg";
import sortIcon from "../../public/assets/images/icon-sort-mobile.svg";
import filterIcon from "../../public/assets/images/icon-filter-mobile.svg";
import { useUser } from "../context/UserProvider";
import { useEffect, useState } from "react";
import caretLeft from "../../public/assets/images/icon-caret-left.svg";
import caretRight from "../../public/assets/images/icon-caret-right.svg";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function Transactions() {
  const { finance, setFinance } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [search, setSearch] = useState<string>("");
  const transactionsPerPage = 9;
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const filteredTransactions = finance.transactions.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
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

  return (
    <div className="flex flex-col items-center pt-[33px] px-[16px]">
      <p className="text-[32px] w-[343px] text-[#201F24] font-bold leading-[120%]">
        Transactions
      </p>
      <div className="main-container py-[24px] px-[20px] bg-white rounded-[12px] mt-[41px] w-[343px] mb-[60px]">
        <div className="filters flex items-center gap-[24px]">
          <div className="search flex justify-between w-[215px] px-[15px] rounded-[8px] border-[#98908B] border-[1px]">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-[143px] py-[12px] outline-none text-[14px] text-[#98908B] font-normal leading-[150%]"
              placeholder="Search transaction"
            />
            <img src={searchIcon} alt="search icon" />
          </div>
          <div className="sort">
            <img src={sortIcon} alt="sort icon" />
          </div>
          <div className="categoryfilter">
            <img src={filterIcon} alt="filter icon" />
          </div>
        </div>
        <div className="transactions-box flex flex-col items-center justify-center">
          <div className="list-of-transactions mt-[35.5px] flex flex-col gap-[20px]">
            {currentTransactions.map((item, index) => (
              <div key={index}>
                <div className="transaction w-[303px] flex items-center justify-between mb-[20px]">
                  <div className="photo-name flex items-center gap-[16px]">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-[32px] h-[32px] rounded-[50%]"
                    />
                    <div className="name-category flex flex-col">
                      <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                        {item.name}
                      </p>
                      <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="profit flex flex-col gap-[8px]">
                    <p
                      className={`text-[14px] font-bold leading-[150%] ${
                        item.amount < 0 ? "text-[#201F24]" : "text-[#277C78]"
                      }`}
                    >
                      {item.amount < 0
                        ? `-$${Math.abs(item.amount).toFixed(2)}`
                        : `$${item.amount.toFixed(2)}`}
                    </p>
                    <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                      {formatter.format(new Date(item.date))}
                    </p>
                  </div>
                </div>
                <div className="divider w-[303px] h-[1px] bg-divider"></div>
              </div>
            ))}
          </div>

          <div className="pagination flex justify-center gap-[8px] mt-[20px] ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-[12px] py-[8px] bg-[#fff] w-[40px] h-[40px] rounded-[8px] text-[#696868] font-bold"
            >
              <img src={caretLeft} alt="" />
            </button>

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
                    className={`px-[12px] py-[8px] rounded-[8px] w-[40px] h-[40px] ${
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
              } else if (i === totalPages - 2 && currentPage < totalPages - 2) {
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

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-[12px] w-[40px] h-[40px] py-[8px] bg-[#F8F4F0] rounded-[8px] text-[#696868] font-bold"
            >
              <img src={caretRight} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
