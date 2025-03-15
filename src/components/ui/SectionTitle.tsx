
import React from 'react';
import ScribbleHighlight from './ScribbleHighlight';
import CircleScribble from './CircleScribble';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlightText?: string;
  className?: string;
  circleScribble?: boolean;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  highlightText,
  className = '',
  circleScribble = false,
  centered = true,
}) => {
  const titleParts = highlightText
    ? title.split(highlightText)
    : [title];

  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 animate-on-scroll ${className}`}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
        {titleParts.length > 1 ? (
          <>
            {titleParts[0]}
            <ScribbleHighlight>{highlightText}</ScribbleHighlight>
            {titleParts[1]}
          </>
        ) : (
          <span className="relative">
            {title}
            {circleScribble && (
              <CircleScribble className="absolute -z-10 right-0 top-0 w-full h-full opacity-20" />
            )}
          </span>
        )}
      </h2>
      
      {subtitle && (
        <p className="text-xl text-black max-w-3xl mx-auto font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
