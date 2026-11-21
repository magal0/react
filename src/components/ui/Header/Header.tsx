
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-5 bg-white shadow">
      <h1 className="text-2xl font-bold text-orange-600">
        Bella Restaurant
      </h1>

      <nav className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Button>Order Now</Button>
    </header>
  );
}

export default Header;
