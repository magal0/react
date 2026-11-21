
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Contact() {
  return (
    <main>
      <section className="bg-orange-50 text-center py-20">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-4">We would love to hear from you</p>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold">Contact Information</h2>
        <p className="mt-5">Phone: +123 456 789</p>
        <p>Email: restaurant@gmail.com</p>
        <p>Address: Main Street</p>
      </section>

      <section className="max-w-xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us A Message
        </h2>

        <div className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" />
          <Textarea placeholder="Your Message" />
          <Button className="w-full">Send Message</Button>
        </div>
      </section>

      <section className="bg-gray-50 py-12 text-center">
        <h2 className="text-3xl font-bold">Opening Hours</h2>
        <p className="mt-4">Every day: 09:00 - 23:00</p>
      </section>

      <section className="bg-orange-100 py-12 text-center">
        <h2 className="text-3xl font-bold">Find Us</h2>
        <p className="mt-4">Come visit our restaurant!</p>
      </section>
    </main>
  );
}

export default Contact;
