import React from 'react';
import Footer from '../../Footer/Footer';
import Carousel from '../Slider/Carousel';
import About from './About/About';
import ClientReview from './ClientReview/ClientReview';
import './home.css';
import MainSection from './MainSection/MainSection';
import Pricing from './Pricing/Pricing';
import ProjectDone from './ProjectDone/ProjectDone';
import Discount from './Service/Discount';
import Service from './Service/Service';

const Home = () => {
    return (
        <div>
            <div>
                <Carousel />
                <MainSection />
                <About />
                <Service />
                <Discount />
                <Pricing />
                <ProjectDone />
                <ClientReview />
                <Footer />
            </div>
        </div>
    );
};

export default Home;