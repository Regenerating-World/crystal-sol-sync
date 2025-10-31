import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Manifesto() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Crystal Ecosystem Manifesto</h1>
        <p className="text-muted-foreground">Our vision for the future of digital spaces and communities</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Deep Integration: Web3 & Web2</CardTitle>
          <CardDescription>Building holistic digital experiences</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            Coming next, Crystal Ecosystem wants to integrate deep experiences on Web3 De-fi mechanics and Web2 E-commerces 
            to provide services for people-to-people and service-to-people relationships. More than that, we are eager to 
            create communities (DAOs) for people, enabling for them the power of voting mechanisms like weighted and quadratic, 
            for the good impacts!
          </p>
          <p>
            As for humans feelings, we have mods to integrate our human partners life care to their digital experience: 
            memories portraits that can be shared and decorate more than one digital room, plants gifting for guaranteeing 
            plants watering will be remembered otherwise digital plants also die, and, inside home dust accumulating mod 
            which helps human aligning the fact he / she cleans his home. All these options are to create a digital 
            experience that is beautifully a holistic integration: earning money, supporting projects that matter, all in one place.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Digital Permanence for Brands</CardTitle>
          <CardDescription>Making luxury and craftsmanship eternal</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            Crystal Ecosystem is eager to help luxury, furniture, house items, arts (graffiti, tattoo) and other items shops, 
            to become digital for a lifetime. By uniting blockchain to pieces of work, Crystal has a plan to make people to 
            be able to receive visitors in their digital office or in their community hall, and, to enlighten the eyes of the 
            visitor with the purposeful representations that people behind the company and / or the community had been able to 
            gather, organize and which represents no more than the DNA of these people.
          </p>
          <p>
            This is perfect for branding, influencing, brands sharing and personality fitting when in meeting with others, 
            as our technology aligns what visitors like to what people have to showcase. Many have thought about Metaverses 
            and have made it far away from reality: Crystal has the plan to make it connect even more, reality and digital spaces.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purposeful Investments</CardTitle>
          <CardDescription>Early stage impactful businesses</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            Crystal Ecosystem is progressing to present purposeful companies investments for our community. 
            Stay tuned to invest in early stage impactful businesses, soon!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Garden of Relationships</CardTitle>
          <CardDescription>Seeds, perfumes, and meaningful connections</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            Letting people see your garden can be valuable! Have you ever thought about why appearance matter for some people? 
            Well, sometimes it is a matter of providing long term capacity of care! By having their own seeds planted, meaning 
            they can buy digital seeds of different flowers and configure the DNA of these, in the digital landscape, to showcase 
            a perfume of the happy moments you have registered, to be open for people in your network to present important moments 
            you were lovely, in their opinion...
          </p>
          <p>
            We see seeds as the representation of the most incredible nature power, and, there is nothing more natural and 
            powerful than letting our garden build our image based on our relationships of the past! Crystal is eager to see 
            people gardening their best relationships in their frontdoors, world will love to know what perfumes humans carry!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Future of Connection</CardTitle>
          <CardDescription>Cards, messages, and gifts at your frontdoor</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            In the future, people will be able to leave cards, message, invitations and gifts for you, at your frontdoor! 
            We, from Crystal, can't wait to connect our network. For now, all we can say is: a support is more than welcome! 
            If you know any investors interested in such rich opportunity to be grown, leave us a card! xD
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
