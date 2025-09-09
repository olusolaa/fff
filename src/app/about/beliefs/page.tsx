
import ContentBlock from '@/components/shared/ContentBlock';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function BeliefsPage() {
  return (
    <div>
      <ContentBlock
        title="Our Beliefs"
        text="At Family Tent Ministry, our foundation is built upon core Christian principles. We believe in:"
        className="bg-secondary/30 text-center"
        titleClassName="text-4xl md:text-5xl mt-20"
      />
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground/80">
          <p>
            <strong>Teaching Values and Ethics:</strong> We are dedicated to imparting values and ethics derived from Christian teachings that foster meaningful and purposeful living.
          </p>
          <p>
            <strong>Guidance for Young People:</strong> Our commitment is to guide young individuals towards becoming healthy, responsible, and spiritually grounded members of society, equipped to navigate life's challenges with integrity.
          </p>
          <p>
            <strong>Collaboration for Impact:</strong> We believe in the power of collaboration with families, religious institutions, and communities to promote a shared understanding and practice of these life-enriching values.
          </p>
          <p>
            <strong>Holistic Development:</strong> Our vision encompasses a society where individuals and families thrive by living out Christian values, leading to holistic personal growth and positive community transformation.
          </p>
          <p>
            These beliefs are the driving force behind our programs and initiatives, as we strive to be a beacon of hope and a source of spiritual nourishment.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
