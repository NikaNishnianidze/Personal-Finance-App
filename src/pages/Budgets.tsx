import { useUser } from "../context/UserProvider";
import elipsis from "../../public/assets/images/icon-ellipsis.svg";
import caretRight from "../../public/assets/images/icon-caret-right.svg";
import { useState } from "react";
import closeIcon from "../../public/assets/images/icon-close-modal.svg";
import caretDown from "../../public/assets/images/icon-caret-down.svg";

const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function Budgets() {
  const { finance, setFinance } = useUser();
  const usedThemes = finance.budgets.map((item) => item.theme);
  const themes = [
    {
      label: "Green",
      value: "green",
      color: "#277C78",
      status: usedThemes.includes("#277C78"),
    },
    {
      label: "Yellow",
      value: "yellow",
      color: "#F2CDAC",
      status: usedThemes.includes("#F2CDAC"),
    },
    {
      label: "Cyan",
      value: "cyan",
      color: "#82C9D7",
      status: usedThemes.includes("#82C9D7"),
    },
    {
      label: "Navy",
      value: "navy",
      color: "#626070",
      status: usedThemes.includes("#626070"),
    },
    {
      label: "Red",
      value: "red",
      color: "#C94736",
      status: usedThemes.includes("#C94736"),
    },
    {
      label: "Purple",
      value: "purple",
      color: "#826CB0",
      status: usedThemes.includes("#826CB0"),
    },
    {
      label: "Turquoise",
      value: "turquoise",
      color: "#597C7C",
      status: usedThemes.includes("#597C7C"),
    },
  ];
  const [addBudget, setAddBudget] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Entertainment");
  const [categoryDropDown, setCategoryDropDown] = useState<boolean>(false);
  const [maximumSpent, setMaximumSpent] = useState<number>();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState(
    themes.find((t) => t.value === "green")
  );
  const [openSettings, setOpenSettings] = useState<string | null>(null);
  const [editBudget, setEditBudget] = useState<null | {
    category: string;
    maximum: number;
    theme: string;
  }>(null);
  const [editMaximum, setEditMaximum] = useState<number>();
  const [editTheme, setEditTheme] = useState<string>();
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
  const handleAddBudget = () => {
    if (!category || !maximumSpent || !selectedTheme) return;

    const newBudget = {
      category,
      maximum: Number(maximumSpent),
      theme: selectedTheme.color,
    };

    setFinance({
      ...finance,
      budgets: [...finance.budgets, newBudget],
    });

    setAddBudget(false);
    setCategory("Entertainment");
    setMaximumSpent(undefined);
    setSelectedTheme(themes.find((t) => t.value === "green"));
  };
  const handleDeleteBudget = (category: string) => {
    setFinance({
      ...finance,
      budgets: finance.budgets.filter((b) => b.category !== category),
    });
    setOpenSettings(null);
  };

  return (
    <div className="flex flex-col items-center py-[9px] px-[16px] dk:ml-[300px]">
      {editBudget && (
        <div className="fixed mb-10 inset-0 z-50 flex h-full dk:ml-[300px] items-center justify-center bg-black/50">
          <div className="bg-white relative rounded-xl shadow-lg w-[335px] dk:w-[560px] tb:p-[32px] dk:p-[32px] tb:w-[560px] py-[28px] px-[20px]">
            <div className="newbudget flex items-center justify-between">
              <p className="text-[20px] text-[#201F24] font-bold dk:text-[32px] tb:text-[32px] ">
                Edit Budget
              </p>
              <img
                onClick={() => setEditBudget(null)}
                src={closeIcon}
                alt="close Icon"
              />
            </div>
            <div className="maximum-spent flex flex-col gap-[4px] mt-[16px]">
              <p className="text-[12px] text-[#696868] font-bold">
                Maximum Spent
              </p>
              <div className="d w-[295px] tb:w-[496px] py-[12px] px-[20px] flex items-center gap-[12px] border-[1px] rounded-[8px] border-[#98908B]">
                <p className="text-[14px] text-[#696868] font-bold">$</p>
                <input
                  type="text"
                  className="outline-none"
                  value={editMaximum}
                  onChange={(e) => setEditMaximum(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="theme">
              <div className="budget-category flex flex-col mt-[16px] gap-[4px]">
                <p className="text-[12px] text-[#696868] font-bold">Theme</p>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="starter-value flex justify-between items-center w-[295px] tb:w-[496px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px]"
                >
                  <div className="color flex items-center gap-[12px]">
                    <div
                      className="circle w-[16px] h-[16px] rounded-full"
                      style={{ backgroundColor: selectedTheme?.color }}
                    ></div>
                    <p>{selectedTheme?.label}</p>
                  </div>
                  <div className="caret">
                    <img src={caretDown} alt="caret down" />
                  </div>
                </div>
                {dropDown && (
                  <div
                    onClick={() => setDropDown(false)}
                    className="absolute top-[190px] tb:top-[265px] tb:w-[496px] tb:left-8 left-5 w-[295px] py-[12px] px-[20px] rounded-[8px] bg-white shadow-sort"
                  >
                    <div className="div flex flex-col gap-[24px] max-h-[120px] overflow-y-auto">
                      {themes.map((item) => {
                        return (
                          <div
                            onClick={() => setSelectedTheme(item)}
                            key={item.label}
                            className="flex items-center justify-between"
                          >
                            <div className="color flex items-center gap-[12px]">
                              <div
                                className="circle w-[16px] h-[16px] rounded-full"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <p>{item.label}</p>
                            </div>
                            <div className="used"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                if (editMaximum !== undefined && editTheme !== undefined) {
                  setFinance({
                    ...finance,
                    budgets: finance.budgets.map((b) =>
                      b.category === editBudget.category
                        ? { ...b, maximum: editMaximum, theme: editTheme }
                        : b
                    ),
                  });
                  setEditBudget(null);
                }
              }}
              className="mt-[20px] tb:w-[496px] py-[16px] w-[295px] bg-[#277C78] rounded-[8px] text-white font-bold text-[14px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      ;
      <div className="first-line flex items-center justify-between w-full tb:w-[688px] mt-[24px] dk:w-[1060px]">
        <p className="text-[32px] text-[#201F24] font-bold">Budgets</p>
        <button
          onClick={() => setAddBudget(true)}
          className="w-[155px] rounded-[8px] text-white font-bold py-[16px] text-[14px] text-center bg-[#201F24]"
        >
          + Add New Budget
        </button>
      </div>
      {addBudget && (
        <div className="fixed mb-10 inset-0 z-50 flex h-full dk:ml-[300px] items-center justify-center bg-black/50">
          <div className="bg-white relative rounded-xl shadow-lg w-[335px] dk:w-[560px] tb:p-[32px] dk:p-[32px] tb:w-[560px] py-[28px] px-[20px]">
            <div className="newbudget flex items-center justify-between">
              <p className="text-[20px] text-[#201F24] font-bold dk:text-[32px] tb:text-[32px] ">
                Add New Budget
              </p>
              <img
                onClick={() => setAddBudget(false)}
                src={closeIcon}
                alt="close Icon"
              />
            </div>
            <p className="mt-[24px] text-[14px] font-normal text-[#696868]">
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </p>
            <div className="budget-category flex flex-col mt-[20px] gap-[4px] ">
              <p className="text-[12px] text-[#696868] font-bold">
                Budget Category
              </p>
              <div className="relative w-[200px]">
                <button
                  onClick={() => setCategoryDropDown(!categoryDropDown)}
                  className="mb:w-[295px] mb:text-left tb:w-[496px] tb:text-left tb:px-[20px] outline-none appearance-none p-2 pr-8 border border-gray-400 rounded-md bg-white text-black"
                >
                  {category}
                </button>
                {categoryDropDown && (
                  <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-10 tb:w-[496px] max-h-40 overflow-y-auto">
                    <li
                      className="p-2 hover:bg-gray-100"
                      style={{ width: "300px" }}
                      onClick={() => {
                        setCategory("Entertainment");
                        setCategoryDropDown(false);
                      }}
                    >
                      Entertainment
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100"
                      style={{ width: "250px" }}
                      onClick={() => {
                        setCategory("Bills");
                        setCategoryDropDown(false);
                      }}
                    >
                      Bills
                    </li>

                    <li
                      className="p-2 hover:bg-gray-100"
                      style={{ width: "250px" }}
                      onClick={() => {
                        setCategory("Dining-Out");
                        setCategoryDropDown(false);
                      }}
                    >
                      Dining Out
                    </li>
                    <li
                      className="p-2 hover:bg-gray-100"
                      style={{ width: "250px" }}
                      onClick={() => {
                        setCategory("Holiday");
                        setCategoryDropDown(false);
                      }}
                    >
                      Holiday
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="maximum-spent flex flex-col gap-[4px] mt-[16px]">
              <p className="text-[12px] text-[#696868] font-bold">
                Maximum Spent
              </p>
              <div className="d w-[295px] tb:w-[496px] py-[12px] px-[20px] flex items-center gap-[12px] border-[1px] rounded-[8px] border-[#98908B]">
                <p className="text-[14px] text-[#696868] font-bold">$</p>
                <input
                  type="number"
                  className="outline-none"
                  value={maximumSpent}
                  onChange={(e) => setMaximumSpent(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="theme">
              <div className="budget-category flex flex-col mt-[16px] gap-[4px]">
                <p className="text-[12px] text-[#696868] font-bold">Theme</p>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="starter-value flex justify-between items-center w-[295px] tb:w-[496px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px]"
                >
                  <div className="color flex items-center gap-[12px]">
                    <div
                      className="circle w-[16px] h-[16px] rounded-full"
                      style={{ backgroundColor: selectedTheme?.color }}
                    ></div>
                    <p>{selectedTheme?.label}</p>
                  </div>
                  <div className="caret">
                    <img src={caretDown} alt="caret down" />
                  </div>
                </div>
                {dropDown && (
                  <div
                    onClick={() => setDropDown(false)}
                    className="absolute top-[190px] tb:w-[496px] tb:left-8 left-5 w-[295px] py-[12px] px-[20px] rounded-[8px] bg-white shadow-sort"
                  >
                    <div className="div flex flex-col gap-[24px] max-h-[120px] overflow-y-auto">
                      {themes.map((item) => {
                        return (
                          <div
                            onClick={() => setSelectedTheme(item)}
                            key={item.label}
                            className="flex items-center justify-between"
                          >
                            <div className="color flex items-center gap-[12px]">
                              <div
                                className="circle w-[16px] h-[16px] rounded-full"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <p>{item.label}</p>
                            </div>
                            <div className="used"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleAddBudget}
              className="mt-[20px] tb:w-[496px] py-[16px] w-[295px] bg-[#201F24] rounded-[8px] text-white font-bold text-[14px]"
            >
              Add Budget
            </button>
          </div>
        </div>
      )}
      <div className="budgets-all-boxes dk:flex dk:flex-row dk:gap-[24px] dk:mt-[65px]">
        <div className="budgets-box">
          <div className="budgets-box w-[343px] dk:w-[428px] dk:mt-0 dk:flex-col dk:items-center mt-[41px] bg-white tb:flex tb:justify-between rounded-[12px] py-[24px] px-[20px] tb:mt-[32px] tb:w-[688px] tb:p-[32px]">
            <div className="center-budget-cirle flex justify-center tb:mt-0">
              <div
                className="budget-circle tb:mt-[20px] flex justify-center items-center w-[240px] h-[240px] mt-[29.5px] rounded-full mt-[20px] "
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
            <div className="budgets-list tb:mt-[28.5px] w-[303px] flex flex-col items-center mt-[16px] gap-[16px] mt-[52px]">
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
        </div>
        <div className="boxes flex flex-col gap-[24px]">
          {finance.budgets.map((item) => {
            const categoryTransactions = finance.transactions.filter(
              (t) => t.category === item.category
            );
            const totalSpent = categoryTransactions.reduce(
              (acc, t) => acc + t.amount,
              0
            );
            const barColor = item.theme || "#277C78";

            return (
              <div
                key={item.category}
                className="budget-box  w-[343px] dk:w-[608px] tb:w-[688px] bg-white rounded-[12px] py-[24px] px-[20px]"
              >
                <div className="first-line flex justify-between items-center relative">
                  <div className="category flex items-center gap-[16px]">
                    <div
                      className="circle w-[16px] h-[16px] rounded-full"
                      style={{ backgroundColor: barColor }}
                    ></div>
                    <p className="text-[20px] text-[#201F24] font-bold">
                      {item.category}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      setOpenSettings(
                        openSettings === item.category ? null : item.category
                      )
                    }
                    className="dots"
                  >
                    <img src={elipsis} alt="elipsis icon" />
                  </div>
                  {openSettings === item.category && (
                    <div className="absolute w-[134px] py-[12px] px-[20px] rounded-[12px] bg-white shadow-sort right-0 top-7 z-10">
                      <p
                        onClick={() => {
                          setEditBudget(item);
                          setEditMaximum(item.maximum);
                          setEditTheme(item.theme);
                          setOpenSettings(null);
                        }}
                        className="text-[14px] text-[#201F24] font-normal leading-[150%]"
                      >
                        Edit Budget
                      </p>
                      <div className="divider w-[94px] h-[1px] bg-[#F2F2F2] mt-[12px] mb-[12px]"></div>
                      <p
                        onClick={() => handleDeleteBudget(item.category)}
                        className="text-[14px] text-[#C94736] font-normal leading-[150%]"
                      >
                        Delete Budget
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-[20px] text-[14px] font-normal text-[#696868]">
                  Maximum of ${item.maximum}
                </p>
                <div className="progressline mt-[16px] w-[303px]  dk:w-[544px] tb:w-[624px] h-[32px] bg-[#F8F4F0] rounded-[4px] p-[4px]">
                  <div
                    className="line h-full rounded-[4px] tb:max-w[624px]"
                    style={{
                      backgroundColor: barColor,
                      width: `${Math.min(
                        (Math.abs(totalSpent) / Math.abs(item.maximum)) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="spent-free flex items-center gap-[16px] mt-[20px]">
                  <div className="spent w-[143.5px] flex items-center gap-[16px] tb:w-[304px]">
                    <div
                      className="rectangle w-[4px] h-[43px] rounded-[8px]"
                      style={{ backgroundColor: barColor }}
                    ></div>
                    <div className="amount flex flex-col">
                      <p className="text-[12px] font-normal text-[#696868]">
                        Spent
                      </p>
                      <p className="text-[14px] font-bold text-[#201F24]">
                        ${Math.abs(totalSpent).toFixed(2)}
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
                        $
                        {(
                          Math.abs(item.maximum) - Math.abs(totalSpent)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="latest-spending w-[303px] dk:w-[544px] tb:w-[624px] rounded-[12px] bg-[#F8F4F0] p-[16px] mt-[20px]">
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
                  {categoryTransactions.slice(0, 3).map((tran, i) => (
                    <div key={tran.name + tran.date}>
                      <div className="flex items-center justify-between mt-[20px] gap-[12px]">
                        <div className="category text-[12px] tb:flex tb:items-center tb:gap-[16px] font-bold text-[#201F24] leading-[150%]">
                          <img
                            src={tran.avatar}
                            alt=""
                            className="w-[32px] h-[32px] rounded-full mb:hidden tb:block"
                          />
                          {tran.name}
                        </div>
                        <div className="profit flex flex-col gap-[8px]">
                          <p
                            className={`text-[12px] text-right font-bold leading-[150%] ${
                              tran.amount < 0
                                ? "text-[#201F24]"
                                : "text-[#277C78]"
                            }`}
                          >
                            {tran.amount < 0
                              ? `-$${Math.abs(tran.amount).toFixed(2)}`
                              : `$${tran.amount.toFixed(2)}`}
                          </p>
                          <p className="text-[#696868] text-[12px] font-normal leading-[150%]">
                            {formatter.format(new Date(tran.date))}
                          </p>
                        </div>
                      </div>
                      <div className="divider w-[271px] mt-[12px] h-[1px] bg-[#696868]/15"></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
