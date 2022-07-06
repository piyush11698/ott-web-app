export interface Movies {
    id: number;
    title: string;
    description: string;
    rating: number;
    language: string;
    genre: string;
    image: string;
    isWatched: boolean;
    isFav: boolean;
    reviews: Array<string>;
}