"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Counter from "@/components/property/Counter";
import ImageUplode from "@/components/property/ImageUplode";
import { propertyTypes } from "@/constants/PropertityType";
import PropertyTypeCard from "@/components/modals/PropertyTypeCard";
import Navbar from "@/components/navbar/Navbar";
import FrontendLayout from "@/components/layouts/FrontendLayout";

const STEPS = { TYPE: 0, LOCATION: 1, DETAILS: 2, FEATURE: 3, IMAGE: 4, PRICING: 5 };

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [step, setStep]               = useState(STEPS.TYPE);
  const [loading, setLoading]         = useState(false);
  const [fetching, setFetching]       = useState(true);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation]       = useState("");
  const [address, setAddress]         = useState("");
  const [bedrooms, setBedrooms]       = useState(1);
  const [bathrooms, setBathrooms]     = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea]               = useState("");
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage]             = useState<null | File>(null);
  const [preview, setPreview]         = useState<null | string>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice]             = useState("");

  // Pre-fill from existing data
  useEffect(() => {
    axios.get(`/api/properties/${id}`)
      .then(({ data }) => {
        const p = data.property;
        setPropertyType(p.propertyType ?? "");
        setLocation(p.location ?? "");
        setAddress(p.address ?? "");
        setBedrooms(p.bedrooms ?? 1);
        setBathrooms(p.bathrooms ?? 1);
        setParkingSpaces(p.parkingSpace ?? 0);
        setArea(p.area?.toString() ?? "");
        setTitle(p.title ?? "");
        setDescription(p.description ?? "");
        setListingType(p.listingType === "rent" ? "rent" : "sale");
        setPrice(p.price?.toString() ?? "");
        setPreview(p.image ?? null);
      })
      .catch(() => toast.error("Failed to load property"))
      .finally(() => setFetching(false));
  }, [id]);

  const STEP_TITLES = [
    "Select Property Type",
    "Where is it located?",
    "Basic details",
    "Title & description",
    "Update image",
    "Pricing",
  ];

  async function handleUpdate() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("bedrooms", bedrooms.toString());
      formData.append("bathrooms", bathrooms.toString());
      formData.append("parkingSpaces", parkingSpaces.toString());
      formData.append("area", area);
      formData.append("listingType", listingType);
      formData.append("price", price);
      formData.append("propertyType", propertyType);
      if (image) formData.append("image", image);

      await axios.patch(`/api/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Property updated successfully");
      router.push("/properties");
      router.refresh();
    } catch {
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <FrontendLayout>
        <Navbar variant="solid" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text md:text-3xl">Edit Property</h1>
          <p className="mt-1 text-sm text-text/50">Update your listing details</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {Object.values(STEPS).map((s) => (
              <span key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-primary" : step > s ? "w-4 bg-primary/40" : "w-4 bg-gray-200"}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-text/50">
            Step {step + 1} of 6 — {STEP_TITLES[step]}
          </span>
        </div>

        <div className="min-h-72 rounded-2xl border border-dashed border-gray-200 p-6">
          {step === STEPS.TYPE && (
            <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar">
              {propertyTypes.map((item, i) => (
                <PropertyTypeCard key={i} label={item.label} icon={item.icon} selected={propertyType === item.slug} onClick={() => setPropertyType(item.slug)} />
              ))}
            </div>
          )}
          {step === STEPS.LOCATION && (
            <div className="space-y-5">
              <Input name="location" label="City / Neighborhood" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
              <Input name="address" label="Street Address" value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
            </div>
          )}
          {step === STEPS.DETAILS && (
            <div className="divide-y divide-gray-100">
              <Counter title="Bedrooms" subTitle="How many bedrooms?" value={bedrooms} onChange={setBedrooms} />
              <Counter title="Bathrooms" subTitle="How many bathrooms?" value={bathrooms} onChange={setBathrooms} />
              <Counter title="Parking spaces" subTitle="Available parking?" value={parkingSpaces} onChange={setParkingSpaces} min={0} />
              <div className="pt-5">
                <Input name="area" label="Area (sq ft)" type="number" value={area} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArea(e.target.value)} />
              </div>
            </div>
          )}
          {step === STEPS.FEATURE && (
            <div className="space-y-5">
              <Input name="title" label="Property Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
              <Input as="textarea" name="description" label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
            </div>
          )}
          {step === STEPS.IMAGE && (
            <ImageUplode
              preview={preview}
              onChange={(file) => { setImage(file); setPreview(URL.createObjectURL(file)); }}
            />
          )}
          {step === STEPS.PRICING && (
            <div className="space-y-5">
              <select value={listingType} onChange={(e) => setListingType(e.target.value as "sale" | "rent")} className="h-13 w-full rounded-2xl border border-black/10 px-4 text-sm text-text outline-none focus:border-primary/40">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <Input name="price" label={listingType === "sale" ? "Sale Price ($)" : "Monthly Rent ($)"} type="number" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          {step > STEPS.TYPE && <Button fullWidth variant="outline" onClick={() => setStep(p => p - 1)}>Back</Button>}
          <Button
            fullWidth
            loading={loading}
            onClick={() => step < STEPS.PRICING ? setStep(p => p + 1) : handleUpdate()}
          >
            {step === STEPS.PRICING ? "Save Changes" : "Next"}
          </Button>
        </div>
      </div>
    </FrontendLayout>
  );
}
