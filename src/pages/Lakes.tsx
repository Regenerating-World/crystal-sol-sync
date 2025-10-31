import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

const lakes = [
  { id: 'rwa-investors', name: 'RWA Investors', members: 42, description: 'Real World Assets investing DAO' },
  { id: 'digital-art-fans', name: 'Digital Art Fans', members: 128, description: 'Community for digital art enthusiasts' },
];

export default function Lakes() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Lakes (DAOs)</h1>
        <Button>
          <Droplet className="w-4 h-4 mr-2" />
          Create new Lake
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lakes.map((lake) => (
          <Link key={lake.id} to={`/app/lakes/${lake.id}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{lake.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{lake.description}</p>
                  <p className="text-sm text-muted-foreground">{lake.members} members</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
