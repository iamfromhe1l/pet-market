import { Test, TestingModule } from "@nestjs/testing";
import { KennelsService } from "./kennels.service";

describe("KennelsService", () => {
    let service: KennelsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KennelsService],
        }).compile();

        service = module.get<KennelsService>(KennelsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
