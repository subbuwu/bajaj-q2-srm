"use client";
import { useEffect, useState } from "react";
import { FormResponse } from "@/types/Form";
import { getFormDetails } from "@/services/formService";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormPage() {
  const [formData, setFormData] = useState<FormResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [sectionNum, setSectionNum] = useState<number>(0);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const fetchFormData = async () => {
      const rollNo = localStorage.getItem("rollNum");
      const data = await getFormDetails(rollNo ?? "");
      setFormData(data);
      console.log(data);
      setLength(data.form.sections.length ?? 0);
      setLoading(false);
    };
    try {
      fetchFormData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleButtonClick = (type: string) => {
    if (type == "prev") {
      if (sectionNum <= length && sectionNum >= 1) {
        setSectionNum(sectionNum - 1);
      } else {
        setSectionNum(0);
      }
    } else if (type == "next") {
      const nn = sectionNum + 1;
      if (nn == length) {
        return;
      } else if (sectionNum < length) {
        setSectionNum(sectionNum + 1);
      }
    }
  };

  //   3

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto text-black p-4 mt-10">
        <div className="max-w-7xl mx-auto ">
          {" "}
          <div className="space-y-2 flex items-center flex-col justify-center gap-2">
            <p className="text-2xl">Loading Form Data...</p>
            <Loader2 className="animate-spin text-green-400 w-12 h-12" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center mx-auto text-black p-4 mt-10">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-4xl font-medium text-neutral-700">
          {formData?.form.formTitle}
        </h1>

        <Card className="border border-blue-200 p-4 shadow-md mt-6 ">
          <CardTitle className="text-xl text-center text-neutral-500">
            {sectionNum + 1} / {formData?.form.sections.length} Section
          </CardTitle>

          <CardContent>
            <p className="text-xl font-medium text-blue-500">
              {formData?.form.sections[sectionNum].title}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleButtonClick("next");
              }}
            >
              {formData?.form.sections[sectionNum].fields.map((field) => (
                <div key={field.fieldId}>
                  {field.type == "text" && (
                    <div className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <Input
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        required={field.required}
                      />
                    </div>
                  )}
                  {field.type == "textarea" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <Input
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        required={field.required}
                      />
                    </div>
                  )}
                  {field.type == "email" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <Input
                        type="email"
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        required={field.required}
                      />
                    </div>
                  )}
                  {field.type == "tel" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <Input
                        type="tel"
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        required={field.required}
                      />
                    </div>
                  )}
                  {field.type == "date" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <Input
                        type="date"
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        required={field.required}
                      />
                    </div>
                  )}
                  {field.type == "radio" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <Label>{field.label}</Label>
                      <RadioGroup>
                        {field.options?.map((option) => (
                          <div
                            key={option.dataTestId}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {field.type == "checkbox" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      <div className="items-top flex space-x-2">
                        <Checkbox id={field.fieldId} />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={field.fieldId}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {field.label}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {field.type == "dropdown" && (
                    <div key={field.fieldId} className="space-y-1 my-4">
                      {field.label}
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-end">
                <Button
                  className="mr-2"
                  onClick={() => handleButtonClick("prev")}
                >
                  Prev
                </Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          </CardContent>

          <div className="flex items-center justify-center mx-auto w-full">
            {sectionNum + 1 == length && (
              <Button className="px-12 bg-blue-500 hover:bg-blue-600 transition-all duratin-150 text-white">
                Submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
