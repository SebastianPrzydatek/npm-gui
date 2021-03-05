/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect } from 'chai';
import {
  add,
  getFull, getSimple, prepareTestProject, TEST_PKG2, TEST_PKG2_INSTALLED,
} from './tests-utils';

describe('add dependency', () => {
  it('invalid name', async () => {
    await prepareTestProject();

    const response = await add('prod', [{ name: 'sdmvladbf3', version: 'v1.0.0' }]);
    expect(response.status).to.equal(400);

    expect((await getSimple()).body).deep.equal([]);
    expect((await getFull()).body).deep.equal([]);
  });

  it('invalid version', async () => {
    await prepareTestProject();

    const response = await add('prod', [{ name: 'npm-gui-tests', version: 'v3.0.0' }]);
    expect(response.status).to.equal(400);

    expect((await getSimple()).body).deep.equal([]);
    expect((await getFull()).body).deep.equal([]);
  });

  it('correct dependency', async () => {
    await prepareTestProject();

    const response = await add('prod', [{ name: 'npm-gui-tests', version: '^1.0.0' }]);
    expect(response.status).to.equal(200);

    expect((await getSimple()).body).deep.equal([TEST_PKG2]);
    expect((await getFull()).body).deep.equal([TEST_PKG2_INSTALLED]);
  });
});
