import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getModelToken } from "nestjs-typegoose";
import { NotFoundException } from "@nestjs/common";
import { UserRole } from "../common/types/roles.enum";

const mockUser = {
    email: "test@mail.com",
    username: "testuser",
    _id: "507f1f77bcf86cd799439011",
    role: UserRole.USER,
    hash: "hashedpassword",
    kennelId: null,
    save: jest.fn(),
};

describe("UsersService", () => {
    let service: UsersService;
    let usersSchema: any;

    beforeEach(async () => {
        // usersSchema теперь jest.fn(), возвращающий объект с save
        usersSchema = jest.fn().mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockUser),
        }));
        usersSchema.findOne = jest.fn();
        usersSchema.findById = jest.fn();
        usersSchema.findByIdAndUpdate = jest.fn();
        usersSchema.updateMany = jest.fn();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken("UsersSchema"),
                    useValue: usersSchema,
                },
            ],
        }).compile();
        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create user", async () => {
        const dto = {
            email: mockUser.email,
            hash: "hash",
            username: mockUser.username,
        };
        const result = await service.createUser(dto);
        expect(result).toBeDefined();
        // Проверяем, что usersSchema был вызван с нужными аргументами
        expect(usersSchema).toHaveBeenCalledWith({
            email: dto.email,
            hash: dto.hash,
            username: dto.username,
        });
    });

    it("should get user by email", async () => {
        usersSchema.findOne.mockReturnValue({
            exec: () => Promise.resolve(mockUser),
        });
        const result = await service.getUser(mockUser.email);
        expect(result.email).toBe(mockUser.email);
    });

    it("should throw if user not found", async () => {
        usersSchema.findOne.mockReturnValue({
            exec: () => Promise.resolve(null),
        });
        await expect(service.getUser("notfound@mail.com")).rejects.toThrow(
            NotFoundException,
        );
    });
});
