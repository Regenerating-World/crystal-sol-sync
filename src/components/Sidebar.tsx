import { NavLink } from 'react-router-dom';
import { Home, Globe, ShoppingCart, Droplet, Rocket, Eye, Bell, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export const Sidebar = () => {
  const { currentUser, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isAdmin = currentUser === 'admin';

  const navItems = [
    { to: '/app/home/franco', icon: Home, label: 'Home' },
    { to: '/app/social', icon: Globe, label: 'Social' },
    { to: '/app/marketplace', icon: ShoppingCart, label: 'Marketplace' },
    { to: '/app/lakes', icon: Droplet, label: 'Lakes' },
    { to: '/app/campaigns', icon: Rocket, label: 'Campaigns' },
    { to: '/app/transparency', icon: Eye, label: 'Transparency' },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Crystal</h1>
        <p className="text-xs text-muted-foreground">Ecosystem</p>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <Separator className="my-4" />

        <NavLink
          to="/app/notifications"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`
          }
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {unreadCount}
            </Badge>
          )}
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/app/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-sm">
          <p className="text-muted-foreground">Logged in as</p>
          <p className="font-semibold text-foreground">
            {currentUser === 'franco' && 'Franco (fran.sol)'}
            {currentUser === 'maria' && 'Maria (maria.sol)'}
            {currentUser === 'admin' && 'Admin (admin.sol)'}
          </p>
        </div>
      </div>
    </aside>
  );
};
