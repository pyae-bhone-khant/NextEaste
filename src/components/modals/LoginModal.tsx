"use client"

import { useAuthModal } from "@/store/useAuthModelStore";
import Modal from "./modals";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

export default function LoginModel() {
    const { isLoginOpen, closeLogin, openRegister } = useAuthModal();
    const [value, setValue] = useState<LoginValues>({
        email: "",
        password: ""
    })
    const loading = false
    const [errors, setErrors] = useState<LoginErrors>({})

    interface LoginValues {
        email: string,
        password: string
    }

    type LoginErrors = Partial<Record<keyof LoginValues, string>>

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setValue((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: undefined
        }))
    }

    const validate = () => {
        const newErrors: LoginErrors = {};

        // validate the email 
        if (!value.email.trim()) {
            newErrors.email = "Email is required!"
        } else if (!/^\S+@\S+\.\S+$/.test(value.email)) {
            newErrors.email = "Enter a valid email address!"
        }
        //   validate the password field 
        if (!value.password.trim()) {
            newErrors.password = "Password is required!"
        } else if (value.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters!"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;

    }
    return (
        <Modal onClose={closeLogin} title="Account access" isOpen={isLoginOpen}>
            <div className="mb-7 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Welcome back</p>
                <h2 className="text-3xl font-semibold tracking-tight text-text">Sign in to NextEstate</h2>
                <p className="text-sm leading-6 text-text/55">Continue your property search and saved listings.</p>
            </div>
            <form className="space-y-5" onSubmit={(event) => {
                event.preventDefault()
                validate()
            }}>
                <Input
                    id="login-email"
                    name="email"
                    label="Email"
                    value={value.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={loading}
                />
                  <Input
                    id="login-password"
                    name="password"
                    label="Password"
                    type="password"
                    value={value.password}
                    onChange={handleChange}
                    error={errors.password}
                    disabled={loading}
                /> 
                <div className="-mt-1 flex justify-end">
                    <button type="button" className="cursor-pointer text-xs font-medium text-primary transition hover:text-primary/70">
                        Forgot password?
                    </button>
                </div>
                <Button fullWidth type="submit" loading={loading}>
                    Sign in
                </Button>
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
                                New to NextEstate?{" "}
                                <button type="button" onClick={openRegister} className="cursor-pointer font-semibold text-primary transition hover:text-primary/70">
                                        Create an account
                                </button>
                        </p>
        </Modal>
    )
}