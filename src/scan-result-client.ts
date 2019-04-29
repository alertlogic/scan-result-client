/**
 * Module to deal with available Ticket Master Public API endpoints
 */
import { ALClient } from '@al/client';

export interface MetadataResponse {
  scan_policy_snapshot_id?: string;
  scanner?: string;
  content_type?: string;
  timestamp?: number;
  asset_id?: string;
  environment_id: string;
}

class SRClient {

  private alClient = ALClient;
  private serviceName = 'scan_result';

  /**
   * Add a scan result
   * POST
   * /scan_result/v1/:account_id
   * "https://api.cloudinsight.alertlogic.com/scan_result/v1/01000003"
   * --form metadata="{\"scanner\": \"nmap\", \"timestamp\": 123456789, \"asset_id\": \"/aws/ap-southeast-2/host/i-48531462\", \"environment_id\": \"36197B87-338C-407C-AEF0-ECA55DB078CE\", \"scan_policy_snapshot_id\": \"773E934B-F701-1004-A587-7831C1BAEAE6\", \"content_type\": \"application/xml\"}"
   * --form result=@"scan_result.xml;type=application/xml"
   */
  async addResult(accountId: string, metadata: any, result: any) {
    const form = new FormData();
    form.set('metadata', metadata);
    form.set('result', result);
    const add = await this.alClient.post({
      service_name: this.serviceName,
      account_id: accountId,
      data: form,
    });
    return add;
  }

  /**
   * Get a scan result
   * GET
   * /scan_result/v2/:account_id/:environment_id/:scan_result_id/result
   * "https://api.cloudinsight.alertlogic.com/scan_result/v2/01000001/36197B87-338C-407C-AEF0-ECA55DB078CE/525DECF2-F708-1004-A40B-7831C1BAEAE6/result"
   */
  async getResult(accountId: string, environmentId: string, resultId: string) {
    const result = await this.alClient.fetch({
      service_name: this.serviceName,
      version: 'v2',
      account_id: accountId,
      path: `/${environmentId}/${resultId}/result`,
    });
    return result;
  }

  /**
   * Get a scan result's metadata
   * GET
   * /scan_result/v2/:account_id/:environment_id/:scan_result_id/metadata
   * "https://api.cloudinsight.alertlogic.com/scan_result/v1/01000001/36197B87-338C-407C-AEF0-ECA55DB078CE/525DECF2-F708-1004-A40B-7831C1BAEAE6/metadata"
   */
  async getResultMetadata(accountId: string, environmentId: string, resultId: string) {
    const metadata = await this.alClient.fetch({
      service_name: this.serviceName,
      version: 'v2',
      account_id: accountId,
      path: `/${environmentId}/${resultId}/metadata`,
    });
    return metadata as MetadataResponse;
  }

  /**
   * Get last scan result cleanup time
   * GET
   * /scan_result/v1/last_cleanup_time
   * "https://api.cloudinsight.alertlogic.com/scan_result/v1/last_cleanup_time"
   */
  async getLastCleanupTime() {
    const cleanup = await this.alClient.fetch({
      service_name: this.serviceName,
      path: 'last_cleanup_time',
    });
    return cleanup;
  }

}

export const srClient = new SRClient();
