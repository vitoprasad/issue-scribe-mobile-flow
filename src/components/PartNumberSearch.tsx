
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PartNumberSearchProps {
  onSelect: (partNumber: string) => void;
  value: string;
}

// Simulated part numbers for the demo
const MOCK_PART_NUMBERS = [
  { id: 1, number: 'PN-7734-A23', description: 'Gasket Assembly' },
  { id: 2, number: 'PN-5619-B14', description: 'Mounting Bracket' },
  { id: 3, number: 'PN-9812-C09', description: 'Circuit Board V2' },
  { id: 4, number: 'PN-3450-D87', description: 'Cooling Fan' },
  { id: 5, number: 'PN-2275-E34', description: 'Power Supply Unit' },
  { id: 6, number: 'PN-6190-F52', description: 'Display Panel' },
];

const PartNumberSearch: React.FC<PartNumberSearchProps> = ({ onSelect, value }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [results, setResults] = useState<typeof MOCK_PART_NUMBERS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search for part numbers when searchTerm changes
  useEffect(() => {
    if (searchTerm.length >= 2) {
      setIsSearching(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = MOCK_PART_NUMBERS.filter(
          part => part.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  part.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
        setShowDropdown(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPartNumber = (partNumber: string) => {
    setSearchTerm(partNumber);
    onSelect(partNumber);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          className="input-field pl-10"
          placeholder="Search by part number or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {showDropdown && (
        <div 
          ref={dropdownRef} 
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {isSearching ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((part) => (
                <li 
                  key={part.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelectPartNumber(part.number)}
                >
                  <div className="font-medium">{part.number}</div>
                  <div className="text-gray-500 text-xs">{part.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PartNumberSearch;
