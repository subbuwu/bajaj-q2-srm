"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/services/formService";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [rollNo, setRollNo] = useState<string>("");
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (rollNo.trim() == "" || name.trim() == "") {
      toast.warning("Please enter name and roll number");
      return;
    }
    setLoading(true);
    try {
      const { data, resStatus } = await createUser(rollNo, name);
      console.log(data);
      if (
        (data.message =
          "User already exists. Fetch /get-form to get form json" ||
          resStatus == 409)
      ) {
        toast.info("User Already Exists, Redirecting...");
        router.push("/form");
      }
    } catch (error) {
      toast.error("Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto text-black p-4 mt-10">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-4xl mb-8 text-center text-neutral-700 font-medium">
          Dynamic Form Builder
        </h1>
        <div className="space-y-1">
          <Label className="text-base text-blue-500">Roll Number</Label>
          <Input
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your roll number (Eg. RA22..)"
            className=" border border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 outline-none "
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-base text-blue-500">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (Eg. Subramanian)"
            className=" border border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 outline-none "
            disabled={loading}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            className="mx-auto px-10 font-medium bg-blue-500 hover:bg-blue-700 transition-all duration-150"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex items-center gap-4 justify-center">
                <p>Creating User, Please wait</p>
                <Loader2 className="animate-spin text-green-400 w-4 h-4" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
