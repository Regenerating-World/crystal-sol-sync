import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Heart, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '@/contexts/AppContext';

interface Post {
  id: string;
  author: string;
  authorHandle: string;
  content: string;
  timestamp: string;
  isOwnPost?: boolean;
}

export default function Social() {
  const { updateFunds } = useApp();
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'Maria',
      authorHandle: 'maria.sol',
      content: 'Just launched my new digital art collection! Check it out 🎨',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      author: 'Franco',
      authorHandle: 'fran.sol',
      content: 'Excited about the future of Web3 and ReFi! 🌱',
      timestamp: '5 hours ago',
      isOwnPost: true,
    },
  ]);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [tipAmount, setTipAmount] = useState('');

  const handleTipClick = (post: Post) => {
    setSelectedPost(post);
    setTipModalOpen(true);
  };

  const handleConfirmTip = () => {
    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const toCreator = amount * 0.8;
    const platformFee = amount * 0.2;
    const planetary = platformFee * 0.1;
    const city = platformFee * 0.1;

    updateFunds(planetary, city);
    toast.success(`Tip sent successfully to ${selectedPost?.author}!`);
    setTipModalOpen(false);
    setTipAmount('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Social Feed</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-sm text-muted-foreground">@{post.authorHandle}</p>
              </div>
              <span className="text-sm text-muted-foreground">{post.timestamp}</span>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex gap-2">
              {!post.isOwnPost && (
                <Button variant="outline" size="sm" onClick={() => handleTipClick(post)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Tip
                </Button>
              )}
              {post.isOwnPost && (
                <Button variant="outline" size="sm">
                  <Rocket className="w-4 h-4 mr-2" />
                  Boost
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={tipModalOpen} onOpenChange={setTipModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Social Tipping</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Amount (SOL)</label>
              <Input
                type="number"
                placeholder="1.0"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                step="0.1"
              />
            </div>
            {tipAmount && parseFloat(tipAmount) > 0 && (
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>To Creator ({selectedPost?.author}):</span>
                  <span className="font-semibold">{(parseFloat(tipAmount) * 0.8).toFixed(2)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee:</span>
                  <span className="font-semibold">{(parseFloat(tipAmount) * 0.2).toFixed(2)} SOL</span>
                </div>
                <div className="pl-4 space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>→ Planetary Fund:</span>
                    <span>{(parseFloat(tipAmount) * 0.02).toFixed(4)} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>→ City Fund:</span>
                    <span>{(parseFloat(tipAmount) * 0.02).toFixed(4)} SOL</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTipModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmTip}>Confirm Tip</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
