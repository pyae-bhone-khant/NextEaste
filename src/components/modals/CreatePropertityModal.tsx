"use client"
import { useCreatePropertyModalStore } from "@/store/createPropertyModalStore";
import Modal from "./modals";
import { useState } from "react";
import Button from "../ui/Button";
import { propertyTypes } from "@/constants/PropertityType";
import PropertyTypeCard from "./PropertyTypeCard";
import Input from "../ui/Input";
import Counter from "../property/Counter";
import ImageUplode from "../property/ImageUplode";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURE: 3,
  IMAGE: 4,
  PRICING: 5,
}

export default function CreatePropertityModal() {
  const [step, setStep] = useState(STEPS.TYPE)
  const [loading, setLoading] = useState(false)
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("")
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");
  const router = useRouter()

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return " Select Property type "
      case STEPS.LOCATION:
        return " Where is the property located ?  "
      case STEPS.FEATURE:
        return " Property description ?  "
      case STEPS.DETAILS:
        return " Share one basic about your place  "
      case STEPS.IMAGE:
        return " Uplode property Image"
      case STEPS.PRICING:
        return " Set Property price  "
      default:
        return " "
    }
  }
  const { isOpen, close } = useCreatePropertyModalStore();
  const createListing = async () => {
    try { 
      setLoading(true) 

      const fromData = new FormData();


      fromData.append("title" , title) 
      fromData.append("description" , description) 
      fromData.append("location" , location) 
      fromData.append("address" , address) 
      fromData.append("bedrooms" , bedrooms.toString()) 
      fromData.append("bathrooms" , bathrooms.toString()) 
      fromData.append("parkingSpaces" , parkingSpaces.toString()) 
      fromData.append("area" , area) 
      fromData.append("listingType" , listingType) 
      fromData.append("price" , price) 
      fromData.append("propertyType" , propertyType) 
      // fromData.append("image" , image as File) 
      if (image) {
        fromData.append("image" , image)
      }  

      await axios.post("/api/properties", fromData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
     toast.success("Property created successfully")
     router.replace("/properties")
     handleClose()
    }  catch (error) {
      if(axios.isAxiosError(error)) {
         toast.error(error.response?.data.message || "Something went wrong")
         return ; 
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file))
  } 
   
  const  handleClose = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setAddress("");
    setBedrooms(0);
    setBathrooms(0);
    setParkingSpaces(0);
    setArea("");
    setListingType("rent");
    setPrice("");
    setImage(null);
    setPreview("");
    setStep(0);
    close();
  }

  return (
    <Modal onClose={close} isOpen={isOpen} title="create a new listing ">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span >Step {step + 1} of 6 </span>
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

        {step === STEPS.DETAILS && (
          <div className="divide-y divide-gray-200">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms does it have?"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bathrooms"
              subTitle="How many bathrooms does it have?"
              value={bathrooms}
              onChange={setBathrooms}
            />
            <Counter
              title="Parking spaces"
              subTitle="How many parking spaces are available?"
              value={parkingSpaces}
              onChange={setParkingSpaces}
              min={0}
            />
            <div className="pt-6">
              <Input
                name="area"
                label="Area (sq ft)"
                type="number"
                min={1}
                value={area}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setArea(event.target.value)}
              />
            </div>
          </div>
        )}
        {step === STEPS.FEATURE && (
          <div className="space-y-6">
            <Input name="title" label="Property Title" value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              } />
            <Input as="textarea" name="description" label="Description" value=
              {description} onChange={(e: React.
                ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              } />
          </div>
        )}

        {step === STEPS.IMAGE && (
          <ImageUplode preview={preview} onChange={handleChange} />
        )}

        {step === STEPS.PRICING && (
          <div className="space-y-6">
            <select value={listingType} onChange={(e) => setListingType(e.target.value as "sale" | "rent")} className="h-13 w-full rounded-2xl border border-black/10 px-4">
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>

            <Input name="price" label={listingType === "sale" ? "Sale Price" : "Monthly Rent"} type="number" value={price} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
          </div>
        )}

      </div>

      <div className="mt-8 flex gap-3 ">
        {step > STEPS.TYPE && (
          <Button fullWidth variant="outline" onClick={() => setStep((prev) => prev - 1)}>Back</Button>
        )}
        <Button fullWidth onClick={() => {
          if (step === STEPS.TYPE && !propertyType) {
            toast.error("Please select a property type")
            return
          }
          step < STEPS.PRICING ? setStep((prev) => prev + 1) : createListing()
        }} loading={loading} >
          {step === STEPS.PRICING ? "Create Listing " : "Next"}
        </Button>
      </div>
    </Modal>
  )
} 