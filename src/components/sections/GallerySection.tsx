import ScrollArrow from "../ScrollArrow";

const GallerySection = () => {
  return (
    <section id="gallery" className="h-[100svh] w-full relative flex flex-col justify-center px-6 py-10 md:py-12 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-lg mb-4">
            gallery<span className="dot-teal"></span>
          </h2>
        </div>
        <p className="body-text text-center text-muted-foreground">
          Coming soon.
        </p>
        <div className="hero-bottom-group flex flex-col items-center mt-12 md:mt-20">
          <ScrollArrow targetId="contact" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
