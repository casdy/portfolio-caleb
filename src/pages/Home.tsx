import React, { Suspense } from 'react';
import Hero from '../components/home/Hero';
import { SkeletonCard } from '../components/ui/Skeleton';

const ProjectsGrid = React.lazy(() => import('../components/home/ProjectsGrid'));
const BentoGrid = React.lazy(() => import('../components/home/BentoGrid'));

const Home = () => {
    return (
        <>
            <Hero />
            <Suspense fallback={<SkeletonCard className="h-96" />}>
                <BentoGrid />
            </Suspense>
            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
                    {[...Array(3)].map((_, i) => <SkeletonCard key={i} className="h-80" />)}
                </div>
            }>
                <ProjectsGrid />
            </Suspense>
        </>
    );
};

export default Home;
