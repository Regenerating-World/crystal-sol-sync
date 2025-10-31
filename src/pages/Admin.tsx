import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function Admin() {
  const { addItemTemplate } = useApp();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    thumbnail: '',
    assetUrl: '',
    price: '',
  });

  const handleCreateItem = () => {
    if (!formData.sku || !formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    addItemTemplate({
      id: `t-${Date.now()}`,
      sku: formData.sku,
      name: formData.name,
      thumbnail: formData.thumbnail || '📦',
      assetUrl: formData.assetUrl,
      price: parseFloat(formData.price),
    });

    toast.success('Item template created successfully!');
    setCreateModalOpen(false);
    setFormData({ sku: '', name: '', thumbnail: '', assetUrl: '', price: '' });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={() => setCreateModalOpen(true)}>Create New Item (Template)</Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">1,247</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active DAOs</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total cNFTs Minted</p>
            <p className="text-2xl font-bold">5,832</p>
          </div>
        </div>
      </Card>

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Item Template</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="LAMP001"
              />
            </div>
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Modern Lamp"
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail (Emoji)</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="💡"
              />
            </div>
            <div>
              <Label htmlFor="price">Price (SOL) *</Label>
              <Input
                id="price"
                type="number"
                step="0.1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.5"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="assetUrl">Asset URL</Label>
              <Input
                id="assetUrl"
                value={formData.assetUrl}
                onChange={(e) => setFormData({ ...formData, assetUrl: e.target.value })}
                placeholder="/lamp.glb"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateItem}>Create Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
