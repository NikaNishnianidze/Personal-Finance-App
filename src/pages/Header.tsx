import logo from "../../public/assets/images/logo-large.svg";
export default function Header() {
  return (
    <>
      <header className="w-full py-[24px] flex justify-center bg-headercolor rounded-b-[8px]">
        <img src={logo} alt="" />
      </header>
    </>
  );
}
