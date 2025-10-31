import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function Marketplace() {
  const { itemTemplates, addToInventory } = useApp();
  const [selectedItem, setSelectedItem] = useState<typeof itemTemplates[0] | null>(null);

  const handleBuy = (item: typeof itemTemplates[0]) => {
    setSelectedItem(item);
  };

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;

    addToInventory({
      id: `item-${Date.now()}`,
      templateId: selectedItem.id,
      name: selectedItem.name,
      thumbnail: selectedItem.thumbnail,
    });

    toast.success(`Purchase complete! '${selectedItem.name}' has been added to your inventory.`);
    setSelectedItem(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemTemplates.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="text-6xl mb-4 text-center">{item.thumbnail}</div>
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-muted-foreground mb-4">SKU: {item.sku}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{item.price} SOL</span>
              <Button onClick={() => handleBuy(item)}>Buy</Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="py-4">
              <div className="text-6xl mb-4 text-center">{selectedItem.thumbnail}</div>
              <h3 className="text-xl font-semibold mb-2">{selectedItem.name}</h3>
              <p className="text-muted-foreground mb-4">Price: {selectedItem.price} SOL</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPurchase}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
