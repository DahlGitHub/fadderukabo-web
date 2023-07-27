// CategoryButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper, Trophy, Heart, GraduationCap } from 'lucide-react';

type CategoryButtonsProps = {
  selectedCategories: Set<string>;
  toggleCategory: (category: string) => void;
};

const categoryIcon = {
  Fest: { icon: <PartyPopper size={16} />, color: '#f87171' },
  Sport: { icon: <Trophy size={16} />, color: '#facc15' },
  Sosialt: { icon: <Heart size={16} />, color: '#a3e635' },
  Universitetet: { icon: <GraduationCap size={16} />, color: '#a78bfa' },
};

export const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategories,
  toggleCategory,
}) => (
  <div className="grid grid-cols-4 gap-4 mb-5 max-w-xl mx-auto font-poppins z-10">
    {Object.entries(categoryIcon).map(([category, { icon, color }]) => (
      <Button
        className="h-20"
        style={{ borderColor: color }}
        key={category}
        variant={selectedCategories.has(category) ? 'secondary' : 'outline'}
        onClick={() => toggleCategory(category)}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="my-2">{icon}</span>
          <span className="text-xs">{category}</span>
        </div>
      </Button>
    ))}
  </div>
);
