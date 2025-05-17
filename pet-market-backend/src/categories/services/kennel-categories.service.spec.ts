import { Test, TestingModule } from "@nestjs/testing";
import { KennelCategoriesService } from "./kennel-categories.service";

describe("KennelCategoriesService", () => {
    let service: KennelCategoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KennelCategoriesService],
        }).compile();

        service = module.get<KennelCategoriesService>(KennelCategoriesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
