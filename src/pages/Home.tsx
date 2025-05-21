import { useUser } from "../context/UserProvider";
import caretRight from "../../public/assets/images/icon-caret-right.svg";
import pot from "../../public/assets/images/icon-pot.svg";
import { parseISO, isWithinInterval, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { finance } = useUser();
  const navigate = useNavigate();
  const filtered = finance.pots.filter((item) => item.name !== "Holiday");
  const totalSaved = finance.pots.reduce((acc, item) => acc + item.total, 0);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const julyBills = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === 6 && t.category === "Bills";
  });
  const upcomingBills = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === 7 && t.category === "Bills";
  });

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
  const goPots = () => {
    navigate("/home/pots");
  };
  const goTransactions = () => {
    navigate("/home/transactions");
  };
  const goBudget = () => {
    navigate("/home/budget");
  };
  const goBills = () => {
    navigate("/home/bills");
  };

  const spentBudget = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === 7 &&
      (t.category === "Bills" ||
        t.category === "Personal Care" ||
        t.category === "Dining Out" ||
        t.category === "Entertainment")
    );
  });

  const totalSpentBudget = spentBudget.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const duesoonTotal = recurringDueSoon.reduce((sum, tx) => sum + tx.amount, 0);
  return (
    <div className="flex flex-col items-center pt-[24px] px-[16px] py-[24px] dk:ml-[300px]">
      <div className="overview flex justify-start w-[343px] tb:w-[688px] dk:w-[1060px]">
        <h1 className="text-[#201F24] text-[32px] font-bold leading-[120%]">
          Overview
        </h1>
      </div>
      <div className="current-income-expenses mb:flex mb:flex-col tb:flex-row tb:items-center tb:gap-[24px] tb:mt-[42px]">
        <div className="current-balance tb:mt-0 w-[343px] tb:w-[213px] dk:w-[337px] py-[20px] pl-[20px] rounded-[12px] bg-signup mt-[32px]">
          <p className="text-white font-normal text-[14px] leading-[150%]">
            Current Balance
          </p>
          <p className="mt-[12px] text-white font-bold leading-[120%] text-[32px]">
            ${finance.balance.current.toLocaleString()}.00
          </p>
        </div>
        <div className="income w-[343px] tb:mt-0 tb:w-[213px] dk:w-[337px] py-[20px] pl-[20px] rounded-[12px] bg-white mt-[12px]">
          <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
            Income
          </p>
          <p className="mt-[12px] text-[#201F24] font-bold leading-[120%] text-[32px]">
            ${finance.balance.income.toLocaleString()}
          </p>
        </div>
        <div className="expenses w-[343px] tb:mt-0 tb:w-[213px] dk:w-[337px] py-[20px] pl-[20px] rounded-[12px] bg-white mt-[12px]">
          <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
            Expenses
          </p>
          <p className="mt-[12px] text-[#201F24] font-bold leading-[120%] text-[32px]">
            ${finance.balance.expenses.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="pots-transaction-budgets-recurring dk:flex dk:items-start dk:gap-[24px] dk:w-[1060px]">
        <div className="pots-transactions dk:flex dk:flex-col dk:w-[608px]">
          <div className="pots w-[343px] tb:w-[688px] dk:w-[608px] bg-white rounded-[12px] mt-[32px] px-[20px] tb:p-[32px] py-[24px]">
            <div className="details flex items-center justify-between">
              <div className="pot">
                <p className="text-[#201F24] text-[20px] font-bold leading-[120%]">
                  Pots
                </p>
              </div>
              <div
                onClick={goPots}
                className="see-details flex items-center gap-[12px]"
              >
                <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
                  See Details
                </p>
                <img src={caretRight} alt="caret right" />
              </div>
            </div>
            <div className="totalsaved-items tb:flex tb:flex-row tb:gap-[20px] ">
              <div className="total-saved w-[303px] tb:w-[247px] mb:flex mb:items-center  tb:flex tb:items-center dk:flex dk:items-center gap-[16px] mt-[21.5px] rounded-[12px] bg-totalsaved py-[20px] pl-[16px]">
                <div className="icon">
                  <img src={pot} alt="pot icon" className="w-[40px] h-[40px]" />
                </div>
                <div className="money-amount flex flex-col gap-[11px] w-[303px]">
                  <p className="w-[90px] text-[#696868] text-[14px] font-normal leading-[150%]">
                    Total Saved
                  </p>
                  <p className="text-[#201F24] text-[32px] font-bold leading-[120%]">
                    ${totalSaved}
                  </p>
                </div>
              </div>
              <div className="savings flex items-center flex-wrap w-[303px] tb:w-[357px] gap-[16px]  mt-[20px]">
                {filtered.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="flex w-[143.5px] tb:w-[170px] dk:w-[130px] gap-[16px]"
                    >
                      <div
                        className={`theme w-[4px] h-[43px]`}
                        style={{ backgroundColor: item.theme }}
                      ></div>
                      <div className="name-amount">
                        <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                          {item.name}
                        </p>
                        <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                          ${item.total}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="transactions-box w-[343px] dk:w-[608px] tb:w-[688px] tb:mt-[24px] tb:p-[32px] bg-white rounded-[12px] py-[24px] px-[20px] mt-[16px]">
            <div className="transactions-line flex items-center justify-between">
              <div className="transactions">
                <p className="text-[#201F24] text-[20px] font-bold leading-[120%]">
                  Transactions
                </p>
              </div>
              <div
                onClick={goTransactions}
                className="details flex items-center gap-[12px]"
              >
                <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
                  View All
                </p>
                <img src={caretRight} alt="caret right" />
              </div>
            </div>
            <div className="list-of-transactions mt-[35.5px] flex flex-col gap-[20px]">
              {finance.transactions.slice(0, 5).map((item, index) => {
                return (
                  <div key={index}>
                    <div className="transaction w-[303px] tb:w-[624px] dk:w-[544px] flex items-center justify-between mb-[20px]">
                      <div className="photo-name flex items-center gap-[16px]">
                        <img
                          src={item.avatar}
                          alt="avatar"
                          className="w-[32px] h-[32px] rounded-[50%]"
                        />
                        <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                          {item.name}
                        </p>
                      </div>
                      <div className="profit flex flex-col gap-[8px]">
                        <p
                          className={`text-[14px] font-bold leading-[150%] ${
                            item.amount < 0
                              ? "text-[#201F24]"
                              : "text-[#277C78]"
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
                );
              })}
            </div>
          </div>
        </div>
        <div className="budgets-recurring dk:mt-[32px] dk:flex dk:flex-col">
          <div className="budgets-box w-[343px] tb:p-[32px] dk:mt-0 dk:w-[428px] tb:w-[688px] bg-white rounded-[12px] mt-[24px] py-[24px] px-[20px]">
            <div className="budgets-line flex items-center justify-between">
              <div className="budgets">
                <p className="text-[#201F24] text-[20px] font-bold leading-[120%]">
                  Budgets
                </p>
              </div>
              <div
                onClick={goBudget}
                className="details flex items-center gap-[12px]"
              >
                <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
                  See Details
                </p>
                <img src={caretRight} alt="caret right" />
              </div>
            </div>
            <div className="butget-list tb:flex tb:flex-row tb:items-center tb:justify-between">
              <div className="center-budget-cirle flex justify-center tb:w-[507px]">
                <div
                  className="budget-circle flex justify-center items-center w-[240px] dk:w-[247px] dk:mb-[31px] h-[240px] mt-[29.5px] dk:mt-[51px] rounded-full mt-[20px] "
                  style={{
                    background: `conic-gradient(
      ${finance.budgets
        .map((b, i, arr) => {
          const total = arr.reduce((acc, cur) => acc + cur.maximum, 0);
          const percent = (b.maximum / total) * 100;
          const start = arr
            .slice(0, i)
            .reduce((acc, cur) => acc + (cur.maximum / total) * 100, 0);
          return `${b.theme} ${start}% ${start + percent}%`;
        })
        .join(", ")}
    )`,
                  }}
                >
                  <div className="white w-[187px] h-[187px] rounded-full bg-white flex flex-col items-center justify-center">
                    <p className="text-[#201F24] text-[32px] font-bold leading-[120%]">
                      ${Math.abs(totalSpentBudget)}
                    </p>
                    <p className="text-[12px] text-[#696868] font-normal leading-[150%]">
                      of $
                      {finance.budgets.reduce(
                        (acc, item) => acc + item.maximum,
                        0
                      )}{" "}
                      limit
                    </p>
                  </div>
                </div>
              </div>
              <div className="budgets-list w-[303px] flex flex-wrap tb:flex-col tb:w-[101px] items-center mt-[16px] gap-[16px]">
                {finance.budgets.map((item) => {
                  return (
                    <div
                      key={item.theme}
                      className="w-[143.5px] tb:w-[101px] flex gap-[20px]"
                    >
                      <div
                        className="rectangle w-[4px] h-[43px]"
                        style={{ background: item.theme }}
                      ></div>
                      <div className="info flex flex-col gap-[4px]">
                        <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                          {item.category}
                        </p>
                        <p className="text-[#201F24] tex-[14px] font-bold leading-[150%]">
                          ${item.maximum.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="recurring-box w-[343px] tb:w-[688px] dk:w-[428px] dk:p-[32px] mt-[16px] dk:mb-0 mb-[60px] bg-white rounded-[12px] py-[24px] px-[20px]">
            <div className="recurring-line flex items-center justify-between">
              <div onClick={goBills} className="recurring">
                <p className="text-[#201F24] text-[20px] font-bold leading-[120%]">
                  Recurring Bills
                </p>
              </div>
              <div
                onClick={goBills}
                className="details flex items-center gap-[12px]"
              >
                <p className="text-[#696868] font-normal text-[14px] leading-[150%]">
                  See Details
                </p>
                <img src={caretRight} alt="caret right" />
              </div>
            </div>
            <div className="paid-bills flex items-center justify-between rounded-[8px] border-l-[4px] px-[16px] bg-[#F8F4F0] mt-[32px] border-[#277C78] py-[20px]">
              <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
                Paid Bills
              </p>
              <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                $
                {Math.abs(
                  julyBills.reduce((acc, item) => acc + item.amount, 0)
                )}
              </p>
            </div>
            <div className="upcoming-bills flex items-center justify-between rounded-[8px] border-l-[4px] px-[16px] bg-[#F8F4F0] mt-[32px] border-[#F2CDAC] py-[20px]">
              <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
                Total Upcoming
              </p>
              <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                $
                {Math.abs(
                  upcomingBills.reduce((acc, item) => acc + item.amount, 0)
                ).toFixed(2)}
              </p>
            </div>
            <div className="duesoon-bills flex items-center justify-between rounded-[8px] border-l-[4px] px-[16px] bg-[#F8F4F0] mt-[32px] border-[#F2CDAC] py-[20px]">
              <p className="text-[#696868] text-[14px] font-normal leading-[150%]">
                Due Soon
              </p>
              <p className="text-[#201F24] text-[14px] font-bold leading-[150%]">
                ${Math.abs(duesoonTotal).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
