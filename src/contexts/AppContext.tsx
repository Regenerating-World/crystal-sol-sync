import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'franco' | 'maria' | 'admin';

export interface CNFTItem {
  id: string;
  templateId: string;
  name: string;
  thumbnail: string;
  position?: { x: number; y: number };
  metadata?: {
    giftedBy?: string;
    giftedMedia?: string[];
    purchasedFrom?: string;
    brand?: string;
    story?: string;
  };
}

export interface ItemTemplate {
  id: string;
  sku: string;
  name: string;
  thumbnail: string;
  assetUrl: string;
  price: number;
}

export interface Notification {
  id: string;
  type: 'friend_request' | 'tip' | 'boost' | 'dao';
  from: string;
  message: string;
  read: boolean;
}

interface AppContextType {
  currentUser: UserRole;
  setCurrentUser: (user: UserRole) => void;
  inventory: CNFTItem[];
  addToInventory: (item: CNFTItem) => void;
  updateItemPosition: (id: string, position: { x: number; y: number }) => void;
  planetaryFund: number;
  cityFund: number;
  updateFunds: (planetary: number, city: number) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  itemTemplates: ItemTemplate[];
  addItemTemplate: (template: ItemTemplate) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserRole>('franco');
  const [inventory, setInventory] = useState<CNFTItem[]>([
    { 
      id: '1', 
      templateId: 't1', 
      name: 'Plant Vase', 
      thumbnail: '🪴', 
      position: { x: 100, y: 100 },
      metadata: {
        giftedBy: 'maria.sol',
        giftedMedia: ['https://example.com/plant-gift.jpg'],
        brand: 'EcoGreen',
        story: 'A gift to remember the importance of caring for living things - digital plants die too if not watered!'
      }
    },
    { 
      id: '2', 
      templateId: 't2', 
      name: 'Art Frame', 
      thumbnail: '🖼️',
      metadata: {
        purchasedFrom: 'Crystal Marketplace',
        brand: 'Digital Arts Co.',
        story: 'Memories portraits that can be shared and decorate more than one digital room.'
      }
    },
    { 
      id: '3', 
      templateId: 't3', 
      name: 'Rug', 
      thumbnail: '🧶',
      metadata: {
        purchasedFrom: 'Luxury Home Store',
        brand: 'Crystal Furnishings',
      }
    },
  ]);
  const [planetaryFund, setPlanetaryFund] = useState(1000.00);
  const [cityFund, setCityFund] = useState(500.00);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'friend_request',
      from: 'maria.sol',
      message: 'Maria sent you a friend request',
      read: false,
    },
  ]);
  const [itemTemplates, setItemTemplates] = useState<ItemTemplate[]>([
    { id: 't1', sku: 'LAMP001', name: 'Modern Lamp', thumbnail: '💡', assetUrl: '/lamp.glb', price: 0.5 },
    { id: 't2', sku: 'WALL001', name: 'Stone Wall', thumbnail: '🧱', assetUrl: '/wall.glb', price: 1.0 },
  ]);

  const addToInventory = (item: CNFTItem) => {
    setInventory((prev) => [...prev, item]);
  };

  const updateItemPosition = (id: string, position: { x: number; y: number }) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position } : item))
    );
  };

  const updateFunds = (planetary: number, city: number) => {
    setPlanetaryFund((prev) => prev + planetary);
    setCityFund((prev) => prev + city);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const addItemTemplate = (template: ItemTemplate) => {
    setItemTemplates((prev) => [...prev, template]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        inventory,
        addToInventory,
        updateItemPosition,
        planetaryFund,
        cityFund,
        updateFunds,
        notifications,
        markNotificationRead,
        itemTemplates,
        addItemTemplate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
