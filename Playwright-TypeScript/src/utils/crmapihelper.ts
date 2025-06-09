import axios from "axios";
import qs from "qs";
import { expect } from "@playwright/test";

import { CommonLogicalNames } from '../constants/CommonLogicalNames.json';
import { AccountLogicalNames } from '../constants/AccountsLogicalName.json';

import dotenv from 'dotenv';
dotenv.config();

/**
 * Author: Testers Talk
 */
export async function createAccountRecord(token: string): Promise<string> {
    let recordGuid: string;

    try {
        const apiBaseURL = `${process.env.CRM_API_URL}`; // Your application URL
        const name = AccountLogicalNames.Name;
        const number = AccountLogicalNames.Number;
        const email = AccountLogicalNames.Email;

        const Account = {
            [name]: 'Testers Talk',
            [number]: '1345679',
            [email]: 'test@email.com'
        }

        const apiURL = `${apiBaseURL}` + CommonLogicalNames.Entity.Account;
        const apiHeaders = await getHeadersForCreatingRecord(token);

        const response = await axios.post(
            apiURL,
            Account,
            { headers: apiHeaders }
        );

        expect(response.status).toBe(204);
        expect(response.statusText).toBe('No Content');

        const entityUrl = response.headers['odata-entityid'] || response.headers['OData-EntityId'];
        const match = entityUrl.match(/\(([^)]+)\)/);
        recordGuid = match ? match[1] : null;
        console.error(`Recored created with Guid : ${recordGuid}`);

    } catch (error: any) {
        console.error(`Request failed with status :`, error.response?.status);
        console.error(`Deatils:`, error.response?.data?.error || error.response?.data);
        throw error;
    }
    return recordGuid;
}

/**
 * Author: Testers Talk
 */
export async function deleteRecord(entity: string, recordGuid: string): Promise<void> {
    try {
        const apiBaseURL = `${process.env.CRM_API_URL}`; // Your application URL
        const token = await generateToken(apiBaseURL); // Your access token
        await checkIfRecordIsPresent(entity, recordGuid, token, apiBaseURL);
        await deleteRecordUsingGuid(entity, recordGuid, token, apiBaseURL);
    } catch (error: any) {
        console.error(`Request failed with status :`, error.response?.status);
        console.error(`Deatils:`, error.response?.data?.error || error.response?.data);
        throw error;
    }
}

/**
 * Author: Testers Talk
 */
export async function checkIfRecordIsPresent(entity: string, recordGuid: string, accessToken: string, apiBaseURL: string): Promise<void> {
    console.log(`Checking if record with GUID ${recordGuid} exists in entity ${entity}`);
    const getAPIHeaders = await getHeadersForReadingRecord(accessToken);
    const apiURL = `${apiBaseURL}` + `${entity}(${recordGuid})`;

    try {
        const response = await axios.get(apiURL, { headers: getAPIHeaders });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        console.log(`Record details:`, JSON.stringify(response.data, null, 2));
        console.log(`Record with GUID ${recordGuid} exists in entity ${entity}`);
    } catch (error: any) {

        console.error(`Record not found  with GUID ${recordGuid} in entity ${entity}`);
        console.error(`Request failed with status :`, error.response?.status);
        console.error(`Deatils:`, error.response?.data?.error || error.response?.data);
        throw error;
    }

    console.log(`Record check completed for GUID ${recordGuid} in entity ${entity}`);
}

/**
 * Author: Testers Talk
 */
export async function deleteRecordUsingGuid(entity: string, recordGuid: string, token: string, apiBaseURL: string): Promise<void> {
    console.log(`Deleting record with GUID ${recordGuid} from entity : ${entity}`);
    const postAPIHeaders = await getHeadersForDeletingRecord(token);
    const apiURL = `${apiBaseURL}/api/data/v9.2/${entity}s(${recordGuid})`;

    try {
        const response = await axios.delete(apiURL, { headers: postAPIHeaders });
        expect(response.status).toBe(204);
        expect(response.statusText).toBe('No Content');
        console.log(`Record ${recordGuid} deleted successfully`);
    } catch (error: any) {
        console.error(`Error while deleting record: ${recordGuid}`);
        console.error(`Request failed with status :`, error.response?.status);
        console.error(`Deatils:`, error.response?.data?.error || error.response?.data);
        throw error;
    }
}

/**
 * Author: Testers Talk
 */
export async function generateToken(apiBaseURL: string): Promise<string> {
    const clientId = `${process.env.AZURE_CLIENT_ID} `; // Your client ID
    const clientSecret = `${process.env.AZURE_CLIENT_SECRET} `; // Your client secret
    const tenantId = `${process.env.AZURE_TENANT_ID} `; // Your tenant ID

    if (!apiBaseURL || !clientId || !clientSecret || !tenantId) {
        throw new Error("Environment variables for CRM API are not set properly.");
    }

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const data = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: `${apiBaseURL}/.default`
    };

    try {
        const response = await axios.post(tokenUrl, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error: any) {
        console.error(`Request failed with status :`, error.response?.status);
        console.error(`Deatils:`, error.response?.data?.error || error.response?.data);
        throw error;
    }
}

/**
 * Author: Testers Talk
 */
export async function getHeadersForReadingRecord(token: string): Promise<Record<string, string>> {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        prefer: 'odata.include-annotations="*"',
    };
}

/**
 * Author: Testers Talk
 */
export async function getHeadersForDeletingRecord(token: string): Promise<Record<string, string>> {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
    };
}

/**
 * Author: Testers Talk
 */
export async function getHeadersForCreatingRecord(token: string): Promise<Record<string, string>> {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
    };
}