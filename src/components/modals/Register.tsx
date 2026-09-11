"use client"

import { useAuthModal } from "@/store/useAuthModelStore";
import Modal from "./modals";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { email } from "better-auth";

interface RegisterValues {
    name: string
    email: string
    password: string
    confirmPassword: string
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

const initialValues: RegisterValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export default function Register() {
    const { openLogin, isRegisterOpen, closeRegister } = useAuthModal();
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState<RegisterErrors>({})
    const [loading, setLoading] = useState(false)
   
    const router = useRouter()
     
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setValues((currentValues) => ({ ...currentValues, [name]: value }))
        setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    }

    function validate() {
        const nextErrors: RegisterErrors = {}

        if (!values.name.trim()) nextErrors.name = "Name is required"
        if (!values.email.trim()) {
            nextErrors.email = "Email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            nextErrors.email = "Enter a valid email address"
        }
        if (values.password.length < 6) nextErrors.password = "Use at least 6 characters"
        if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match"

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }
    
    const onSumit = async  (e : React.SubmitEvent) => {
       e.preventDefault() ; 
       if(!validate()) return;

       try {
        setLoading(true) 

        const {error } = await signUp.email({
            name : values.name , 
            email : values.email , 
            password : values.password
        })
        
        if (error) {    
            toast.error(error.message as string)
            return
        }
        toast.success(" Registration completed successfully")
        router.refresh() 
        setValues({name : "" , email : "" , password : "" , confirmPassword : ""})
        closeRegister()
       } catch (error) { 
          toast.error(error instanceof Error ? error.message : "Somethig want wrong please try again")
       } finally {
            setLoading(false)
       }
    }

    return (
        <Modal onClose={closeRegister} title="Create account" isOpen={isRegisterOpen}>
            <div className="mb-7 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get started</p>
                <h2 className="text-3xl font-semibold tracking-tight text-text">Create your NextEstate account</h2>
                <p className="text-sm leading-6 text-text/55">Save properties and make your next move easier.</p>
            </div>

            <form  onSubmit={onSumit} className="space-y-4">
                <Input
                    id="register-name"
                    name="name"
                    label="Full name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                />
                <Input
                    id="register-email"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                />
                <Input
                    id="register-password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                />
                <Input
                    id="register-confirm-password"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                />
                <Button fullWidth type="submit" loading={loading}>Create account</Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                <span className="h-px flex-1 bg-gray-200" />
                <span>Or continue with</span>
                <span className="h-px flex-1 bg-gray-200" />
            </div>

            <Button type="button" fullWidth variant="outline" icon={<FcGoogle size={22} />}>
                Continue with Google
            </Button>
            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button type="button" onClick={openLogin} className="cursor-pointer font-semibold text-primary transition hover:text-primary/70">
                    Sign in
                </button>
            </p>
        </Modal>
    )
}