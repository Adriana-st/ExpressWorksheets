import { createCarZSchema, carParamsSchema } from "../../src/models/cars";

const validCar = {
    "make": "Toyota",
    "model": "Corolla",
    "year": 2000
}

describe('Test Car Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createCarZSchema.parse(
            { body: validCar })).not.toThrow();
    });

    it('should pass for the following valid data - no date', () => {

        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": undefined } })).not.toThrow();
    });

        it('should fail for the too early year ', () => {

        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": 1949 } })).toThrow();
    });

    it('should fail for the unparsaable year ', () => {

        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": 'wrong year' } })).toThrow();
    });

    it('should fail for the missing make ', () => {

        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "make": undefined } })).toThrow();
    });

    it('should fail for the the empty model ', () => {

        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "model": '' } })).toThrow();
    });

    it('should fail when the car is not inside body', () => {

        expect(() => createCarZSchema.parse(validCar)).toThrow();
    });

});

describe('Test Car Params Validation', () => {
    it('should pass for a valid ObjectId', () => {

        expect(() => carParamsSchema.parse(
            { params: { id: '609c15272a2e382d6c382100' } })).not.toThrow();
    });

    it('should fail for an id that is too short', () => {

        expect(() => carParamsSchema.parse(
            { params: { id: 'abc' } })).toThrow();
    });

    it('should fail for an id with non-hex characters', () => {
        
        expect(() => carParamsSchema.parse(
            { params: { id: 'zzzc15272a2e382d6c382100' } })).toThrow();
    });
});
