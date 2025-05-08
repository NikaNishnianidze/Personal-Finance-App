import overview from "../../public/assets/images/icon-nav-overview.svg";
import transactions from "../../public/assets/images/icon-nav-transactions.svg";
import budget from "../../public/assets/images/icon-nav-budgets.svg";
import pots from "../../public/assets/images/icon-nav-pots.svg";
import bills from "../../public/assets/images/icon-nav-recurring-bills.svg";
export default function Navigation() {
  return (
    <>
      <header className="bottom-nav py-[8px] px-[16px] flex items-center">
        <div className="overview w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px]">
          <img src={overview} alt="overview" />
        </div>
        <div className="transactions w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px]">
          <img src={transactions} alt="transactions" />
        </div>
        <div className="budget w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px]">
          <img src={budget} alt="budget" />
        </div>
        <div className="pots w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px]">
          <img src={pots} alt="pots" />
        </div>
        <div className="bills w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px]">
          <img src={bills} alt="bills" />
        </div>
      </header>
    </>
  );
}
