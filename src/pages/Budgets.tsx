import { useUser } from "../context/UserProvider";
import elipsis from "../../public/assets/images/icon-ellipsis.svg";
import caretRight from "../../public/assets/images/icon-caret-right.svg";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

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
  const entertainment = finance.budgets.filter(
    (item) => item.category == "Entertainment"
  );
  const bills = finance.budgets.filter((item) => item.category == "Bills");
  const tranBills = finance.transactions.filter((t) => {
    return t.category === "Bills";
  });
  const totalTranBills = tranBills.reduce((acc, item) => acc + item.amount, 0);
  const billsMaximum = bills.map((item) => item.maximum);
  //dining
  const dining = finance.budgets.filter(
    (item) => item.category == "Dining Out"
  );
  const diningMaximum = dining.map((item) => item.maximum);
  const tranDining = finance.transactions.filter((t) => {
    const d = new Date(t.date);
    return t.category === "Dining Out" && d.getMonth() === 7;
  });
  console.log(tranDining);
  const totalTranDining = 67;

  //personal care
  const care = finance.budgets.filter(
    (item) => item.category === "Personal Care"
  );
  const careMaximum = care.map((item) => item.maximum);
  const tranCare = finance.transactions.filter(
    (t) => t.category === "Personal Care"
  );
  const totalTranCare = tranCare.reduce((acc, item) => acc + item.amount, 0);

  //entertainment
  const entertainmentMaximum = entertainment.map((item) => item.maximum);
  const entertainmentSpent = finance.transactions.filter((t) => {
    return t.category === "Entertainment";
  });
  const totalEntertainmentSpent = entertainmentSpent.reduce(
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
        <div className="budgets-list w-[303px] flex flex-col items-center mt-[16px] gap-[16px] mt-[52px]">
          <p className="w-[303px] text-[20px] text-[#201F24] font-bold">
            Spending Summary
          </p>
          {finance.budgets.map((item, i) => {
            return (
              <div
                key={item.theme}
                className="flex gap-[20px] flex items-center justify-between mt-[24px]"
              >
                <div className="info flex flex-row  justify-between items-center w-[303px] gap-[4px] ">
                  <div className="category flex items-center gap-[16px]">
                    <div
                      className="rectangle w-[4px] h-[21px]"
                      style={{ background: item.theme }}
                    ></div>
                    <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                      {item.category}
                    </p>
                  </div>
                  <div className="amount flex items-center gap-[8px]">
                    <p className="text-[16px] text-[#201F24] font-bold">
                      $
                      {Math.abs(
                        finance.transactions
                          .filter((t) => {
                            return t.category === item.category;
                          })
                          .reduce((acc, t) => acc + t.amount, 0)
                      ).toFixed(2)}
                    </p>
                    <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                      of ${item.maximum.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="entertainment-box mt-[24px] w-[343px] bg-white rounded-[12px] py-[24px] px-[20px]">
        {entertainment.map((item) => {
          return (
            <div key={item.category}>
              <div className="first-line flex items-center justify-between">
                <div className="name flex items-center">
                  <div className="circle w-[16px] h-[16px] rounded-full bg-[#277C78]"></div>
                  <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                    Entertainment
                  </p>
                </div>
                <div className="dots">
                  <img src={elipsis} alt="elipsis icon" />
                </div>
              </div>
              <p className="mt-[20px] text-[14px] font-normal text-[#696868]">
                Maxium of ${item.maximum.toFixed(2)}
              </p>
              <div className="progressline mb-20 mt-[16px] w-[303px] h-[32px] bg-[#F8F4F0] rounded-[4px] p-[4px]">
                <div
                  className={`line bg-[#277C78] h-full rounded-[4px]`}
                  style={{
                    width: `${
                      (Math.abs(totalEntertainmentSpent) /
                        entertainmentMaximum[0]) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="spent-free flex items-center gap-[16px]">
                <div className="spent w-[143.5px] flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#277C78] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Spent
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(totalEntertainmentSpent).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="free flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#F8F4F0] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Free
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(entertainmentMaximum[0]).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="latest-spending w-[303px] rounded-[12px] bg-[#F8F4F0] p-[16px] mt-[20px]">
                <div className="name flex items-center justify-between">
                  <div className="latest text-[16px] text-[#201F24] font-bold">
                    Latest Spending
                  </div>
                  <div className="see-all flex items-center gap-[12px]">
                    <p className="text-[14px] font-normal text-[#696868]">
                      See All
                    </p>
                    <img src={caretRight} alt="caret icon" />
                  </div>
                </div>
                {entertainmentSpent.map((item) => {
                  return (
                    <>
                      <div className="flex items-center justify-between mt-[20px] gap-[12px]">
                        <div className="category text-[12px] font-bold text-[#201F24] leading-[150%]">
                          {item.name}
                        </div>
                        <div className="profit flex flex-col gap-[8px]">
                          <p
                            className={`text-[12px] text-right font-bold leading-[150%] ${
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
                      <div className="divider w-[271px] mt-[12px] h-[1px] bg-[#696868]/15"></div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bills-box mt-[24px] w-[343px] bg-white rounded-[12px] py-[24px] px-[20px]">
        {bills.map((item) => {
          return (
            <div key={item.category}>
              <div className="first-line flex justify-between items-center">
                <div className="category flex items-center gap-[16px]">
                  <div className="circle  w-[16px] h-[16px] rounded-full bg-[#82C9D7]"></div>
                  <p className=" text-[20px] text-[#201F24] font-bold">Bills</p>
                </div>
                <div className="dots">
                  <img src={elipsis} alt="elipsis icon" />
                </div>
              </div>
              <p className="mt-[20px] text-[14px] font-normal text-[#696868]">
                Maximum of ${item.maximum}
              </p>
              <div className="progressline mt-[16px] w-[303px] h-[32px] bg-[#F8F4F0] rounded-[4px] p-[4px]">
                <div
                  className={`line bg-[#82C9D7] h-full rounded-[4px]`}
                  style={{
                    width: `${
                      (Math.abs(totalTranBills) / billsMaximum[0]) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="spent-free flex items-center gap-[16px] mt-[20px]">
                <div className="spent w-[143.5px] flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#82C9D7] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Spent
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(totalTranBills).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="free flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#F8F4F0] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Free
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(billsMaximum[0]).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="latest-spending w-[303px] rounded-[12px] bg-[#F8F4F0] p-[16px] mt-[20px]">
                <div className="name flex items-center justify-between">
                  <div className="latest text-[16px] text-[#201F24] font-bold">
                    Latest Spending
                  </div>
                  <div className="see-all flex items-center gap-[12px]">
                    <p className="text-[14px] font-normal text-[#696868]">
                      See All
                    </p>
                    <img src={caretRight} alt="caret icon" />
                  </div>
                </div>
                {tranBills.slice(0, 3).map((item) => {
                  return (
                    <>
                      <div className="flex items-center justify-between mt-[20px] gap-[12px]">
                        <div className="category text-[12px] font-bold text-[#201F24] leading-[150%]">
                          {item.name}
                        </div>
                        <div className="profit flex flex-col gap-[8px]">
                          <p
                            className={`text-[12px] text-right font-bold leading-[150%] ${
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
                      <div className="divider w-[271px] mt-[12px] h-[1px] bg-[#696868]/15"></div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="dining-out-box mt-[24px] w-[343px] bg-white rounded-[12px] py-[24px] px-[20px]">
        {dining.map((item) => {
          return (
            <div key={item.category}>
              <div className="first-line flex justify-between items-center">
                <div className="category flex items-center gap-[16px]">
                  <div className="circle  w-[16px] h-[16px] rounded-full bg-[#F2CDAC]"></div>
                  <p className=" text-[20px] text-[#201F24] font-bold">
                    Dining Out
                  </p>
                </div>
                <div className="dots">
                  <img src={elipsis} alt="elipsis icon" />
                </div>
              </div>
              <p className="mt-[20px] text-[14px] font-normal text-[#696868]">
                Maximum of ${diningMaximum}
              </p>
              <div className="progressline mt-[16px] w-[303px] h-[32px] bg-[#F8F4F0] rounded-[4px] p-[4px]">
                <div
                  className={`line bg-[#F2CDAC] h-full rounded-[4px]`}
                  style={{
                    width: `${
                      (Math.abs(totalTranDining) / diningMaximum[0]) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="spent-free flex items-center gap-[16px] mt-[20px]">
                <div className="spent w-[143.5px] flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#F2CDAC] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Spent
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(totalTranDining).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="free flex items-center gap-[16px] ">
                  <div className="rectangle w-[4px] h-[43px] bg-[#F8F4F0] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Free
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      $
                      {(
                        Math.abs(diningMaximum[0]) - Math.abs(totalTranDining)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="latest-spending w-[303px] rounded-[12px] bg-[#F8F4F0] p-[16px] mt-[20px]">
                <div className="name flex items-center justify-between">
                  <div className="latest text-[16px] text-[#201F24] font-bold">
                    Latest Spending
                  </div>
                  <div className="see-all flex items-center gap-[12px]">
                    <p className="text-[14px] font-normal text-[#696868]">
                      See All
                    </p>
                    <img src={caretRight} alt="caret icon" />
                  </div>
                </div>
                {tranDining.slice(0, 3).map((item) => {
                  return (
                    <>
                      <div className="flex items-center justify-between mt-[20px] gap-[12px]">
                        <div className="category text-[12px] font-bold text-[#201F24] leading-[150%]">
                          {item.name}
                        </div>
                        <div className="profit flex flex-col gap-[8px]">
                          <p
                            className={`text-[12px] text-right font-bold leading-[150%] ${
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
                      <div className="divider w-[271px] mt-[12px] h-[1px] bg-[#696868]/15"></div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="personaCare-box mt-[24px] w-[343px] mb-20 bg-white rounded-[12px] py-[24px] px-[20px]">
        {care.map((item) => {
          return (
            <div key={item.category}>
              <div className="first-line flex justify-between items-center">
                <div className="category flex items-center gap-[16px]">
                  <div className="circle  w-[16px] h-[16px] rounded-full bg-[#626070]"></div>
                  <p className=" text-[20px] text-[#201F24] font-bold">
                    Dining Out
                  </p>
                </div>
                <div className="dots">
                  <img src={elipsis} alt="elipsis icon" />
                </div>
              </div>
              <p className="mt-[20px] text-[14px] font-normal text-[#696868]">
                Maximum of ${item.maximum}
              </p>
              <div className="progressline mt-[16px] w-[303px] h-[32px] bg-[#F8F4F0] rounded-[4px] p-[4px]">
                <div
                  className={`line bg-[#626070] h-full rounded-[4px]`}
                  style={{
                    width: `${
                      (Math.abs(totalTranCare) / careMaximum[0]) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="spent-free flex items-center gap-[16px] mt-[20px]">
                <div className="spent w-[143.5px] flex items-center gap-[16px]">
                  <div className="rectangle w-[4px] h-[43px] bg-[#626070] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Spent
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      ${Math.abs(totalTranCare).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="free flex items-center gap-[16px] ">
                  <div className="rectangle w-[4px] h-[43px] bg-[#F8F4F0] rounded-[8px]"></div>
                  <div className="amount flex flex-col">
                    <p className="text-[12px] font-normal text-[#696868]">
                      Free
                    </p>
                    <p className="text-[14px] font-bold text-[#201F24]">
                      $
                      {(
                        Math.abs(careMaximum[0]) - Math.abs(totalTranCare)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="latest-spending w-[303px] rounded-[12px] bg-[#F8F4F0] p-[16px] mt-[20px]">
                <div className="name flex items-center justify-between">
                  <div className="latest text-[16px] text-[#201F24] font-bold">
                    Latest Spending
                  </div>
                  <div className="see-all flex items-center gap-[12px]">
                    <p className="text-[14px] font-normal text-[#696868]">
                      See All
                    </p>
                    <img src={caretRight} alt="caret icon" />
                  </div>
                </div>
                {tranCare.slice(0, 3).map((item) => {
                  return (
                    <>
                      <div className="flex items-center justify-between mt-[20px] gap-[12px]">
                        <div className="category text-[12px] font-bold text-[#201F24] leading-[150%]">
                          {item.name}
                        </div>
                        <div className="profit flex flex-col gap-[8px]">
                          <p
                            className={`text-[12px] text-right font-bold leading-[150%] ${
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
                      <div className="divider w-[271px] mt-[12px] h-[1px] bg-[#696868]/15"></div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
