import { GetNumberWithCommaPipe } from './get-number-with-comma.pipe';

describe('GetNumberWithCommaPipe', () => {
  it('create an instance', () => {
    const pipe = new GetNumberWithCommaPipe();
    expect(pipe).toBeTruthy();
  });
});
