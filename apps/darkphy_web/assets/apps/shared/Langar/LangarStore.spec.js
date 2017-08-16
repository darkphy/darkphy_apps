import LangarStore from './LangarStore.js';
import { getKeyFromError } from '../utils/constants.js';

describe('LangarStore', () => {
  const err = LangarStore.getE(0);

  test('Words exists', () => {
    expect(LangarStore.getW("bday")).toEqual(expect.anything());
  });
  test('Words Undefined property', () => {
    expect(LangarStore.getW("somebullshit")).toBe(undefined);
  });
  test('Error Title exists', () => {
    expect(err.title).toEqual(expect.anything());
  });
  test('Error Description exists', () => {
    expect(err.description).toEqual(expect.anything());
  });
  test('Undefined Error Object Property', () => {
    expect(err.bullshit).toBe(undefined);
  });
  test('Undefined Error Code', () => {
    const er_obj = LangarStore.getE(-1);
    expect(er_obj).toBe(undefined);
  });
  test('fn [getKeyFromError] valid', () => {
    const key = getKeyFromError("This is aN Error");
    expect(key).toBe("this_is_an_error");
  });


});
