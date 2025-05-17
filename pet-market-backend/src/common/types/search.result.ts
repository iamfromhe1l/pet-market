import { PetsSchema } from "src/pets/pets.schema";

export type SearchResults = {
    items: PetsSchema[];
    total: number;
    page: number;
    limit: number;
};
