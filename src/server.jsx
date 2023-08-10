import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    trucks: Model,
    users: Model,
  },

  seeds(server) {
    server.create("truck", {
      id: "1",
      name: "Car Hauler",
      price: 1000,
      description:
        "A specialized trailer designed to transport multiple vehicles, typically automobiles, from one location to another. These trailers are essential in the automotive industry, facilitating the efficient and safe transportation of cars for various purposes.",
      imageUrl: "/src/assets/CarHauler.jpg",
      type: "Trailer",
      load: 1900,
      hostId: "123",
    });

    server.create("truck", {
      id: "2",
      name: "Concrete Mixer",
      price: 1200,
      description:
        "A versatile and essential construction equipment designed to efficiently blend cement, sand, gravel, and water to create concrete. It plays a crucial role in various construction projects, from small-scale residential endeavors to large infrastructure developments.",
      imageUrl: "/src/assets/ConcreteMIxer.jpeg",
      type: "Truck",
      load: 1500,
      hostId: "234",
    });

    server.create("truck", {
      id: "3",
      name: "Dumper",
      price: 1000,
      description:
        "A rugged and efficient piece of equipment designed for heavy hauling and convenient unloading of various materials, such as sand, gravel, construction debris, and agricultural produce. With its versatile design and hydraulic system, the dump trailer streamlines the transport and distribution of materials in a wide range of industries.",
      imageUrl: "/src/assets/DumpTrack.jpg",
      type: "Trailer",
      load: 1700,
      hostId: "123",
    });

    server.create("truck", {
      id: "4",
      name: "Flatbed",
      price: 1500,
      description:
        "A type of commercial vehicle with an open, flat platform on its back, free from sides or a roof. This design allows for the easy loading, transportation, and unloading of various goods, making flatbed trucks a versatile and essential component of the transportation industry.",
      imageUrl: "/src/assets/Flatbed.jpg",
      type: "Trailer",
      load: 2200,
      hostId: "234",
    });

    server.create("truck", {
      id: "5",
      name: "Hydrovac",
      price: 1200,
      description:
        "A specialized vehicle used for non-destructive excavation and soil removal. It employs a combination of high-pressure water and powerful vacuum capabilities to precisely excavate and expose underground utilities, pipelines, and other sensitive infrastructure.",
      imageUrl: "/src/assets/Hydrovac.jpg",
      type: "Truck",
      load: 2400,
      hostId: "456",
    });

    server.create("truck", {
      id: "6",
      name: "Refeer",
      price: 1700,
      description:
        "An essential asset in the transportation and logistics industry, specially equipped to maintain the optimal temperature conditions required for transporting perishable goods. This refrigerated truck is the ideal solution for preserving the freshness and quality of temperature-sensitive cargo during transit.",
      imageUrl: "/src/assets/Reffer.jpg",
      type: "Trailer",
      load: 1900,
      hostId: "456",
    });

    server.create("truck", {
      id: "7",
      name: "Retriever",
      price: 1300,
      description:
        "The Versatran Retriever is a heavy equipment transport truck, boasting an innovative patented deck design that provides a loading angle of 10 to 14 degrees. The loading ramp extension and vertical deck movement are powered by the truck's air system, allowing for loading and unloading without the need to keep the truck engine running. These heavy haulers are ideal for efficiently transporting a wide range of equipment, including farm equipment, tractors, backhoes, fork lifts, scissor lifts, excavators, skid loaders, and even small bulldozers.",
      imageUrl: "/src/assets/RetrievetTruck.jpg",
      type: "Trailer",
      load: 2000,
      hostId: "789",
    });

    server.create("truck", {
      id: "8",
      name: "Sleeper",
      price: 1000,
      description:
        "The sleeper truck is designed for the rigors of hard work. When embarking on long journeys, spending weeks on the road demands a space for relaxation and rejuvenation, which is not a luxury but an essential requirement. These trucks are meticulously crafted to ensure compliance with driving and resting time regulations.",
      imageUrl: "/src/assets/SleeperTruck.jpeg",
      type: "Truck",
      load: 2500,
      hostId: "789",
    });

    server.create("truck", {
      id: "9",
      name: "Water",
      price: 1100,
      description:
        "A specialized vehicle designed to transport and distribute large quantities of water to various locations. These versatile trucks play a crucial role in numerous industries and applications, providing essential support for dust suppression, road construction, firefighting, agriculture, and more.",
      imageUrl: "/src/assets/water.jpg",
      type: "Truck",
      load: 1500,
      hostId: "456",
    });

    server.create("truck", {
      id: "10",
      name: "Winch",
      price: 1500,
      description:
        "A specialized heavy-duty vehicle designed for towing and hauling heavy loads that are difficult to move by conventional means. Equipped with a powerful winch system, these trucks provide essential support in various industries, including oil and gas, construction, logging, and recovery operations.",
      imageUrl: "/src/assets/WinchTruck.jpg",
      type: "Trailer",
      load: 2500,
      hostId: "123",
    });

    server.create("user", {
      id: "123",
      email: "b@b.com",
      password: "p123",
      name: "Bob",
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
