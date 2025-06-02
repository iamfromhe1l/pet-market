import { Test, TestingModule } from "@nestjs/testing";
import { PublicService } from "./public.service";
import { getModelToken } from "nestjs-typegoose";

describe("PublicService", () => {
    let service: PublicService;
    let petsModel: any;
    let kennelsModel: any;
    let usersModel: any;

    beforeEach(async () => {
        petsModel = {
            countDocuments: jest.fn().mockResolvedValue(0),
            find: jest.fn().mockReturnValue({
                sort: () => ({ limit: () => ({ exec: jest.fn() }) }),
            }),
            aggregate: jest.fn().mockResolvedValue([]),
        };
        kennelsModel = { countDocuments: jest.fn().mockResolvedValue(0) };
        usersModel = { countDocuments: jest.fn().mockResolvedValue(0) };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PublicService,
                { provide: getModelToken("PetsSchema"), useValue: petsModel },
                {
                    provide: getModelToken("KennelsSchema"),
                    useValue: kennelsModel,
                },
                { provide: getModelToken("UsersSchema"), useValue: usersModel },
            ],
        }).compile();

        service = module.get<PublicService>(PublicService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should get platform stats", async () => {
        const stats = await service.getPlatformStats();
        expect(stats).toEqual({
            totalPets: 0,
            totalKennels: 0,
            totalUsers: 0,
        });
    });

    it("should get random pets", async () => {
        const result = await service.getRandomPets(5);
        expect(Array.isArray(result)).toBe(true);
    });
});
