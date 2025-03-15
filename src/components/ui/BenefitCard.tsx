
import React from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt
}) => {
  return (
    <div className="glass-card p-8 text-center flex flex-col items-center animate-on-scroll">
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-black">{description}</p>
      <div className="mt-6 h-40 w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img 
          src={imageSrc}
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BenefitCard;
