import { useUser } from "../context/UserProvider";
import recurring from "../../public/assets/images/icon-recurring-bills.svg";
import { parseISO, isWithinInterval, addDays } from "date-fns";
import searchIcon from "../../public/assets/images/icon-search.svg";
import sortIcon from "../../public/assets/images/icon-sort-mobile.svg";
import redExcl from "../../public/assets/images/icon-bill-due.svg";
import { useState } from "react";
import caretDown from "../../public/assets/images/icon-caret-down.svg";

export default function Bills() {
  const { finance } = useUser();
  const [sort, setSort] = useState<boolean>(false);
  const [sortIndex, setSortIndex] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const sortItems = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];
  const recurringBills = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return t.recurring === true && d.getMonth() === 6;
  });
  const recurringAmount = recurringBills.map((item) => item.amount);
  const recurringTotal = recurringAmount.reduce((acc, item) => acc + item, 0);
  //month 8
  const bills = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return t.recurring === true && d.getMonth() === 7;
  });
  const billsAmount = bills.map((item) => item.amount);
  const billsTotal = billsAmount.reduce((acc, item) => acc + item, 0);

  const latestDate = finance.transactions.reduce((latest, tx) => {
    const txDate = parseISO(tx.date);
    return txDate > latest ? txDate : latest;
  }, new Date(0));
  const windowStart = addDays(latestDate, 1);
  const windowEnd = addDays(latestDate, 5);
  const recurringDueSoon = finance.transactions
    .filter((tx) => tx.recurring)
    .map((tx) => {
      const dayOfMonth = parseISO(tx.date).getDate();
      const dueDate = new Date(2024, 7, dayOfMonth);
      return {
        ...tx,
        dueDate,
      };
    })

    .filter((tx) =>
      isWithinInterval(tx.dueDate, { start: windowStart, end: windowEnd })
    );

  function formatDateWithSuffix(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate();

    const suffix = (n: number) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const month = date.toLocaleString("default", { month: "long" });
    return `${month} ${day}${suffix(day)}`;
  }
  function isPaidThisMonth(transaction: any, allTransactions: any[]) {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    return allTransactions.some((t) => {
      const tDate = new Date(t.date);
      return (
        !t.recurring &&
        t.name.toLowerCase().includes(transaction.name.toLowerCase()) &&
        Math.abs(t.amount) === Math.abs(transaction.amount) &&
        tDate.getMonth() === thisMonth &&
        tDate.getFullYear() === thisYear
      );
    });
  }
  function isDueSoon(dateStr: string) {
    const today = new Date();
    const day = new Date(dateStr).getDate();
    const dueThisMonth = new Date(today.getFullYear(), today.getMonth(), day);

    const diffTime = dueThisMonth.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= 3;
  }
  const duesoonTotal = recurringDueSoon.reduce((sum, tx) => sum + tx.amount, 0);

  const handleSort = (i: number) => {
    setSortIndex(i);
    setSort(false);
  };
  const getSortedBills = () => {
    let recurringTransactions = finance.transactions.filter((t) => t.recurring);
    if (search.trim() !== "") {
      recurringTransactions = recurringTransactions.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortIndex === null) return recurringTransactions;

    const sorted = [...recurringTransactions];

    switch (sortItems[sortIndex]) {
      case "Latest":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest":
        sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "A to Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Highest":
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest":
        sorted.sort((a, b) => a.amount - b.amount);
        break;
    }

    return sorted;
  };

  return (
    <div className="flex flex-col items-center pt-[32px] px-[16px] dk:ml-[300px]">
      <div className="recurring w-[343px] tb:w-[688px] dk:w-[1060px]">
        <p className="text-left text-[32px] font-bold text-[#201F24]">
          Recurring Bills
        </p>
      </div>
      <div className="desktop-postiioning dk:flex dk:gap-[25px] dk:mt-[41px]">
        <div className="total-summary dk:flex-col dk:mt-0 tb:flex tb:items-center tb:gap-[24px] tb:mt-[41px]">
          <div className="total-bills w-[343px] tb:w-[332px] flex items-center tb:flex-col tb:gap-[32px] tb:pt-[32px] tb:pl-[24px] tb:pb-[24px] tb:h-[204px] tb:mt-0 tb:items-start gap-[20px] rounded-[12px] bg-[#201F24] mt-[40px] py-[24px] px-[20px]">
            <div className="icon">
              <img src={recurring} alt="recuring icon" />
            </div>
            <div className="info flex flex-col ">
              <p className="text-[14px] text-white font-normal">Total bills</p>
              <p className="text-[32px] font-bold text-white">
                ${Math.abs(recurringTotal).toFixed(2).toString()}
              </p>
            </div>
          </div>
          <div className="summary-box mt-[12px] w-[343px] tb:mt-0 tb:w-[332px] p-[20px] bg-white flex flex-col rounded-[12px]">
            <p className="text-[#201F24] text-[16px] font-bold">Summary</p>
            <div className="paid mt-[20px] flex items-center justify-between">
              <p className="text-[12px] text-[#696868] font-normal">
                Paid Bills
              </p>
              <p className="text-[12px] font-bold text-[#201F24]">
                {recurringAmount.length}
                <span>(${Math.abs(recurringTotal).toFixed(2).toString()})</span>
              </p>
            </div>
            <div className="divider w-[303px] h-[1px] bg-other mt-[16px]"></div>
            <div className="upcoming flex items-center justify-between mt-[16px]">
              <p className="text-[12px] font-normal text-[#696868]">
                Total Upcoming
              </p>
              <div className="amount">
                <p className="text-[12px] font-bold text-[#201F24]">
                  {bills.length}
                  <span>(${Math.abs(billsTotal).toFixed(2).toString()})</span>
                </p>
              </div>
            </div>
            <div className="divider w-[303px] h-[1px] bg-other mt-[16px]"></div>
            <div className="duesoon flex items-center justify-between mt-[16px]">
              <p className="text-[12px] font-normal text-[#C94736]">Due Soon</p>
              <div className="amount">
                <p className="text-[12px] font-bold text-[#C94736]">
                  {recurringDueSoon.length}
                  <span>(${Math.abs(duesoonTotal).toFixed(2)})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bills-transaction-box dk:mt-0 w-[343px] dk:w-[699px] tb:w-[688px] tb:p-[32px] bg-white rounded-[12px] mt-[24px] py-[24px] px-[20px]">
          <div className="filters mb:flex mb:items-center mb:gap-[24px] relative">
            {sort && (
              <div className="absolute w-[114px] tb:right-[0px] tb:w-[200px] bg-white py-[12px] top-14 right-0 tb:right-53 flex flex-col pl-[20px] rounded-[8px] shadow-sort">
                <p className="text-[#696868] text-[14px] font-normal ">
                  Sort by
                </p>
                <div className="sort mt-[25px] flex flex-col gap-[25px]">
                  {sortItems.map((item, i) => {
                    return (
                      <p
                        onClick={() => handleSort(i)}
                        key={i}
                        style={{ fontWeight: sortIndex == i ? 700 : 400 }}
                        className="text-[14px] cursor-pointer text-[#201F24] font-normal"
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="search-filter-category tb:justify-between tb:w-[624px] mb:flex mb:items-center mb:gap-[24px] dk:justify-between dk:w-[996px]">
              <div className="search flex justify-between tb:w-[160px] mb:w-[259px] tb:w-[320px] px-[15px] rounded-[8px] border-[#98908B] border-[1px]">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="w-[143px] tb:w-[200px] cursor-pointer py-[12px] tb:w-[90px] outline-none text-[14px] text-[#98908B] font-normal leading-[150%]"
                  placeholder="Search transaction"
                />
                <img src={searchIcon} alt="search icon" />
              </div>
              <div className="sort-filter mb:flex mb:items-center mb:justify-between  mb:gap-[24px]">
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
                  <div className="w-[114px] cursor-pointer py-[12px] gap-[16px] px-[20px] border-[1px] border-[#98908B] rounded-[8px] flex items-center">
                    <p className="text-[14px] text-[#201F24] font-normal">
                      {sortIndex !== null ? sortItems[sortIndex] : "Latest"}
                    </p>
                    <img src={caretDown} alt="caret down" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="transactions mt-[24px] flex flex-col gap-[23px]">
            <div className="name-date-amount mb:hidden tb:block mt-[36px] text-[12px] text-[#696868] font-normal tb:flex tb:items-centet tb:justify-between">
              <p className="w-[340px] text-left">Bill Title</p>
              <div className="date-amount tb:flex ">
                <p className="w-[120px] text-left">Due Date</p>
                <p className="w-[100px] text-right">Amount</p>
              </div>
            </div>
            {getSortedBills().map((bill, idx) => {
              const paid = isPaidThisMonth(bill, finance.transactions);
              const dueSoon = isDueSoon(bill.date);
              const dateFormatted = formatDateWithSuffix(bill.date);
              console.log(paid);

              return (
                <div
                  key={idx}
                  className={`p-4 tb:p-1 tb:py-[15px] tb:flex-row rounded-lg flex flex-col shadow-md mb-3 `}
                >
                  <div className="flex flex-col tb:flex-row tb:justify-between tb:w-[624px] gap-4">
                    <div className="image-name flex items-center gap-[8px]">
                      <img
                        src={bill.avatar}
                        alt={bill.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold">{bill.name}</span>
                    </div>
                    <div className="flex items-center justify-between tb:gap-[101px]">
                      <div className="date flex items-center gap-[4px]">
                        <span className={`text-sm text-[#277C78]`}>
                          {dateFormatted}
                        </span>
                        <div className={`img ${dueSoon ? "block" : "hidden"}`}>
                          <img src={redExcl} alt="" />
                        </div>
                      </div>
                      <p
                        className={`${
                          dueSoon ? "text-[#C94736]" : ""
                        } ml-auto font-bold`}
                      >
                        {" "}
                        ${Math.abs(bill.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
