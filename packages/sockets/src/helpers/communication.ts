import {
  APIG_ENDPOINT,
  CONNECTIONS_SITE_ID_INDEX,
  CONNECTIONS_TABLE,
  CONNECTIONS_USER_ID_INDEX,
} from '../constants';
import AWS from 'aws-sdk';
import { findAll, removeItem, scan } from '@ada-builder/database-services';
import { Connection } from '../types';

const apig = new AWS.ApiGatewayManagementApi({
  endpoint: APIG_ENDPOINT,
});

type SendMessage = {
  body?: any;
  id: string;
};

export const sendMessageToUser = async ({ body = '', id }: SendMessage) => {
  const connections = await getConnectionByUserId(id);
  try {
    await Promise.all(
      connections.map(({ connectionId }) =>
        sendMessage({ body, id: connectionId }),
      ),
    );
  } catch (e) {
    console.log('ERROR SENDING SOCKET MESSAGE');
    console.log(e);
  }
  return body;
};

export const sendMessageToSite = async ({ body = '', id }: SendMessage) => {
  try {
    const connections = await getConnectionBySiteId(id);
    await Promise.all(
      connections.map(({ connectionId }) =>
        sendMessage({ body, id: connectionId }),
      ),
    );
  } catch (e) {
    console.log('Error sending to site', e);
  }
  return body;
};

export const notifyUser = sendMessageToUser;
export const notifySite = sendMessageToSite;

export const sendMessage = async ({ body = '', id }: SendMessage) => {
  try {
    await apig
      .postToConnection({
        ConnectionId: id,
        Data: JSON.stringify(body),
      })
      .promise();
  } catch (err: any) {
    if (err.statusCode === 410) {
      console.log(`Found stale connection, deleting ${id}`);
      deleteConnectionById(id).then();
    } else {
      console.log('ERROR sending message not 410');
      console.log('GATEWAY', APIG_ENDPOINT);
      console.log(err);
    }
  }

  return body;
};

export const getAllConnections = () => scan(CONNECTIONS_TABLE);

export const getConnectionByUserId = async (userId: string) =>
  findAll<Connection>(CONNECTIONS_TABLE, {
    data: {
      userId,
    },
    index: CONNECTIONS_USER_ID_INDEX,
  });

export const getConnectionBySiteId = async (siteId: string) =>
  findAll<Connection>(CONNECTIONS_TABLE, {
    data: {
      siteId,
    },
    index: CONNECTIONS_SITE_ID_INDEX,
  });

export const deleteConnectionById = async (connectionId: string) =>
  removeItem(CONNECTIONS_TABLE, { connectionId });
