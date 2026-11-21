
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-8xl font-bold text-orange-600">
        404
      </h1>

      <h2 className="text-3xl font-bold">
        Page Not Found
      </h2>

      <p className="text-gray-500">
        Sorry, this page does not exist.
      </p>

      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
