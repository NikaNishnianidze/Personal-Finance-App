import { useUser } from "../context/UserProvider";

export default function Home() {
  const { finance } = useUser();
  return <></>;
}
