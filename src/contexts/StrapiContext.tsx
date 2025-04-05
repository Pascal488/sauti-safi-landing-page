import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHeroContent, getFeatures, getBenefits, getTimeline } from '../services/api';
import { StrapiResponse, HeroContent, Feature, Benefit, TimelineItem, StrapiCollectionResponse } from '../types/strapi';

interface StrapiContextType {
  heroContent: StrapiResponse<HeroContent> | null;
  features: StrapiCollectionResponse<Feature> | null;
  benefits: StrapiCollectionResponse<Benefit> | null;
  timeline: StrapiCollectionResponse<TimelineItem> | null;
  loading: boolean;
  error: Error | null;
}

const StrapiContext = createContext<StrapiContextType | undefined>(undefined);

export const useStrapiData = () => {
  const context = useContext(StrapiContext);
  if (context === undefined) {
    throw new Error('useStrapiData must be used within a StrapiProvider');
  }
  return context;
};

interface StrapiProviderProps {
  children: ReactNode;
}

export const StrapiProvider: React.FC<StrapiProviderProps> = ({ children }) => {
  const [heroContent, setHeroContent] = useState<StrapiResponse<HeroContent> | null>(null);
  const [features, setFeatures] = useState<StrapiCollectionResponse<Feature> | null>(null);
  const [benefits, setBenefits] = useState<StrapiCollectionResponse<Benefit> | null>(null);
  const [timeline, setTimeline] = useState<StrapiCollectionResponse<TimelineItem> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [hero, featuresData, benefitsData, timelineData] = await Promise.all([
          getHeroContent(),
          getFeatures(),
          getBenefits(),
          getTimeline(),
        ]);

        setHeroContent(hero);
        setFeatures(featuresData);
        setBenefits(benefitsData);
        setTimeline(timelineData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data from Strapi:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const value = {
    heroContent,
    features,
    benefits,
    timeline,
    loading,
    error,
  };

  return <StrapiContext.Provider value={value}>{children}</StrapiContext.Provider>;
};