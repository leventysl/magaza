import { medusaIntegrationTestRunner } from "@medusajs/test-utils";

jest.setTimeout(60 * 1000);

medusaIntegrationTestRunner({
  testSuite: ({ api }) => {
    describe("store API", () => {
      it("reports healthy", async () => {
        const response = await api.get("/health");
        expect(response.status).toEqual(200);
      });

      it("rejects store requests without a publishable key", async () => {
        const response = await api.get("/store/products").catch((error) => error.response);
        expect(response.status).toEqual(400);
      });
    });
  },
});
