import { AuthCard } from "@/features/auth/components/auth-card"
import { RegisterForm } from "@/features/auth/components/register-form"

export const RegisterPage = () => {
    return (
        <AuthCard title="Register" description="Register page">
            <RegisterForm />
        </AuthCard>
    )
}
