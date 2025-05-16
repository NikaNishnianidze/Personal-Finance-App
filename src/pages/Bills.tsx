import { useUser } from "../context/UserProvider";
import recurring from "../../public/assets/images/icon-recurring-bills.svg";
import { parseISO, isWithinInterval, addDays } from "date-fns";

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
    </div>
  );
}
