
import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export const HeroSectionTemplate: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonText,
  bgColor,
  textColor,
  buttonColor,
  buttonTextColor
}) => {
  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-12 md:py-24 lg:py-32 xl:py-48 transition-colors">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 style={{ color: textColor }} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none transition-colors">
              {title}
            </h1>
            <p style={{ color: textColor }} className="mx-auto max-w-[700px] text-lg md:text-xl transition-colors">
              {subtitle}
            </p>
          </div>
          <div className="space-x-4">
            <a
              href="#"
              style={{ backgroundColor: buttonColor, color: buttonTextColor }}
              className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
