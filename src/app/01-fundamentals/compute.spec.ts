import { compute } from './compute';

describe('compute', () => {
    it('should return 0 if input is negative', () => {
        expect(compute(-1)).toBe(0);
    });

    it('should return incremented input if input is positive', () => {
        expect(compute(3)).toBe(4);
    })

});