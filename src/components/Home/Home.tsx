
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Home() {
  return (
    <main>
      {/* Section 1 */}
      <section className="bg-orange-50 text-center py-24">
        <h1 className="text-5xl font-bold">
          Welcome To Bella Restaurant
        </h1>
        <p className="mt-5 text-gray-600">
          Delicious food made with love.
        </p>
        <Button className="mt-6">Explore Menu</Button>
      </section>

      {/* Section 2 */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p className="mt-4 max-w-xl mx-auto">
          We serve fresh, tasty and delicious food
          for everyone.
        </p>
      </section>

      {/* Section 3 */}
      <section className="bg-gray-50 py-16 px-10">
        <h2 className="text-3xl font-bold text-center">
          Popular Dishes
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {["Pizza", "Burger", "Pasta"].map((item) => (
            <Card key={item}>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold">{item}</h3>
                <p className="mt-3">$15.00</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        <div className="flex justify-center gap-10 mt-8 flex-wrap">
          <p>Fresh Food</p>
          <p>Best Chefs</p>
          <p>Good Service</p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-orange-100 text-center py-16">
        <h2 className="text-3xl font-bold">
          Come And Enjoy Our Food
        </h2>
        <p className="mt-3">We are waiting for you!</p>
        <Button className="mt-5">Book A Table</Button>
      </section>
    </main>
  );
}

export default Home;
