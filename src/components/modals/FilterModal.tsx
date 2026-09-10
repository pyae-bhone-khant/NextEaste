"use client"
import { useFilterModalStore } from "@/store/useFilterModalStore";
import Modal from "./modals";
import { useState } from "react";
import { propertyTypes } from "@/constants/PropertityType";
import PropertyTypeCard from "./PropertyTypeCard";
import Button from "../ui/Button";
import Input from "../ui/Input";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICE: 2,
}

export default function FilterModal() {
  const { close, isOpen } = useFilterModalStore();
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(STEPS.TYPE);
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Where is the property located?";
      case STEPS.PRICE:
        return "Select a price range";
      default:
        return "";
    }
  }; 

  const applyFilter = () => { 

  }

  return (
    <Modal title="Filter Properties" onClose={close} isOpen={isOpen} >
     <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span >Step {step + 1} of 3 </span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div> 

        <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300 ">
          {step === STEPS.TYPE && ( 
                      <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
                        {propertyTypes.map((item, index) => (
                          <PropertyTypeCard label={item.label} icon={item.icon} selected={propertyType === item.slug} key={index} onClick={() => setPropertyType(item.slug)} />
                        ))}         
                      </div>
          )}
          {step === STEPS.LOCATION && (
             <div className="space-y-6 w-full">
                        <Input name="location" label="location" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
                        <Input name="address" label="address" value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
            
                      </div>
          )} 
          {step === STEPS.PRICE && (
            <div className="grid grid-cols-2 gap-4">
               <div>
                <Input label="Min-Price" name="min-price" type="number" value={minprice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}  />
               </div>
                 <div>
                <Input label="Max-Price" name="max-price" type="number" value={maxprice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}  />
               </div>
            </div>
          )}
        </div>
         <div className="mt-8 flex gap-3 ">
                {step > STEPS.TYPE && (
                  <Button fullWidth variant="outline" onClick={() => setStep((prev) => prev - 1)}>Back</Button>
                )}
                <Button fullWidth onClick={() => step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilter()}  >
                  {step === STEPS.PRICE ? "Apply Filter" : "Next"}
                </Button>
              </div>
    </Modal>
  )
}