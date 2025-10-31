import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function Transparency() {
  const { planetaryFund, cityFund } = useApp();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ReFi Transparency</h1>
      <p className="text-muted-foreground mb-8">
        All platform fees are distributed to regenerative finance funds that support planetary and local initiatives.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Planetary Fund</h2>
              <p className="text-sm text-muted-foreground">Global regenerative initiatives</p>
            </div>
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
          <p className="text-4xl font-bold text-primary">{planetaryFund.toFixed(2)} SOL</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">São José City Fund</h2>
              <p className="text-sm text-muted-foreground">Local community projects</p>
            </div>
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
          <p className="text-4xl font-bold text-primary">{cityFund.toFixed(2)} SOL</p>
        </Card>
      </div>
    </div>
  );
}
