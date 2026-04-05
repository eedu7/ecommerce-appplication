export type Category = {
    uid: string;
    name: string;
    description: string | null;
    parent_id: string | null;
    children: Category[];
};
