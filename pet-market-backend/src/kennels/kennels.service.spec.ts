import { Test, TestingModule } from "@nestjs/testing";
import { KennelsService } from "./kennels.service";
import { getModelToken } from "nestjs-typegoose";
import { UserRole } from "../common/types/roles.enum";
import { BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";
import { UsersService } from "../users/users.service";
import { KennelCategoriesService } from "../categories/services/kennel-categories.service";

const mockUser = {
    _id: new Types.ObjectId(),
    kennelId: null,
    role: UserRole.USER,
};
const mockKennel = {
    _id: new Types.ObjectId(),
    save: jest.fn().mockResolvedValue({ _id: new Types.ObjectId() }),
};

describe("KennelsService", () => {
    let service: KennelsService;
    let kennelsSchema: any;
    let usersService: any;
    let kennelCategoriesService: any;

    beforeEach(async () => {
        kennelsSchema = function (this: any) {
            this.save = jest
                .fn()
                .mockResolvedValue({ _id: new Types.ObjectId() });
        };
        kennelsSchema.findByIdAndDelete = jest.fn();
        kennelsSchema.findById = jest.fn();
        usersService = {
            getUserById: jest.fn(),
            setKennelId: jest.fn(),
            setUserRole: jest.fn(),
            deleteKennelFromUsers: jest.fn(),
        };
        kennelCategoriesService = {
            initKennelCategories: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                KennelsService,
                {
                    provide: getModelToken("KennelsSchema"),
                    useValue: kennelsSchema,
                },
                { provide: UsersService, useValue: usersService },
                {
                    provide: KennelCategoriesService,
                    useValue: kennelCategoriesService,
                },
            ],
        })
            .overrideProvider(UsersService)
            .useValue(usersService)
            .overrideProvider(KennelCategoriesService)
            .useValue(kennelCategoriesService)
            .overrideProvider(getModelToken("KennelsSchema"))
            .useValue(kennelsSchema)
            .compile();
        service = module.get<KennelsService>(KennelsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create kennel", async () => {
        usersService.getUserById.mockResolvedValue({
            ...mockUser,
            kennelId: null,
        });
        kennelCategoriesService.initKennelCategories.mockResolvedValue(true);
        usersService.setKennelId.mockResolvedValue(true);
        usersService.setUserRole.mockResolvedValue(true);
        const createKennelDto = {
            name: "Test",
            address: "Addr",
            description: "Desc",
        };
        const result = await service.createKennel(
            createKennelDto,
            mockUser._id,
        );
        expect(result).toBeDefined();
    });

    it("should throw if user already in kennel", async () => {
        usersService.getUserById.mockResolvedValue({
            ...mockUser,
            kennelId: new Types.ObjectId(),
        });
        const createKennelDto = {
            name: "Test",
            address: "Addr",
            description: "Desc",
        };
        await expect(
            service.createKennel(createKennelDto, mockUser._id),
        ).rejects.toThrow(BadRequestException);
    });

    it("should delete kennel", async () => {
        usersService.deleteKennelFromUsers.mockResolvedValue(true);
        kennelsSchema.findByIdAndDelete.mockResolvedValue(true);
        await expect(
            service.deleteKennel(mockKennel._id),
        ).resolves.not.toThrow();
    });
});
