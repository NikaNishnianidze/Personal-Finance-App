import overview from "../../public/assets/images/icon-nav-overview.svg";
import transactions from "../../public/assets/images/icon-nav-transactions.svg";
import budget from "../../public/assets/images/icon-nav-budgets.svg";
import pots from "../../public/assets/images/icon-nav-pots.svg";
import logo from "../../public/assets/images/logo-large.svg";
import bills from "../../public/assets/images/icon-nav-recurring-bills.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActive } = useUser();

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
      <header className="bottom-nav mb:block tb:block dk:hidden mb:py-[8px] mb:px-[16px] mb:flex mb:items-center mb:justify-center tb:py-[8px] tb:px-[16px] tb:flex tb:items-center tb:justify-center">
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
          style={{
            backgroundColor: currentPath == "/home/pots" ? "#F8F4F0" : "",
            borderBottom:
              currentPath == "/home/pots" ? "4px solid #277C78" : "",
          }}
          onClick={goPots}
          className="pots w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img
            src={pots}
            alt="pots"
            style={{
              filter:
                currentPath === "/home/pots"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: currentPath == "/home/bills" ? "#F8F4F0" : "",
            borderBottom:
              currentPath == "/home/bills" ? "4px solid #277C78" : "",
          }}
          onClick={goBills}
          className="bills w-[68.6px] py-[8px] px-[22.3px] rounded-t-[8px] flex justify-center"
        >
          <img
            src={bills}
            alt="bills"
            style={{
              filter:
                currentPath === "/home/bills"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
        </div>
      </header>

      <header className="hidden dk:flex dk:flex-col dk:fixed dk:top-0 dk:left-0 dk:h-full dk:w-[300px] dk:py-[40px]  dk:bg-headercolor dk:justify-start dk:items-start dk:gap-2 dk:shadow-md">
        <div className="logo ">
          <img src={logo} alt="logo icon" className="ml-[32px]" />
        </div>
        <div
          onClick={GoHome}
          style={{
            backgroundColor: currentPath == "/home" ? "#F8F4F0" : "",
            borderLeft: currentPath == "/home" ? "4px solid #277C78" : "",
          }}
          className="overview w-[276px] mt-[64px]  py-[16px] px-[22.3px] rounded-r-[12px] flex items-center"
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
          <p
            className="ml-[16px] text-[16px] font-bold"
            style={{ color: currentPath == "/home" ? "#201F24" : "#B3B3B3" }}
          >
            Overview
          </p>
        </div>
        <div
          style={{
            backgroundColor:
              currentPath == "/home/transactions" ? "#F8F4F0" : "",
            borderLeft:
              currentPath == "/home/transactions" ? "4px solid #277C78" : "",
          }}
          onClick={goTransactions}
          className="transactions w-full py-[16px] px-[22.3px] rounded-r-[12px] flex items-center"
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
          <p
            className="ml-[16px] text-[16px] font-bold"
            style={{
              color:
                currentPath == "/home/transactions" ? "#201F24" : "#B3B3B3",
            }}
          >
            Transactions
          </p>
        </div>
        <div
          style={{
            backgroundColor: currentPath == "/home/budget" ? "#F8F4F0" : "",
            borderLeft:
              currentPath == "/home/budget" ? "4px solid #277C78" : "",
          }}
          onClick={goBudget}
          className="budget w-full py-[16px] px-[22.3px] rounded-r-[12px] flex items-center"
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
          <p
            className="ml-[16px] text-[16px] font-bold"
            style={{
              color: currentPath == "/home/budget" ? "#201F24" : "#B3B3B3",
            }}
          >
            Budgets
          </p>
        </div>
        <div
          style={{
            backgroundColor: currentPath == "/home/pots" ? "#F8F4F0" : "",
            borderLeft: currentPath == "/home/pots" ? "4px solid #277C78" : "",
          }}
          onClick={goPots}
          className="pots w-full py-[16px] px-[22.3px] rounded-r-[12px] flex items-center"
        >
          <img
            src={pots}
            alt="pots"
            style={{
              filter:
                currentPath === "/home/pots"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
          <p
            className="ml-[16px] text-[16px] font-bold"
            style={{
              color: currentPath == "/home/pots" ? "#201F24" : "#B3B3B3",
            }}
          >
            Pots
          </p>
        </div>
        <div
          style={{
            backgroundColor: currentPath == "/home/bills" ? "#F8F4F0" : "",
            borderLeft: currentPath == "/home/bills" ? "4px solid #277C78" : "",
          }}
          onClick={goBills}
          className="bills w-full py-[16px] px-[22.3px] rounded-r-[12px] flex items-center"
        >
          <img
            src={bills}
            alt="bills"
            style={{
              filter:
                currentPath === "/home/bills"
                  ? "invert(32%) sepia(96%) saturate(500%) hue-rotate(120deg) brightness(90%) contrast(85%)"
                  : "none",
            }}
          />
          <p
            className="ml-[16px] text-[16px] font-bold"
            style={{
              color: currentPath == "/home/bills" ? "#201F24" : "#B3B3B3",
            }}
          >
            Recurring Bills
          </p>
        </div>
      </header>
    </>
  );
}
