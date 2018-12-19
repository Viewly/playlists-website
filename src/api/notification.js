import { get, post } from "./request";

export async function notificationsFetch (baseUrl, { authorization }) {
  const { body } = await get(`${baseUrl}/notifications`, {}, { authorization });

  return body;
}

export async function notificationsMarkRead (baseUrl, { authorization, notifications_ids }) {
  const { body } = await post(`${baseUrl}/notifications-mark`, notifications_ids, { authorization });

  return body;
}
