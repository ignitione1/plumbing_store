import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutPreview />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
