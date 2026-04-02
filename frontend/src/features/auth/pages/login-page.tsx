import { AuthCard } from "@/features/auth/components/auth-card"
import { LoginForm } from "@/features/auth/components/login-form"

export const LoginPage = () => {
    return (
        <AuthCard title="Login" description="Login page">
            <LoginForm />
        </AuthCard>
    )
}
