import { useState } from 'react';
import { useApp, CNFTItem } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function Home() {
  const { inventory, updateItemPosition } = useApp();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CNFTItem | null>(null);
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

  const handleItemClick = (e: React.MouseEvent, item: CNFTItem) => {
    e.stopPropagation();
    if (!draggedItem) {
      setSelectedItem(item);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Franco's Sovereign Home</h1>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Coming next, Crystal Ecosystem wants to integrate deep experiences on Web3 De-fi mechanics and Web2 E-commerces to provide services for people-to-people and service-to-people relationships. More than that, we are eager to create communities (DAOs) for people, enabling for them the power of voting mechanisms like weighted and quadratic, for the good impacts!
          </p>
        </div>
        <div
          className="relative w-full h-[600px] bg-card border-2 border-dashed border-border rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {placedItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl cursor-pointer hover:scale-110 transition-transform"
              style={{ left: item.position!.x, top: item.position!.y }}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onClick={(e) => handleItemClick(e, item)}
              title="Click to view details, drag to move"
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-5xl">{selectedItem?.thumbnail}</span>
              <span>{selectedItem?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.metadata?.giftedBy && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Gifted By</h3>
                <p className="text-foreground">{selectedItem.metadata.giftedBy}</p>
              </div>
            )}
            {selectedItem?.metadata?.purchasedFrom && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Purchased From</h3>
                <p className="text-foreground">{selectedItem.metadata.purchasedFrom}</p>
              </div>
            )}
            {selectedItem?.metadata?.brand && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Brand</h3>
                <p className="text-foreground">{selectedItem.metadata.brand}</p>
              </div>
            )}
            {selectedItem?.metadata?.story && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Story</h3>
                <p className="text-foreground italic">{selectedItem.metadata.story}</p>
              </div>
            )}
            {selectedItem?.metadata?.giftedMedia && selectedItem.metadata.giftedMedia.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">Attached Media</h3>
                <div className="space-y-1">
                  {selectedItem.metadata.giftedMedia.map((media, idx) => (
                    <p key={idx} className="text-sm text-primary underline">{media}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
