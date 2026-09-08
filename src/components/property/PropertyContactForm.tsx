"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import Input from "@/components/ui/Input"

interface ContactValues {
    name: string
    email: string
    phone: string
    message: string
}

const initialValues: ContactValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
}

export default function PropertyContactForm() {
    const [values, setValues] = useState(initialValues)

    function updateField(field: keyof ContactValues, value: string) {
        setValues((currentValues) => ({ ...currentValues, [field]: value }))
    }

    function handleChange(field: keyof ContactValues) {
        return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            updateField(field, event.target.value)
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Input
                label="Your Name"
                name="name"
                value={values.name}
                onChange={handleChange("name")}
                required
            />
            <Input
                label="Your Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                required
            />
            <Input
                label="Your Phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange("phone")}
            />
            <Input
                as="textarea"
                label="Your Message"
                name="message"
                value={values.message}
                onChange={handleChange("message")}
                required
            />
            <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500">
                Send Email <span className="ml-2" aria-hidden="true">-&gt;</span>
            </button>
        </form>
    )
}
