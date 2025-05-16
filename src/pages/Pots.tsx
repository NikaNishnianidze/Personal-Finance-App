import elipsis from "../../public/assets/images/icon-ellipsis.svg";
import caretRight from "../../public/assets/images/icon-caret-right.svg";
import { useUser } from "../context/UserProvider";

export default function Pots() {
  const { finance } = useUser();
  const savingTotal = finance.pots.filter((item) => item.name === "Savings");
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
    <div className="flex flex-col items-center py-[9px] px-[16px]">
      <div className="first-line flex items-center justify-between w-full">
        <p className="text-[32px] text-[#201F24] font-bold">Pots</p>
        <button className="w-[155px] rounded-[8px] text-white font-bold py-[16px] text-[14px] text-center bg-[#201F24]">
          + Add New Pot
        </button>
      </div>
      <div className="savings-box w-[343px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[33.5px]">
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
          <p className="text-[14px] font-normal text-[#696868]">Total Saved</p>
          <p className="text-[32px] font-bold text-[#201F24]">
            ${savingTotal.map((item) => item.total.toFixed(2))}
          </p>
        </div>
        <div className="progressline mt-[16px] w-[303px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
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
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              + Add Money
            </button>
          </div>
          <div className="withdraw">
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="concert-ticketbox w-[343px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
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
          <p className="text-[14px] font-normal text-[#696868]">Total Saved</p>
          <p className="text-[32px] font-bold text-[#201F24]">
            ${concertTotalNumber[0].toFixed(2)}
          </p>
        </div>
        <div className="progressline mt-[16px] w-[303px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
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
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              + Add Money
            </button>
          </div>
          <div className="withdraw">
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="gift-box w-[343px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
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
          <p className="text-[14px] font-normal text-[#696868]">Total Saved</p>
          <p className="text-[32px] font-bold text-[#201F24]">
            ${giftTotalNumber[0].toFixed(2)}
          </p>
        </div>
        <div className="progressline mt-[16px] w-[303px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
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
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              + Add Money
            </button>
          </div>
          <div className="withdraw">
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="new-laptop-box w-[343px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
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
          <p className="text-[14px] font-normal text-[#696868]">Total Saved</p>
          <p className="text-[32px] font-bold text-[#201F24]">
            ${laptopTotalNumber[0].toFixed(2)}
          </p>
        </div>
        <div className="progressline mt-[16px] w-[303px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
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
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              + Add Money
            </button>
          </div>
          <div className="withdraw">
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="Holiday-box mb-20 w-[343px] rounded-[12px] bg-white py-[24px] px-[20px] mt-[24px]">
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
          <p className="text-[14px] font-normal text-[#696868]">Total Saved</p>
          <p className="text-[32px] font-bold text-[#201F24]">
            ${holidayTotalNumber[0].toFixed(2)}
          </p>
        </div>
        <div className="progressline mt-[16px] w-[303px] h-[8px] bg-[#F8F4F0] rounded-[4px]">
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
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              + Add Money
            </button>
          </div>
          <div className="withdraw">
            <button className="w-[143.5px] text-[14px] font-bold text-[#201F24] py-[16px] text-center bg-[#F8F4F0] rounded-8px">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
