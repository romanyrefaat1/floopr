
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="feature-card animate-on-scroll relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-floopr-purple-bg flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-floopr-purple" />
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-black">{title}</h3>
      <p className="text-black">{description}</p>
      
      {/* Decorative elements */}
      <svg className="absolute -bottom-20 -right-20 w-40 h-40 text-gray-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
      </svg>
    </div>
  );
};

export default FeatureCard;
