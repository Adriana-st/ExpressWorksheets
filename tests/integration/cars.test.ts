import request from "supertest";
import { app } from "../../src/app";

describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);

    });

});

describe('Cars API Integration Tests (/api/v1/cars)', () => {
  let createdCarId: string;

  const testCar = {
    make: "Tesla",
    model: "Model 3",
    year: 2022
  };

  const apiKey = "blahblah"; // Header required for protected routes (PUT, DELETE)

  // 1. GET /api/v1/cars - Public (No API key needed)
  describe('GET /api/v1/cars', () => {
    it('should return 200 and an array of cars without requiring x-api-key', async () => {
      const response = await request(app)
        .get('/api/v1/cars');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // 2. POST /api/v1/cars - Public (No API key needed)
  describe('POST /api/v1/cars', () => {
    it('should create a new car and return 201 without requiring x-api-key', async () => {
      const response = await request(app)
        .post('/api/v1/cars')
        .send(testCar);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.make).toBe(testCar.make);
      expect(response.body.model).toBe(testCar.model);

      // Save ID for GET by ID and DELETE tests
      createdCarId = response.body._id;
    });

    it('should return 400 when required fields fail validation', async () => {
      const invalidCar = { year: 2020 }; // Missing make and model

      const response = await request(app)
        .post('/api/v1/cars')
        .send(invalidCar);

      expect(response.status).toBe(400);
    });
  });

  // 3. GET /api/v1/cars/:id - Public (No API key needed)
  describe('GET /api/v1/cars/:id', () => {
    it('should return 200 and the car object when a valid ID is provided', async () => {
      const response = await request(app)
        .get(`/api/v1/cars/${createdCarId}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(createdCarId);
      expect(response.body.make).toBe(testCar.make);
    });

    it('should return 404 if car ID does not exist', async () => {
      const nonExistentId = "609c15272a2e382d6c382100";

      const response = await request(app)
        .get(`/api/v1/cars/${nonExistentId}`);

      expect(response.status).toBe(404);
    });
  });

  // 4. DELETE /api/v1/cars/:id - Protected (Requires x-api-key)
  describe('DELETE /api/v1/cars/:id', () => {
    it('should return 401 Unauthorized if x-api-key header is missing', async () => {
      const response = await request(app)
        .delete(`/api/v1/cars/${createdCarId}`);

      expect(response.status).toBe(401);
    });

    it('should delete the car and return 200 when valid x-api-key is supplied', async () => {
      const response = await request(app)
        .delete(`/api/v1/cars/${createdCarId}`)
        .set('x-api-key', apiKey);

      expect(response.status).toBe(200);
    });

    it('should return 404 when attempting to GET the deleted car', async () => {
      const response = await request(app)
        .get(`/api/v1/cars/${createdCarId}`);

      expect(response.status).toBe(404);
    });
  });
});
