import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    trucks: Model,
    users: Model,
  },

  seeds(server) {
    server.create("user", {
      id: "123",
      email: "steve@gfox.com",
      password: "p123",
      name: "Steve",
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;

    this.passthrough("https://firestore.googleapis.com/**");

    this.get("/trucks", (schema, request) => {
      return schema.trucks.all();
    });

    this.get("/trucks/:id", (schema, request) => {
      const id = request.params.id;
      return schema.trucks.find(id);
    });

    this.get("/host/trucks", (schema, request) => {
      // Hard-code the hostId for now
      return schema.trucks.where({ hostId: "123" });
    });

    this.get("/host/trucks/:id", (schema, request) => {
      // Hard-code the hostId for now
      const id = request.params.id;
      return schema.trucks.findBy({ id, hostId: "123" });
    });

    this.post("/login", (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      // ⚠️ This is an extremely naive version of authentication. Please don't
      // do this in the real world, and never save raw text passwords
      // in your database 😅
      const foundUser = schema.users.findBy({ email, password });
      if (!foundUser) {
        return new Response(
          401,
          {},
          { message: "No user with those credentials found!" }
        );
      }

      // At the very least, don't send the password back to the client 😅
      foundUser.password = undefined;
      return {
        user: foundUser,
        token: "Enjoy your pizza, here's your tokens.",
      };
    });
  },
});
