import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "nestjs-typegoose";
import { PetsService } from "./pets.service";
import { Types } from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { CategoriesService } from "../categories/services/categories.service";
import { SexEnum } from "../common/types/sex.enum";

describe("PetsService", () => {
    let service: PetsService;
    let petsModel: any;
    let categoriesService: any;

    const mockPet = {
        _id: new Types.ObjectId(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        petsModel = {
            create: jest.fn(),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
            findByIdAndDelete: jest.fn().mockReturnThis(),
            updateMany: jest.fn(),
            countDocuments: jest.fn(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn(),
        };

        categoriesService = {
            checkCategory: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PetsService,
                {
                    provide: getModelToken("PetsSchema"),
                    useValue: petsModel,
                },
                {
                    provide: CategoriesService,
                    useValue: categoriesService,
                },
            ],
        }).compile();

        service = module.get<PetsService>(PetsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create pet", async () => {
        const kennelId = new Types.ObjectId();
        const dto = {
            title: "Test Pet",
            categoryId: new Types.ObjectId(),
            birthDate: new Date().toISOString(),
            breed: "Test Breed",
            sex: SexEnum.MALE,
            description: "Test Description",
        };

        categoriesService.checkCategory.mockResolvedValue(true);
        petsModel.create.mockResolvedValue(mockPet);

        const result = await service.createPet(kennelId, dto);
        expect(result).toBeDefined();
        expect(petsModel.create).toHaveBeenCalled();
    });

    it("should throw NotFoundException if pet not found", async () => {
        petsModel.findById.mockReturnValue(null);
        await expect(service.getPetById(new Types.ObjectId())).rejects.toThrow(
            NotFoundException,
        );
    });

    it("should delete pet", async () => {
        petsModel.findByIdAndDelete.mockReturnValue({
            exec: jest.fn().mockResolvedValue(true),
        });
        await expect(
            service.deletePet(new Types.ObjectId()),
        ).resolves.not.toThrow();
    });
});
