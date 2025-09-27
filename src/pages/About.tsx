import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Gem } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-luxury">Story</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over three decades, Nyrazari has been crafting exquisite jewelry that celebrates 
            life's most precious moments with unparalleled artistry and elegance.
          </p>
        </motion.div>

        {/* Heritage Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                A Legacy of <span className="text-luxury">Excellence</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 1990 by master jeweler Alessandro Nyrazari, our atelier began as a 
                small workshop in the heart of New York's Diamond District. What started as 
                one man's passion for creating extraordinary pieces has grown into a globally 
                recognized brand synonymous with luxury and craftsmanship.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each piece in our collection tells a story—of love, celebration, achievement, 
                and the moments that matter most. We believe jewelry should be more than 
                beautiful; it should be meaningful, lasting, and worthy of being passed down 
                through generations.
              </p>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Heritage Image Placeholder</p>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-luxury">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every piece we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Gem,
                title: 'Exceptional Quality',
                description: 'We source only the finest materials and employ traditional techniques passed down through generations of master craftsmen.'
              },
              {
                icon: Heart,
                title: 'Passionate Craftsmanship',
                description: 'Every piece is created with love and attention to detail, ensuring it meets our exacting standards of beauty and durability.'
              },
              {
                icon: Users,
                title: 'Personal Service',
                description: 'We believe in building lasting relationships with our clients, offering personalized service and custom design consultations.'
              },
              {
                icon: Award,
                title: 'Timeless Design',
                description: 'Our designs transcend trends, creating pieces that remain as beautiful and relevant today as they will be for generations to come.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="card-luxury text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <value.icon className="h-12 w-12 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Craftsmanship Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center order-2 lg:order-1">
              <p className="text-muted-foreground">Craftsmanship Image Placeholder</p>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                Master <span className="text-luxury">Craftsmanship</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our workshop is where tradition meets innovation. Each piece is meticulously 
                crafted by skilled artisans who have dedicated their lives to the art of 
                jewelry making. From hand-selecting gemstones to the final polish, every 
                step is executed with precision and care.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Hand-selected precious metals and gemstones</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Traditional techniques refined over decades</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Rigorous quality control at every stage</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Lifetime warranty on all pieces</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-luxury">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind every exquisite piece
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alessandro Nyrazari',
                role: 'Founder & Master Jeweler',
                description: 'With over 40 years of experience, Alessandro brings Old World craftsmanship to modern luxury jewelry.'
              },
              {
                name: 'Isabella Martinez',
                role: 'Lead Designer',
                description: 'Isabella creates timeless designs that capture the essence of elegance and sophistication.'
              },
              {
                name: 'James Chen',
                role: 'Gemologist',
                description: 'James ensures every gemstone meets our exacting standards for brilliance, clarity, and color.'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="card-luxury text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;