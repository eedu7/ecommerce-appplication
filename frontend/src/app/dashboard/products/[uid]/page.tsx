import { EditProductPage } from "@/features/products/pages/edit-product-page";

interface Props {
    params: Promise<{ uid: string }>;
}

export default async function Page({ params }: Props) {
    const { uid } = await params;

    return <EditProductPage uid={uid} />;
}
