const GallerySection = () => {
  return (
    <section id="gallery" className="min-h-0 md:min-h-[100svh] w-full max-w-full min-w-0 relative flex flex-col justify-start md:justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-12 overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full min-w-0">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-lg mb-4 break-words">
            gallery<span className="dot-teal"></span>
          </h2>
        </div>
        <p className="body-text text-center text-muted-foreground break-words">
          Coming soon.
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
