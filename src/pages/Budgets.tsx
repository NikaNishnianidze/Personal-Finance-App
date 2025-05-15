import { useUser } from "../context/UserProvider";

export default function Budgets() {
  const { finance } = useUser();
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
  return (
    <div className="flex flex-col items-center py-[9px] px-[16px]">
      <div className="first-line flex items-center justify-between w-full">
        <p className="text-[32px] text-[#201F24] font-bold">Budgets</p>
        <button className="w-[155px] rounded-[8px] text-white font-bold py-[16px] text-[14px] text-center bg-[#201F24]">
          + Add New Budget
        </button>
      </div>
      <div className="budgets-box w-[343px] mt-[41px] bg-white rounded-[12px] py-[24px] px-[20px]">
        <div className="center-budget-cirle flex justify-center">
          <div
            className="budget-circle flex justify-center items-center w-[240px] h-[240px] mt-[29.5px] rounded-full mt-[20px] "
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
                {finance.budgets.reduce((acc, item) => acc + item.maximum, 0)}{" "}
                limit
              </p>
            </div>
          </div>
        </div>
        <div className="budgets-list w-[303px] flex flex-wrap items-center mt-[16px] gap-[16px]">
          {finance.budgets.map((item) => {
            return (
              <div key={item.theme} className="w-[143.5px] flex gap-[20px]">
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
  );
}
