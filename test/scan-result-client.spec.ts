import { SRClient } from '../src/index';
import { expect, assert } from 'chai';
import { describe, before } from 'mocha';
import * as sinon from 'sinon';

const serviceName = 'scan_result';
const accountId = '12345';
const userId = '4567';
const queryParams = { foo: 'bar' };

afterEach(() => {
  sinon.restore();
});
describe('Scan Result Client Test Suite:', () => {
  describe('when adding a result', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(SRClient['alClient'], 'post');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call post() on the ALClient instance', async() => {
      const accountId = '1234',
      metadata = {},
      result = {};
      await SRClient.addResult(accountId, metadata, result);
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting a result', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(SRClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      const accountId = '1234',
      environmentId = '7890',
      resultId = '5678';
      await SRClient.getResult(accountId, environmentId, resultId);
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting result metadata', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(SRClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      const accountId = '1234',
      environmentId = '7890',
      resultId = '5678';
      await SRClient.getResultMetadata(accountId, environmentId, resultId);
      expect(stub.callCount).to.equal(1);
    });
  });
  describe('when getting last cleanup time', () => {
    let stub: sinon.SinonSpy;
    beforeEach(() => {
      stub = sinon.stub(SRClient['alClient'], 'fetch');
    });
    afterEach(() => {
      stub.restore();
    });
    it('should call fetch() on the ALClient instance', async() => {
      const accountId = '1234',
      environmentId = '7890',
      resultId = '5678';
      await SRClient.getLastCleanupTime();
      expect(stub.callCount).to.equal(1);
    });
  });
    
});
