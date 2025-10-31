import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Home() {
  const { inventory, updateItemPosition } = useApp();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const placedItems = inventory.filter((item) => item.position);
  const unplacedItems = inventory.filter((item) => !item.position);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    const canvas = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvas.left;
    const y = e.clientY - canvas.top;

    updateItemPosition(draggedItem, { x, y });
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSaveLayout = () => {
    toast.success('Layout Saved Successfully!');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Franco's Sovereign Home</h1>
        <div
          className="relative w-full h-[600px] bg-card border-2 border-dashed border-border rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {placedItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl cursor-move"
              style={{ left: item.position!.x, top: item.position!.y }}
              draggable
              onDragStart={() => handleDragStart(item.id)}
            >
              {item.thumbnail}
            </div>
          ))}
        </div>
        <Button onClick={handleSaveLayout} className="mt-4">
          Save Layout
        </Button>
      </div>

      <aside className="w-80 border-l border-border p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Inventory (cNFTs)</h2>
        <div className="space-y-3">
          {unplacedItems.map((item) => (
            <Card
              key={item.id}
              className="p-4 cursor-move hover:shadow-md transition-shadow"
              draggable
              onDragStart={() => handleDragStart(item.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.thumbnail}</span>
                <span className="font-medium">{item.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </aside>
    </div>
  );
}
