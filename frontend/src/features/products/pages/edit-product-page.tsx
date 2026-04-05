interface Props {
    uid: string;
}
export const EditProductPage = ({ uid }: Props) => {
    return (
        <div className="inline cursor-pointer rounded-md p-4 font-mono font-bold underline underline-offset-4 shadow-lg transition duration-500 text-shadow-lg hover:shadow-2xl hover:shadow-amber-400">
            Edit Product Page: <span className="text-blue-700 transition duration-500 hover:text-blue-900">{uid}</span>
        </div>
    );
};
