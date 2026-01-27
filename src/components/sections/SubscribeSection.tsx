import ScrollArrow from "../ScrollArrow";
import portraitImg from "@/assets/portrait-thinking.jpg";
import { ArrowRight } from "lucide-react";

const SubscribeSection = () => {
  return (
    <section id="subscribe" className="section-split">
      {/* Image Side */}
      <div className="section-image order-1 lg:order-1">
        <img 
          src={portraitImg} 
          alt="Person in thought" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Side */}
      <div className="section-content order-2 lg:order-2 relative">
        <div className="max-w-lg">
          <h2 className="heading-lg mb-8">
            subscribe<span className="dot-yellow"></span>
          </h2>

          <p className="body-text mb-4">
            Currently in production. Releasing early 2026.
          </p>

          <p className="body-text mb-10">
            Follow along on your favorite platforms.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-12">
            <a href="#" className="link-arrow">
              youtube <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              apple podcasts <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              instagram <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="link-arrow">
              spotify <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <ScrollArrow targetId="contact" />
      </div>
    </section>
  );
};

export default SubscribeSection;
