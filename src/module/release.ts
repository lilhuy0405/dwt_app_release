import { Elysia, t } from "elysia";

const release = (app: any) => {
    return app.group("/release", (app: typeof Elysia) => {
        app.post("/", async ({ body }) => {

            const text = JSON.stringify(body, null, 4);
            await Bun.write("src/release.json", text);
            return body;

        }, {
            body: t.Object({
                url: t.String(),
                version: t.String()
            }),
            detail: {
                tags: ["Release"]
            }
        });


        app.get("/", async ({ body }) => {
            const file = Bun.file("src/release.json");
            const text = await file.text();
            const json = JSON.parse(text);
            return json;

        }, {
            detail: {
                tags: ["Release"]
            }
        });

        return app;
    })
}

export default release;

