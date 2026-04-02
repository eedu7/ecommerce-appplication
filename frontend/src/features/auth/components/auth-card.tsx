import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
    title: string;
    description: string;
    children: ReactNode;
}
export const AuthCard = ({ title, description, children }: AuthCardProps) => {
    return (
        <Card className="w-md max-w-lg ring-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
};
