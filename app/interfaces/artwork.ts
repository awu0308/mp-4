
export type ArtworkSummary = {
    id: number;
    title: string;
    primaryimageurl: string | null;
    dated: string | null;
    culture: string | null;
    medium: string | null;
    people: Array<{ name: string; role: string }> | null;
};

export type ArtworkDetail = {
    id: number;
    title: string;
    primaryimageurl: string | null;
    dated: string | null;
    culture: string | null;
    medium: string | null;
    people: Array<{ name: string; role: string }> | null;
    technique: string | null;
    dimensions: string | null;
    creditline: string | null;
    url: string | null;
    classification: string | null;
    department: string | null;
    description: string | null;
};
