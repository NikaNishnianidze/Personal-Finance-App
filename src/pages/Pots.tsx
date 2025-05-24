import elipsis from "../../public/assets/images/icon-ellipsis.svg";
import caretDown from "../../public/assets/images/icon-caret-down.svg";
import closeIcon from "../../public/assets/images/icon-close-modal.svg";
import { useUser } from "../context/UserProvider";
import { useState, type SetStateAction } from "react";
import type { IPots } from "../data";

export default function Pots() {
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

  const [addPot, setAddPot] = useState(false);
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  type Pot = {
    name: string;
    target: number;
    total: number;
    theme: string;
  };
  const [activePot, setActivePot] = useState<Pot | null>(null);
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [editPot, setEditPot] = useState<Pot | null>(null);
  const [editPotName, setEditPotName] = useState("");
  const [editPotTarget, setEditPotTarget] = useState<number | "">("");
  const [editPotTheme, setEditPotTheme] = useState<string>("");
  const [openPotSettings, setOpenPotSettings] = useState<string | null>(null);

  const handleAddPot = () => {
    if (!potName || !target || !selectedTheme) return;
    setFinance({
      ...finance,
      pots: [
        ...finance.pots,
        {
          name: potName,
          target: Number(target),
          total: 0,
          theme: selectedTheme.color,
        },
      ],
    });
    setAddPot(false);
    setPotName("");
    setTarget("");
    setSelectedTheme(themes[0]);
  };
  const openTransactionModal = (
    pot:
      | IPots
      | ((
          prevState: {
            name: string;
            target: number;
            total: number;
            theme: string;
          } | null
        ) => {
          name: string;
          target: number;
          total: number;
          theme: string;
        } | null)
      | null,
    type: SetStateAction<string>
  ) => {
    setActivePot(pot);
    setTransactionType(type);
    setAmount("");
  };

  const handleTransaction = () => {
    if (!activePot || !amount) return;
    setFinance({
      ...finance,
      pots: finance.pots.map((p) =>
        p.name === activePot.name
          ? {
              ...p,
              total:
                transactionType === "add"
                  ? p.total + Number(amount)
                  : Math.max(0, p.total - Number(amount)),
            }
          : p
      ),
    });
    setActivePot(null);
    setTransactionType("");
    setAmount("");
  };

  return (
    <div className="flex flex-col items-center py-[9px] px-[16px] dk:ml-[300px] dk:mt-[40px]">
      {editPot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[335px] tb:w-[560px] dk:ml-[300px]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[20px] font-bold text-[#201F24]">Edit Pot</p>
              <img
                src={closeIcon}
                alt="close"
                className="cursor-pointer"
                onClick={() => setEditPot(null)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[12px] text-[#696868] font-bold">
                Pot Name
              </label>
              <input
                type="text"
                value={editPotName}
                onChange={(e) => setEditPotName(e.target.value)}
                className="tb:w-[496px] py-[12px] px-[20px] rounded-[8px] bg-white shadow-sort mb:w-[295px] border rounded px-3 py-2 outline-none"
              />
              <label className="text-[12px] text-[#696868] font-bold">
                Target
              </label>
              <input
                type="number"
                value={editPotTarget}
                onChange={(e) => setEditPotTarget(Number(e.target.value))}
                className="tb:w-[496px] py-[12px] px-[20px] rounded-[8px] bg-white shadow-sort mb:w-[295px] border rounded px-3 py-2 outline-none"
              />
              <label className="text-[12px] text-[#696868] font-bold">
                Theme
              </label>
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
                  setFinance({
                    ...finance,
                    pots: finance.pots.map((p) =>
                      p.name === editPot.name
                        ? {
                            ...p,
                            name: editPotName,
                            target: Number(editPotTarget),
                            theme: editPotTheme,
                          }
                        : p
                    ),
                  });
                  setEditPot(null);
                }}
                className="w-full bg-[#277C78] text-white py-2 rounded font-bold mt-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {activePot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[335px] dk:ml-[300px]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[20px] font-bold text-[#201F24]">
                {transactionType === "add"
                  ? "Add to ‘Savings’"
                  : "Withdraw from ‘Savings’"}
              </p>
              <img
                src={closeIcon}
                alt="close"
                className="cursor-pointer"
                onClick={() => setActivePot(null)}
              />
            </div>
            <p className="mb-2 text-[#696868]">
              {transactionType === "add"
                ? `How much do you want to add to "${activePot.name}"?`
                : `How much do you want to withdraw from "${activePot.name}"?`}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none"
              min="0"
            />
            <button
              onClick={handleTransaction}
              className="w-full bg-[#277C78] text-white py-2 rounded font-bold"
            >
              {transactionType === "add" ? "Add" : "Withdraw"}
            </button>
          </div>
        </div>
      )}
      <div className="first-line flex items-center justify-between w-full tb:w-[688px] dk:w-[1060px]">
        <p className="text-[32px] text-[#201F24] font-bold">Pots</p>
        <button
          onClick={() => setAddPot(true)}
          className="w-[155px] cursor-pointer rounded-[8px] hover:bg-[#696868] text-white font-bold py-[16px] text-[14px] text-center bg-[#201F24]"
        >
          + Add New Pot
        </button>
      </div>
      {addPot && (
        <div className="fixed mb-10 inset-0 z-50 flex items-center tb:h-full dk:ml-[300px] justify-center bg-black/50">
          <div className="bg-white relative p-6 rounded-xl shadow-lg tb:w-[560px] tb:p-[32px] w-[335px] py-[28px] px-[20px]">
            <div className="newbudget flex items-center justify-between">
              <p className="text-[20px] text-[#201F24] font-bold tb:text-[32px]">
                Add New Pot
              </p>
              <img
                onClick={() => setAddPot(false)}
                src={closeIcon}
                alt="close Icon"
              />
            </div>
            <p className="mt-[24px] text-[14px] font-normal text-[#696868]">
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>
            <div className="pot-name mt-[20px] flex flex-col gap-[4px] ">
              <label
                htmlFor="name"
                className="text-[12px] text-[#696868] font-bold"
              >
                Pot Name
              </label>
              <input
                onChange={(e) => setPotName(e.target.value)}
                value={potName}
                type="text"
                name="name"
                maxLength={30}
                className="w-[295px] tb:w-[496px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px] outline-none"
              />
            </div>
            <div className="maximum-spent flex flex-col gap-[4px] mt-[16px]">
              <p className="text-[12px] text-[#696868] font-bold">Target</p>
              <div className="d w-[295px] tb:w-[496px] py-[12px] px-[20px] flex items-center gap-[12px] border-[1px] rounded-[8px] border-[#98908B]">
                <p className="text-[14px] text-[#696868] font-bold">$</p>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="outline-none"
                />
              </div>
            </div>
            <div className="theme">
              <div className="budget-category flex flex-col mt-[16px] gap-[4px]">
                <p className="text-[12px] text-[#696868] font-bold">Theme</p>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="starter-value flex justify-between items-center tb:w-[496px] w-[295px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px]"
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
                      {themes.map((item) => (
                        <div
                          onClick={() => setSelectedTheme(item)}
                          key={item.label}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="color flex items-center gap-[12px]">
                            <div
                              className="circle w-[16px] h-[16px] rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <p>{item.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleAddPot}
              className="mt-[20px] tb:w-[496px] py-[16px] w-[295px] bg-[#201F24] rounded-[8px] text-white font-bold text-[14px]"
            >
              Add Pot
            </button>
          </div>
        </div>
      )}
      <div className="boxes dk:flex dk:flex-wrap dk:gap-[24px] dk:mt-[32px] dk:justify-center">
        {finance.pots.map((pot) => {
          const percent = pot.target
            ? Math.min((pot.total / pot.target) * 100, 100)
            : 0;
          const themeColor = pot.theme || "#277C78";
          return (
            <div
              key={pot.name}
              className="pot-box w-[343px] dk:w-[518px] tb:w-[688px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]"
            >
              <div className="first-line flex items-center justify-between">
                <div className="name flex items-center">
                  <div
                    className="circle w-[16px] h-[16px] rounded-full"
                    style={{ backgroundColor: themeColor }}
                  ></div>
                  <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                    {pot.name}
                  </p>
                </div>
                <div className="dots relative">
                  <img
                    src={elipsis}
                    alt="elipsis icon"
                    className="cursor-pointer"
                    onClick={() =>
                      setOpenPotSettings(
                        openPotSettings === pot.name ? null : pot.name
                      )
                    }
                  />
                  {openPotSettings === pot.name && (
                    <div className="absolute right-0 top-7 z-10 w-[134px] py-[12px] px-[20px] rounded-[12px] bg-white shadow-sort">
                      <p
                        className="text-[14px] cursor-pointer text-[#201F24] font-normal leading-[150%] cursor-pointer"
                        onClick={() => {
                          setEditPot(pot);
                          setEditPotName(pot.name);
                          setEditPotTarget(pot.target);
                          setEditPotTheme(pot.theme);
                          setOpenPotSettings(null);
                        }}
                      >
                        Edit Pot
                      </p>
                      <div className="divider w-[94px] h-[1px] bg-[#F2F2F2] mt-[12px] mb-[12px]"></div>
                      <p
                        className="text-[14px] cursor-pointer text-[#C94736] font-normal leading-[150%] cursor-pointer"
                        onClick={() => {
                          setFinance({
                            ...finance,
                            pots: finance.pots.filter(
                              (p) => p.name !== pot.name
                            ),
                          });
                          setOpenPotSettings(null);
                        }}
                      >
                        Delete Pot
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="totalsaved mt-[42.5px] flex items-center justify-between">
                <p className="text-[14px] font-normal text-[#696868]">
                  Total Saved
                </p>
                <p className="text-[32px] font-bold text-[#201F24]">
                  ${pot.total.toFixed(2)}
                </p>
              </div>
              <div className="progressline mt-[16px] w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
                <div
                  className="line h-full rounded-[4px]"
                  style={{
                    backgroundColor: themeColor,
                    width: `${percent}%`,
                  }}
                ></div>
              </div>
              <div className="progress-info flex items-center mt-[13px] justify-between">
                <p className="text-[12px] font-bold text-[#696868]">
                  {percent.toFixed(1)}%
                </p>
                <p className="text-[12px] font-bold text-[#696868]">
                  Target of ${pot.target?.toLocaleString()}
                </p>
              </div>
              <div className="buttons mt-[42.5px] flex items-center justify-between">
                <button
                  onClick={() => openTransactionModal(pot, "add")}
                  className="w-[143.5px] hover:bg-[#FFF] hover:border-[#98908B] cursor-pointer hover:border-[1px] rounded-[8px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px"
                >
                  + Add Money
                </button>
                <button
                  onClick={() => openTransactionModal(pot, "withdraw")}
                  className="w-[143.5px] dk:w-[227px] tb:w-[312px] cursor-pointer text-[14px] font-bold text-[#201F24] hover:bg-[#FFF] hover:border-[#98908B] hover:border-[1px] hover:rounded-[8px] py-[16px] text-center bg-[#F8F4F0] rounded-8px"
                >
                  Withdraw
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
