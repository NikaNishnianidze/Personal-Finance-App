import elipsis from "../../public/assets/images/icon-ellipsis.svg";
import caretDown from "../../public/assets/images/icon-caret-down.svg";
import closeIcon from "../../public/assets/images/icon-close-modal.svg";
import { useUser } from "../context/UserProvider";
import { useState } from "react";

export default function Pots() {
  const { finance } = useUser();
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
  const savingTotal = finance.pots.filter((item) => item.name === "Savings");
  const [addPot, setAddPot] = useState<boolean>(false);
  const [potName, setPotName] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState(
    themes.find((t) => t.value === "green")
  );
  const savingTarget = savingTotal.map((item) => item.target);
  const savingTotalNumber = savingTotal.map((item) => item.total);
  //concert ticket
  const concertTotal = finance.pots.filter(
    (item) => item.name == "Concert Ticket"
  );
  const concertTarget = concertTotal.map((item) => item.target);
  const concertTotalNumber = concertTotal.map((item) => item.total);
  //gift
  const giftTotal = finance.pots.filter((item) => item.name === "Gift");
  const giftTarget = giftTotal.map((item) => item.target);
  const giftTotalNumber = giftTotal.map((item) => item.total);
  //newLaptop
  const laptopTotal = finance.pots.filter((item) => item.name === "New Laptop");
  const laptopTarget = laptopTotal.map((item) => item.target);
  const laptopTotalNumber = laptopTotal.map((item) => item.total);
  //holiday
  const holidayTotal = finance.pots.filter((item) => item.name === "Holiday");
  const holidayTarget = holidayTotal.map((item) => item.target);
  const holidayTotalNumber = holidayTotal.map((item) => item.total);

  return (
    <div className="flex flex-col items-center py-[9px] px-[16px] dk:ml-[300px] dk:mt-[40px]">
      <div className="first-line flex items-center justify-between w-full tb:w-[688px] dk:w-[1060px]">
        <p className="text-[32px] text-[#201F24] font-bold">Pots</p>
        <button
          onClick={() => setAddPot(true)}
          className="w-[155px] rounded-[8px] text-white font-bold py-[16px] text-[14px] text-center bg-[#201F24]"
        >
          + Add New Pot
        </button>
      </div>
      {addPot && (
        <div className="fixed mb-10 inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white relative p-6 rounded-xl shadow-lg w-[335px] py-[28px] px-[20px]">
            <div className="newbudget flex items-center justify-between">
              <p className="text-[20px] text-[#201F24] font-bold">
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
                type="text"
                name="name"
                maxLength={30}
                className="w-[295px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px] outline-none"
              />
            </div>
            <div className="maximum-spent flex flex-col gap-[4px] mt-[16px]">
              <p className="text-[12px] text-[#696868] font-bold">Target</p>
              <div className="d w-[295px] py-[12px] px-[20px] flex items-center gap-[12px] border-[1px] rounded-[8px] border-[#98908B]">
                <p className="text-[14px] text-[#696868] font-bold">$</p>
                <input
                  type="text"
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
            </div>
            <div className="theme">
              <div className="budget-category flex flex-col mt-[16px] gap-[4px]">
                <p className="text-[12px] text-[#696868] font-bold">Theme</p>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="starter-value flex justify-between items-center w-[295px] rounded-[8px] border-[1px] border-[#98908B] py-[12px] px-[20px]"
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
                    className="absolute top-[190px] left-5 w-[295px] py-[12px] px-[20px] rounded-[8px] bg-white shadow-sort"
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
            <button className="mt-[20px] py-[16px] w-[295px] bg-[#201F24] rounded-[8px] text-white font-bold text-[14px]">
              Add Pot
            </button>
          </div>
        </div>
      )}
      <div className="boxes dk:flex dk:flex-wrap dk:gap-[24px] dk:mt-[32px] dk:justify-center">
        <div className="savings-box w-[343px] dk:mt-0 tb:w-[688px] dk:w-[518px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[33.5px]">
          <div className="first-line flex items-center justify-between">
            <div className="name flex items-center">
              <div className="circle w-[16px] h-[16px] rounded-full bg-[#277C78]"></div>
              <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                Savings
              </p>
            </div>
            <div className="dots">
              <img src={elipsis} alt="elipsis icon" />
            </div>
          </div>
          <div className="totalsaved mt-[42.5px] flex items-center justify-between">
            <p className="text-[14px] font-normal text-[#696868]">
              Total Saved
            </p>
            <p className="text-[32px] font-bold text-[#201F24]">
              ${savingTotal.map((item) => item.total.toFixed(2))}
            </p>
          </div>
          <div className="progressline mt-[16px] w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
            <div
              className={`line bg-[#277C78] h-full rounded-[4px]`}
              style={{
                width: `${(savingTotalNumber[0] / savingTarget[0]) * 100}%`,
              }}
            ></div>
          </div>
          <div className="progress-info flex items-center mt-[13px] justify-between">
            <p className="text-[12px] font-bold text-[#696868]">
              {(savingTotalNumber[0] / savingTarget[0]) * 100}%
            </p>
            <p className="text-[12px] font-bold text-[#696868]">
              Target of ${savingTarget.toLocaleString()}
            </p>
          </div>
          <div className="buttons mt-[42.5px] flex items-center justify-between">
            <div className="add">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                + Add Money
              </button>
            </div>
            <div className="withdraw">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="concert-ticketbox w-[343px] dk:mt-0 tb:w-[688px] dk:w-[518px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
          <div className="first-line flex items-center justify-between">
            <div className="name flex items-center">
              <div className="circle w-[16px] h-[16px] rounded-full bg-[#626070]"></div>
              <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                Concert Ticket
              </p>
            </div>
            <div className="dots">
              <img src={elipsis} alt="elipsis icon" />
            </div>
          </div>
          <div className="totalsaved mt-[42.5px] flex items-center justify-between">
            <p className="text-[14px] font-normal text-[#696868]">
              Total Saved
            </p>
            <p className="text-[32px] font-bold text-[#201F24]">
              ${concertTotalNumber[0].toFixed(2)}
            </p>
          </div>
          <div className="progressline mt-[16px] w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
            <div
              className={`line bg-[#626070] h-full rounded-[4px]`}
              style={{
                width: `${(concertTotalNumber[0] / concertTarget[0]) * 100}%`,
              }}
            ></div>
          </div>
          <div className="progress-info flex items-center mt-[13px] justify-between">
            <p className="text-[12px] font-bold text-[#696868]">
              {((concertTotalNumber[0] / concertTarget[0]) * 100).toFixed(1)}%
            </p>
            <p className="text-[12px] font-bold text-[#696868]">
              Target of ${concertTarget.toLocaleString()}
            </p>
          </div>
          <div className="buttons mt-[42.5px] flex items-center justify-between">
            <div className="add">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                + Add Money
              </button>
            </div>
            <div className="withdraw">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="gift-box w-[343px] rounded-[12px] dk:mt-0 dk:w-[518px] tb:w-[688px] bg-white py-[24px] px-[20px] mt-[24px]">
          <div className="first-line flex items-center justify-between">
            <div className="name flex items-center">
              <div className="circle w-[16px] h-[16px] rounded-full bg-[#82C9D7]"></div>
              <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                Gift
              </p>
            </div>
            <div className="dots">
              <img src={elipsis} alt="elipsis icon" />
            </div>
          </div>
          <div className="totalsaved mt-[42.5px] flex items-center justify-between">
            <p className="text-[14px] font-normal text-[#696868]">
              Total Saved
            </p>
            <p className="text-[32px] font-bold text-[#201F24]">
              ${giftTotalNumber[0].toFixed(2)}
            </p>
          </div>
          <div className="progressline mt-[16px] w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
            <div
              className={`line bg-[#82C9D7] h-full rounded-[4px]`}
              style={{
                width: `${(giftTotalNumber[0] / giftTarget[0]) * 100}%`,
              }}
            ></div>
          </div>
          <div className="progress-info flex items-center mt-[13px] justify-between">
            <p className="text-[12px] font-bold text-[#696868]">
              {((giftTotalNumber[0] / giftTarget[0]) * 100).toFixed(1)}%
            </p>
            <p className="text-[12px] font-bold text-[#696868]">
              Target of ${giftTarget.toLocaleString()}
            </p>
          </div>
          <div className="buttons mt-[42.5px] flex items-center justify-between">
            <div className="add">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                + Add Money
              </button>
            </div>
            <div className="withdraw">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="new-laptop-box w-[343px] dk:mt-0 dk:w-[518px] tb:w-[688px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
          <div className="first-line flex items-center justify-between">
            <div className="name flex items-center">
              <div className="circle w-[16px] h-[16px] rounded-full bg-[#F2CDAC]"></div>
              <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                New Laptop
              </p>
            </div>
            <div className="dots">
              <img src={elipsis} alt="elipsis icon" />
            </div>
          </div>
          <div className="totalsaved mt-[42.5px] flex items-center justify-between">
            <p className="text-[14px] font-normal text-[#696868]">
              Total Saved
            </p>
            <p className="text-[32px] font-bold text-[#201F24]">
              ${laptopTotalNumber[0].toFixed(2)}
            </p>
          </div>
          <div className="progressline mt-[16px]  w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
            <div
              className={`line bg-[#F2CDAC] h-full rounded-[4px]`}
              style={{
                width: `${(laptopTotalNumber[0] / laptopTarget[0]) * 100}%`,
              }}
            ></div>
          </div>
          <div className="progress-info flex items-center mt-[13px] justify-between">
            <p className="text-[12px] font-bold text-[#696868]">
              {((laptopTotalNumber[0] / laptopTarget[0]) * 100).toFixed(1)}%
            </p>
            <p className="text-[12px] font-bold text-[#696868]">
              Target of ${laptopTarget.toLocaleString()}
            </p>
          </div>
          <div className="buttons mt-[42.5px] flex items-center justify-between">
            <div className="add">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                + Add Money
              </button>
            </div>
            <div className="withdraw">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="Holiday-box mb-20 dk:mt-0 w-[343px] dk:w-[518px] tb:w-[688px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
          <div className="first-line flex items-center justify-between">
            <div className="name flex items-center">
              <div className="circle w-[16px] h-[16px] rounded-full bg-[#826CB0]"></div>
              <p className="ml-[16px] text-[20px] text-[#201F24] font-bold">
                Holiday
              </p>
            </div>
            <div className="dots">
              <img src={elipsis} alt="elipsis icon" />
            </div>
          </div>
          <div className="totalsaved mt-[42.5px] flex items-center justify-between">
            <p className="text-[14px] font-normal text-[#696868]">
              Total Saved
            </p>
            <p className="text-[32px] font-bold text-[#201F24]">
              ${holidayTotalNumber[0].toFixed(2)}
            </p>
          </div>
          <div className="progressline mt-[16px] w-[303px] dk:w-[470px] tb:w-[640px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
            <div
              className={`line bg-[#826CB0] h-full rounded-[4px]`}
              style={{
                width: `${(holidayTotalNumber[0] / holidayTarget[0]) * 100}%`,
              }}
            ></div>
          </div>
          <div className="progress-info flex items-center mt-[13px] justify-between">
            <p className="text-[12px] font-bold text-[#696868]">
              {((holidayTotalNumber[0] / holidayTarget[0]) * 100).toFixed(1)}%
            </p>
            <p className="text-[12px] font-bold text-[#696868]">
              Target of ${holidayTarget.toLocaleString()}
            </p>
          </div>
          <div className="buttons mt-[42.5px] flex items-center justify-between">
            <div className="add">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                + Add Money
              </button>
            </div>
            <div className="withdraw">
              <button className="w-[143.5px] dk:w-[227px] tb:w-[312px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
