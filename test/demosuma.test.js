const { describe, it, expect } = require("@jest/globals");
const suma = require("../lib/demotest");

describe("Test de suma", () => {
	it("Test de la suma", () => {
		expect(suma(1, 1)).toBe(2);
	});

	it("Test de la suma", () => {
		expect(suma(1, 2)).toBe(3);
	});

	it("Throw an error if Frist parameter must be a number", () => {
		expect(() => suma("a", 1)).toThrow();
	});
	it("Throw an error if Frist parameter must be a number", () => {
		expect(() => suma(1, null)).toThrow();
	}); 
});  
