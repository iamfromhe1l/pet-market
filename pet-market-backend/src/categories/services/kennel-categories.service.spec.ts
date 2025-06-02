import { Test, TestingModule } from "@nestjs/testing";
import { KennelCategoriesService } from "./kennel-categories.service";
import { getModelToken } from "nestjs-typegoose";
import { Types } from "mongoose";
import { CategoriesService } from "./categories.service";
import { PetsService } from "../../pets/pets.service";

const mockCategory = { _id: new Types.ObjectId() };
const mockKennelId = new Types.ObjectId();

describe("KennelCategoriesService", () => {
    let service: KennelCategoriesService;
    let kennelCategoriesSchema: any;
    let categoriesService: any;
    let petsService: any;

    beforeEach(async () => {
        kennelCategoriesSchema = {
            save: jest.fn(),
            findOneAndUpdate: jest.fn(),
        };
        categoriesService = {
            getSystemCategories: jest.fn(),
            isSystemCategory: jest.fn(),
            createCustomCategory: jest.fn(),
            enableCategory: jest.fn(),
            disableCategory: jest.fn(),
        };
        petsService = {
            enablePets: jest.fn(),
            disablePets: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                KennelCategoriesService,
                {
                    provide: getModelToken("KennelCategoriesSchema"),
                    useValue: kennelCategoriesSchema,
                },
                { provide: CategoriesService, useValue: categoriesService },
                { provide: PetsService, useValue: petsService },
            ],
        })
            .overrideProvider(getModelToken("KennelCategoriesSchema"))
            .useValue(kennelCategoriesSchema)
            .overrideProvider(CategoriesService)
            .useValue(categoriesService)
            .overrideProvider(PetsService)
            .useValue(petsService)
            .compile();
        service = module.get<KennelCategoriesService>(KennelCategoriesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should call restoreCategory (enable category)", async () => {
        categoriesService.isSystemCategory.mockResolvedValue(true);
        kennelCategoriesSchema.findOneAndUpdate.mockResolvedValue({});
        await expect(
            service.restoreCategory(mockCategory._id, mockKennelId),
        ).resolves.not.toThrow();
        expect(categoriesService.isSystemCategory).toHaveBeenCalledWith(
            mockCategory._id,
        );
        expect(kennelCategoriesSchema.findOneAndUpdate).toHaveBeenCalled();
    });

    it("should call removeCategory (disable category)", async () => {
        categoriesService.isSystemCategory.mockResolvedValue(true);
        kennelCategoriesSchema.findOneAndUpdate.mockResolvedValue({});
        petsService.disablePets.mockResolvedValue({});
        await expect(
            service.removeCategory(mockCategory._id, mockKennelId),
        ).resolves.not.toThrow();
        expect(categoriesService.isSystemCategory).toHaveBeenCalledWith(
            mockCategory._id,
        );
        expect(kennelCategoriesSchema.findOneAndUpdate).toHaveBeenCalled();
        expect(petsService.disablePets).toHaveBeenCalledWith(mockCategory._id);
    });
});
