import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';

const ScrollBaseVelocityText = () => {
    return (
        <div className=''>
             <ScrollVelocityContainer className="xl  my-12 sm:text-2xl md:text-3xl lg:text-4xl  font-bold ">
  <ScrollVelocityRow baseVelocity={5} direction={1}>
  Turning imagination into fast, fluid, and futuristic experiences.
  </ScrollVelocityRow>
  <ScrollVelocityRow baseVelocity={5} direction={-1}>
    Where creativity accelerates with precision.
  </ScrollVelocityRow>
</ScrollVelocityContainer>
        </div>
    );
};

export default ScrollBaseVelocityText;