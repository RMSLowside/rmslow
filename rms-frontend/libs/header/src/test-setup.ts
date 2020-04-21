import 'jest-preset-angular';
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => {
      return {
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      };
    })
  });
});
