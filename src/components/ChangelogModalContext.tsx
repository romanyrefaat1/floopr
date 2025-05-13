import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { changelogData } from '../data/changelogData';
import Image from 'next/image';

interface ChangelogModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChangelogModalContext = createContext<ChangelogModalContextType | undefined>(undefined);

export const useChangelogModal = () => {
  const ctx = useContext(ChangelogModalContext);
  if (!ctx) throw new Error('useChangelogModal must be used within ChangelogModalProvider');
  return ctx;
};

export const ChangelogModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <ChangelogModalContext.Provider value={{ open, setOpen }}>
      {children}
      <ChangelogModal />
    </ChangelogModalContext.Provider>
  );
};

const ChangelogModal = () => {
  const { open, setOpen } = useChangelogModal();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags from the changelog data
  const allTags = Array.from(new Set(changelogData.flatMap(entry => entry.tags || [])));

  // Filter entries based on active tag
  const filteredEntries = activeTag
    ? changelogData.filter(entry => entry.tags?.includes(activeTag))
    : changelogData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <div
        className={`changelog-modal-backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        tabIndex={-1}
        aria-hidden={!open}
      />
      <div
        className={`changelog-modal${open ? ' open' : ''}`}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="changelog-modal-content">
          {/* Header with title and close button */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Release Notes
            </h2>
            <div className="relative group">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close changelog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <span className="absolute right-0 top-full mt-2 w-16 bg-gray-800 text-xs text-white text-center py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Ctrl + K
              </span>
            </div>
          </div>
          {/* Filter tags */}
          <div className="px-6 py-3 border-b bg-gray-50 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!activeTag ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm border'}`}
            >
              All Updates
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTag === tag ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm border'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Changelog entries */}
          <div className="px-6 py-4 space-y-12 overflow-y-auto">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="changelog-entry relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="version-tag">{entry.id.replace('cl-', '')}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.startDate)}
                    {entry.endDate && ` - ${formatDate(entry.endDate)}`}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{entry.title}</h3>
                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">{entry.description}</p>
                
                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {entry.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Image if available */}
                {entry.imageUrl && (
                  <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6 border">
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {/* Referenced feedback */}
                {entry.referencedFeedback && entry.referencedFeedback.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Based on user feedback:</h4>
                    {entry.referencedFeedback.map(feedback => (
                      <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                            {feedback.username.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{feedback.username}</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{feedback.content}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangelogModalProvider;
