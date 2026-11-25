import { Card, CardContent } from "@/components/ui/card";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-6 text-3xl font-bold">
          Users Management
        </h1>

        <Card>
          <CardContent className="p-6">
            Users Table
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default Contact;
