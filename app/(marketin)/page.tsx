import Link from "next/link";
import Navbar from "./_components/navbar";

export default function Home() {
  //home
  const links = [
    { name: `home`, to: `/home` },
    { name: `current`, to: `/` },
    { name: `signin`, to: `/signin` },
    { name: `signup`, to: `/signup` },
    { name: `waitlist`, to: `/waitlist` },
  ];
  return (
    <div>
      <header>
        <Navbar />
        <ul className="flex flex-col justify-center w-full items-center">
          {links.map((item, index) => (
            <span key={item.to}>
              {index + 1}. <Link href={item.to}>{item.name}</Link>
            </span>
          ))}
        </ul>
      </header>
    </div>
  );
}
