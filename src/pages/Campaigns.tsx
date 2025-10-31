import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

const campaigns = [
  {
    id: 'nike-air',
    name: 'Nike Air Launch Campaign',
    budget: '$50,000',
    description: 'Promote the new Nike Air collection to your audience',
    campaignKey: 'NIKE_AIR_2025',
  },
  {
    id: 'solana-refi',
    name: 'Solana ReFi Campaign',
    budget: 'Public',
    description: 'Help spread awareness about regenerative finance on Solana',
    campaignKey: 'SOLANA_REFI_2025',
  },
];

export default function Campaigns() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
      <p className="text-muted-foreground mb-8">
        Discover brand campaigns and monetize your content by participating
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                <p className="text-lg font-bold text-primary mb-2">Budget: {campaign.budget}</p>
                <p className="text-sm text-muted-foreground">Key: {campaign.campaignKey}</p>
              </div>
            </div>
            <Button className="w-full">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
