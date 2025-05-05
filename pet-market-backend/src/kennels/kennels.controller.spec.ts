import { Test, TestingModule } from "@nestjs/testing";
import { KennelsController } from "./kennels.controller";

describe("KennelsController", () => {
    let controller: KennelsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [KennelsController],
        }).compile();

        controller = module.get<KennelsController>(KennelsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
