import { useState, type FormEvent } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No newsletter backend yet — acknowledge the signup locally only.
    setSubmitted(true);
  };

  return (
    <section aria-labelledby="newsletter-heading" className="w-full min-w-0">
      <div className="section-container border-t border-border pt-16 sm:pt-20 md:pt-24 text-center">
        <h2 id="newsletter-heading" className="heading-md mb-6 break-words">
          stay in the conversation<span className="dot-teal"></span>
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[440px] mx-auto mb-10 sm:mb-12 break-words [font-family:'DM_Serif_Display',Georgia,serif]">
          A quiet letter, now and then. New stories from the Journal and notes
          from behind the podcast — nothing more.
        </p>

        {submitted ? (
          <p
            role="status"
            className="text-sm sm:text-base text-foreground [font-family:'DM_Serif_Display',Georgia,serif]"
          >
            Thank you — you're on the list. The letter itself is still being
            prepared, so nothing arrives just yet.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-4 sm:gap-5 max-w-[440px] mx-auto"
            noValidate={false}
          >
            <div className="flex-1 min-w-0 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent border-0 border-b border-foreground/30 pb-2 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus-visible:border-foreground rounded-none min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-[#1a1a1a] text-white text-sm font-semibold px-8 py-3 min-h-[44px] hover:opacity-85 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
