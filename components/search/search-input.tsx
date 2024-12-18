'use client';

import { Search, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: 'search' | 'building';
}

export function SearchInput({ label, value, onChange, placeholder, icon }: SearchInputProps) {
  const Icon = icon === 'building' ? Building2 : Search;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <Icon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}