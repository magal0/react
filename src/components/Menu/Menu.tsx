
import { Card, CardContent } from "@/components/ui/card";

function Menu() {
  const dishes = [
    { name: "Pizza", price: "$12" },
    { name: "Burger", price: "$10" },
    { name: "Pasta", price: "$14" },
    { name: "Salad", price: "$8" },
  ];

  return (
    <main>
      <section className="bg-orange-50 text-center py-20">
        <h1 className="text-5xl font-bold">Our Menu</h1>
        <p className="mt-4">Discover our delicious food</p>
      </section>

      {["Breakfast", "Lunch", "Dinner", "Drinks"].map(
        (category) => (
          <section key={category} className="py-12 px-10">
            <h2 className="text-3xl font-bold mb-8">
              {category}
            </h2>

            <div className="grid md:grid-cols-4 gap-5">
              {dishes.map((dish) => (
                <Card key={dish.name}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl">
                      {dish.name}
                    </h3>
                    <p className="mt-3">{dish.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      )}
    </main>
  );
}

export default Menu;
