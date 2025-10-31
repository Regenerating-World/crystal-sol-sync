import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();

  const handleAccept = (notificationId: string) => {
    markNotificationRead(notificationId);
    toast.success('Friend request accepted!');
  };

  const handleReject = (notificationId: string) => {
    markNotificationRead(notificationId);
    toast('Friend request rejected');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      
      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium mb-1">{notif.message}</p>
                <p className="text-sm text-muted-foreground">From: @{notif.from}</p>
              </div>
              {!notif.read && notif.type === 'friend_request' && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAccept(notif.id)}>
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(notif.id)}>
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
