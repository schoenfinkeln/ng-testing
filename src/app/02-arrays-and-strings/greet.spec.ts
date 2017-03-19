import { greet } from './greet';

describe('greet', () => {
  it('should include input in output string', () => {
    let myName = 'MyName';
    expect(greet(myName)).toContain(myName);
  });
})