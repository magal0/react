
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Reservation() {
  return (
    <main>
      <section className="bg-orange-50 text-center py-20">
        <h1 className="text-5xl font-bold">Reservation</h1>
        <p className="mt-4">Book your table today</p>
      </section>

      <section className="max-w-xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Book A Table
        </h2>

        <div className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" type="email" />
          <Input placeholder="Phone Number" />
          <Input placeholder="Number of Guests" type="number" />
          <Input placeholder="Date" type="date" />
          <Input placeholder="Time" type="time" />

          <Button className="w-full">
            Reserve Now
          </Button>
        </div>
      </section>

      <section className="bg-gray-50 py-12 text-center">
        <h2 className="text-3xl font-bold">Opening Hours</h2>
        <p className="mt-4">Monday - Sunday</p>
        <p>09:00 AM - 11:00 PM</p>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold">Our Location</h2>
        <p className="mt-4">Visit our restaurant</p>
      </section>

      <section className="bg-orange-100 py-12 text-center">
        <h2 className="text-2xl font-bold">
          Reservation Information
        </h2>
        <p className="mt-4">
          Please book your table in advance.
        </p>
      </section>
    </main>
  );
}

export default Reservation;
