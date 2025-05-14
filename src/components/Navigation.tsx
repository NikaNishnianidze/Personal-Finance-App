import overview from "../../public/assets/images/icon-nav-overview.svg";
import transactions from "../../public/assets/images/icon-nav-transactions.svg";
import budget from "../../public/assets/images/icon-nav-budgets.svg";
import pots from "../../public/assets/images/icon-nav-pots.svg";
import bills from "../../public/assets/images/icon-nav-recurring-bills.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActive } = useUser();
  console.log(currentPath);
  const GoHome = () => {
    navigate("/home");
    setActive("/home");
  };
  const goTransactions = () => {
    navigate("/home/transactions");
    setActive("/home/transactions");
  };
  const goBudget = () => {
    navigate("/home/budget");
    setActive("/home/budget");
  };
  const goPots = () => {
    navigate("/home/pots");
    setActive("/home/pots");
  };
  const goBills = () => {
    navigate("/home/bills");
    setActive("/home/bills");
  };
  return (
    <>
      <header className="bottom-nav py-[8px] px-[16px] flex items-center justify-center">
        <div
          onClick={GoHome}
          style={{
            backgroundColor: currentPath == "/home" ? "#F8F4F0" : "",
            borderBottom: currentPath == "/home" ? "4px solid #277C78" : "",
          }}
          className="overview w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center "
        >
          <img
            src={overview}
            alt="overview"
            style={{
              filter:
                currentPath === "/home"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor:
              currentPath == "/home/transactions" ? "#F8F4F0" : "",
            borderBottom:
              currentPath == "/home/transactions" ? "4px solid #277C78" : "",
          }}
          onClick={goTransactions}
          className="transactions w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img
            src={transactions}
            alt="transactions"
            style={{
              filter:
                currentPath === "/home/transactions"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: currentPath == "/home/budget" ? "#F8F4F0" : "",
            borderBottom:
              currentPath == "/home/budget" ? "4px solid #277C78" : "",
          }}
          onClick={goBudget}
          className="budget w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img
            src={budget}
            alt="budget"
            style={{
              filter:
                currentPath === "/home/budget"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
        </div>
        <div
          onClick={goPots}
          className="pots w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img src={pots} alt="pots" />
        </div>
        <div
          onClick={goBills}
          className="bills w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img src={bills} alt="billss" />
        </div>
      </header>
    </>
  );
}
