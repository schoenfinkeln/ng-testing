import { getCurrencies } from './getCurrencies';

describe('getCurrencies', () => {
  it('should return valid currencies', () => {
    // Arrange
    let currencies = ['USD', 'AUD', 'EUR'];

    // Act

    // Assert
    currencies.forEach(element => {
      expect(getCurrencies()).toContain(element);
    });
  });
});