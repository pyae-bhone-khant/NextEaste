"use client";
import { useFilterModalStore } from "@/store/useFilterModalStore";
import Modal from "./modals";
import { useState } from "react";
import { propertyTypes } from "@/constants/PropertityType";
import PropertyTypeCard from "./PropertyTypeCard";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = {
  TYPE:     0,
  LOCATION: 1,
  PRICE:    2,
};

export default function FilterModal() {
  const { close, isOpen } = useFilterModalStore();
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Initialise from current URL so the modal reflects active filters
  const [propertyType, setPropertyType] = useState(searchParams.get("type")     ?? "");
  const [location,     setLocation]     = useState(searchParams.get("location") ?? "");
  const [minprice,     setMinPrice]     = useState(searchParams.get("minPrice") ?? "");
  const [maxprice,     setMaxPrice]     = useState(searchParams.get("maxPrice") ?? "");
  const [step,         setStep]         = useState(STEPS.TYPE);

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:     return "Select property type";
      case STEPS.LOCATION: return "Where is the property located?";
      case STEPS.PRICE:    return "Select a price range";
      default:             return "";
    }
  };

  const applyFilter = () => {
    const current = new URLSearchParams(searchParams.toString());

    // Apply / remove each filter key
    propertyType ? current.set("type",     propertyType) : current.delete("type");
    location     ? current.set("location", location)     : current.delete("location");
    minprice     ? current.set("minPrice", minprice)     : current.delete("minPrice");
    maxprice     ? current.set("maxPrice", maxprice)     : current.delete("maxPrice");

    // Always land on marketplace
    router.push(`/marketplace?${current.toString()}`);
    close();
    setStep(STEPS.TYPE); // reset step for next open
  };

  const handleClose = () => {
    close();
    setStep(STEPS.TYPE);
  };

  return (
    <Modal title="Filter Properties" onClose={handleClose} isOpen={isOpen}>
      {/* Step progress */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <div className="flex gap-1.5">
          {[STEPS.TYPE, STEPS.LOCATION, STEPS.PRICE].map((s) => (
            <span
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s
                  ? "w-8 bg-primary"
                  : step > s
                  ? "w-4 bg-primary/40"
                  : "w-4 bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-200">
        {/* Step 0 — Property type */}
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 gap-3 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item, index) => (
              <PropertyTypeCard
                key={index}
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() =>
                  setPropertyType((prev) => (prev === item.slug ? "" : item.slug))
                }
              />
            ))}
          </div>
        )}

        {/* Step 1 — Location */}
        {step === STEPS.LOCATION && (
          <div className="space-y-5 w-full">
            <Input
              name="location"
              label="City or neighborhood"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            {location && (
              <p className="text-xs text-primary font-medium">
                Filtering by: {location}
              </p>
            )}
          </div>
        )}

        {/* Step 2 — Price range */}
        {step === STEPS.PRICE && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Price ($)"
                name="min-price"
                type="number"
                value={minprice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(e.target.value)
                }
              />
              <Input
                label="Max Price ($)"
                name="max-price"
                type="number"
                value={maxprice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(e.target.value)
                }
              />
            </div>
            {(minprice || maxprice) && (
              <p className="text-xs text-primary font-medium">
                {minprice && maxprice
                  ? `$${Number(minprice).toLocaleString()} – $${Number(maxprice).toLocaleString()}`
                  : minprice
                  ? `From $${Number(minprice).toLocaleString()}`
                  : `Up to $${Number(maxprice).toLocaleString()}`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            fullWidth
            variant="outline"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        <Button
          fullWidth
          onClick={() =>
            step < STEPS.PRICE
              ? setStep((prev) => prev + 1)
              : applyFilter()
          }
        >
          {step === STEPS.PRICE ? "Apply Filters" : "Next"}
        </Button>
      </div>
    </Modal>
  );
}