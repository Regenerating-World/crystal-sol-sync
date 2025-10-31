import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function LakeDetail() {
  const { lakeId } = useParams();
  const [activeTab, setActiveTab] = useState('proposals');

  const lakeName = lakeId === 'rwa-investors' ? 'RWA Investors' : 'Digital Art Fans';

  const proposals = [
    { id: 1, title: 'Invest in Tokenized Building', status: 'Active', votesFor: 34, votesAgainst: 8 },
    { id: 2, title: 'Change Quorum to 60%', status: 'Active', votesFor: 12, votesAgainst: 5 },
  ];

  const forumTopics = [
    { id: 1, title: 'RWA Discussion in LATAM', replies: 23, lastActivity: '2 hours ago' },
    { id: 2, title: 'Ideas for Q4', replies: 15, lastActivity: '1 day ago' },
  ];

  const members = [
    { name: 'Franco', handle: 'fran.sol', role: 'Member' },
    { name: 'Maria', handle: 'maria.sol', role: 'Member' },
    { name: 'Admin', handle: 'admin.sol', role: 'Admin' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{lakeName}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4 mt-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proposal #{proposal.id}: {proposal.title}</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {proposal.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm">
                  <span className="text-success font-semibold">{proposal.votesFor}</span> For
                </div>
                <div className="text-sm">
                  <span className="text-destructive font-semibold">{proposal.votesAgainst}</span> Against
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Vote Yes
                </Button>
                <Button size="sm" variant="outline">
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Vote No
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="forum" className="space-y-4 mt-6">
          {forumTopics.map((topic) => (
            <Card key={topic.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{topic.replies} replies</span>
                <span>Last activity: {topic.lastActivity}</span>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="members" className="space-y-4 mt-6">
          {members.map((member, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">@{member.handle}</p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-muted">{member.role}</span>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <Card className="p-6">
            <p className="text-muted-foreground">Badge system coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent value="treasury" className="mt-6">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">Treasury Balance</h3>
            <p className="text-4xl font-bold text-primary">150,000 USDC</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
