import { useUser } from "../context/UserProvider";
import recurring from "../../public/assets/images/icon-recurring-bills.svg";
import { parseISO, isWithinInterval, addDays } from "date-fns";
import searchIcon from "../../public/assets/images/icon-search.svg";
import sortIcon from "../../public/assets/images/icon-sort-mobile.svg";
import redExcl from "../../public/assets/images/icon-bill-due.svg";

export default function Bills() {
  const { finance } = useUser();
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
  return (
    <div className="flex flex-col items-center pt-[32px] px-[16px]">
      <div className="recurring w-[343px]">
        <p className="text-left text-[32px] font-bold text-[#201F24]">
          Recurring Bills
        </p>
      </div>
      <div className="total-bills w-[343px] flex items-center gap-[20px] rounded-[12px] bg-[#201F24] mt-[40px] py-[24px] px-[20px]">
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
      <div className="summary-box mt-[12px] w-[343px] p-[20px] bg-white flex flex-col rounded-[12px]">
        <p className="text-[#201F24] text-[16px] font-bold">Summary</p>
        <div className="paid mt-[20px] flex items-center justify-between">
          <p className="text-[12px] text-[#696868] font-normal">Paid Bills</p>
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
      <div className="bills-transaction-box w-[343px] bg-white rounded-[12px] mt-[24px] py-[24px] px-[20px]">
        <div className="searches flex items-center justify-between">
          <div className="search-input relative w-[259px] py-[12px] px-[20px] border-[1px] border-[#98908B] rounded-[8px]">
            <input type="text" className="outline-none" />
            <img src={searchIcon} alt="" className="absolute top-4 right-4" />
          </div>
          <div className="sort">
            <img src={sortIcon} alt="sort icon" />
          </div>
        </div>
        <div className="transactions mt-[24px] flex flex-col gap-[23px]">
          {finance.transactions
            .filter((t) => t.recurring)
            .map((bill, idx) => {
              const paid = isPaidThisMonth(bill, finance.transactions);
              const dueSoon = isDueSoon(bill.date);
              const dateFormatted = formatDateWithSuffix(bill.date);
              console.log(paid);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg flex flex-col shadow-md mb-3 `}
                >
                  <div className="flex flex-col gap-4">
                    <div className="image-name flex items-center gap-[8px]">
                      <img
                        src={bill.avatar}
                        alt={bill.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold">{bill.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
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
  );
}
