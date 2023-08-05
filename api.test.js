const request = require("supertest");
const app = require("./app");
const connectDb = require("./utils/DB");

describe("Todo API", () => {
  let createdTodoId;
  let dbConnection;

  beforeAll(async () => {
    // Connect to the test database
    dbConnection = await connectDb(false); // Pass `false` to use the test database
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await dbConnection.close();
  });

  it("should create a new todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ text: "Test Todo" });

    expect(response.statusCode).toBe(201);
    expect(response.body.text).toBe("Test Todo");

    createdTodoId = response.body._id;
  });

  it("should list all todos", async () => {
    const response = await request(app).get("/api/todos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should update a todo", async () => {
    const response = await request(app)
      .patch(`/api/todos/${createdTodoId}`)
      .send({ text: "Updated Todo" });

    expect(response.statusCode).toBe(200);
    expect(response.body.text).toBe("Updated Todo");
  });

  it("should delete a todo", async () => {
    const response = await request(app).delete(`/api/todos/${createdTodoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(createdTodoId);
  });
});
