import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { BadRequestException } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup.auth.dto";
import { SigninAuthDto } from "./dto/signin.auth.dto";
import { UserRole } from "../common/types/roles.enum";
import * as bcrypt from "bcryptjs";

const mockUser = {
    email: "test@mail.com",
    username: "testuser",
    _id: "507f1f77bcf86cd799439011",
    role: UserRole.USER,
    hash: "hashedpassword",
    kennelId: null,
};

describe("AuthService", () => {
    let service: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        getUserWithHash: jest.fn(),
                        createUser: jest.fn(),
                        getUserId: jest.fn(),
                        updateRtHash: jest.fn(),
                        getUserById: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn().mockResolvedValue("token"),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue("secret"),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("signup", () => {
        it("should register a new user", async () => {
            (usersService.getUserWithHash as jest.Mock).mockResolvedValue(null);
            (usersService.createUser as jest.Mock).mockResolvedValue(mockUser);
            (usersService.getUserId as jest.Mock).mockResolvedValue(
                mockUser._id,
            );
            jest.spyOn(service, "simpleHash").mockResolvedValue("hashed");
            jest.spyOn(service, "getTokens").mockResolvedValue({
                access_token: "at",
                refresh_token: "rt",
            });
            const dto: SignupAuthDto = {
                email: mockUser.email,
                password: "123456",
                username: mockUser.username,
            };
            const result = await service.signup(dto);
            expect(result.user.email).toBe(dto.email);
            expect(result.jwt).toHaveProperty("access_token");
        });

        it("should throw if user already exists", async () => {
            (usersService.getUserWithHash as jest.Mock).mockResolvedValue(
                mockUser,
            );
            const dto: SignupAuthDto = {
                email: mockUser.email,
                password: "123456",
                username: mockUser.username,
            };
            await expect(service.signup(dto)).rejects.toThrow(
                BadRequestException,
            );
        });
    });

    describe("signin", () => {
        it("should sign in user with correct credentials", async () => {
            (usersService.getUserWithHash as jest.Mock).mockResolvedValue({
                ...mockUser,
                hash: "$2a$10$hash",
            });
            (usersService.getUserId as jest.Mock).mockResolvedValue(
                mockUser._id,
            );
            jest.spyOn(service, "getTokens").mockResolvedValue({
                access_token: "at",
                refresh_token: "rt",
            });
            jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);
            const dto: SigninAuthDto = {
                email: mockUser.email,
                password: "123456",
            };
            const result = await service.signin(dto);
            expect(result.jwt).toHaveProperty("access_token");
        });
    });
});
