import { Notification } from '../types';
import { apiRequest } from './apiClient';

type NotificationApiItem = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: Notification['type'];
  is_read: boolean;
  action_url?: string;
  action_label?: string;
  created_at: string;
};

const toNotification = (item: NotificationApiItem): Notification => ({
  id: item.id,
  userId: item.user_id,
  title: item.title,
  message: item.message,
  type: item.type,
  isRead: item.is_read,
  actionUrl: item.action_url,
  actionLabel: item.action_label,
  createdAt: item.created_at,
});

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const response = await apiRequest<{ items: NotificationApiItem[] }>('/notifications');
    return response.items.map(toNotification);
  }

  async markAsRead(id: string): Promise<void> {
    await apiRequest<NotificationApiItem>(`/notifications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_read: true }),
    });
  }

  async markAllAsRead(): Promise<void> {
    await apiRequest('/notifications/mark-all-read', { method: 'POST' });
  }

  async getUnreadCount(): Promise<number> {
    return (await this.getNotifications()).filter((notification) => !notification.isRead).length;
  }
}

export const notificationService = new NotificationService();
