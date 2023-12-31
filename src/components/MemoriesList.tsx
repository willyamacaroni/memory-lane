import React, { useEffect, useState, useRef } from 'react';
import { Memory } from '../models/Memory';
import { Link } from 'react-router-dom';

interface MemoriesListProps {
  memories: Memory[];  // Define a prop for the memories data
}

const MemoriesList: React.FC<MemoriesListProps> = ({ memories: initialMemories }) => {  // Update the component definition to accept the memories prop
  const [memories, setMemories] = useState<Memory[]>(initialMemories);  // Use a local state for the sorted/updated list of memories
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [sortField] = useState<'name' | 'timestamp'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const toggleDropdown = (id: number) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(null);  // close dropdown if click is outside
    }
  };

  const handleShare = async (memoryId: number) => {
    const url = `${window.location.origin}/${memoryId}`;
    await navigator.clipboard.writeText(url);
    setShowDropdown(null)
  };

  const handleSortClick = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedMemories = [...memories].sort((a, b) => {
      if (sortField === 'name') {
        return newDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return newDirection === 'asc'
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    setMemories(sortedMemories);
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  useEffect(() => {
    setMemories(initialMemories);

    // Attach outside click listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Detach outside click listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [initialMemories]);

  if (!memories.length) {
    return <div></div>;
  }

  return (
    <div className="py-4" ref={dropdownRef}>
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSortClick}
      >
        Sort by {sortField} ({sortDirection})
      </button>
      <button onClick={toggleLayout} className="mx-4 bg-blue-500 text-white py-2 px-4 rounded mr-4">
        Toggle Layout
      </button>
      {isGridLayout ? (
        <div className=" gap-4">
          {memories.map((memory) => (
            <div key={memory.id} className="relative flex items-center justify-between mb-4 bg-white p-4 rounded shadow">
              {memory.image && (
                <div className="flex-shrink-0 mr-4">
                  <img src={memory.image} alt={`${memory.name}`} className="w-12 h-12 rounded-full" />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">{memory.name}</h2>
                <p className="mb-2">{memory.description}</p>
                <p className="text-gray-500 text-sm">{new Date(memory.timestamp).toLocaleDateString()}</p>
              </div>
              <button className="text-xl" onClick={() => toggleDropdown(memory.id)}>
                &#8942;  {/* Hamburger icon */}
              </button>
              {showDropdown === memory.id && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to={`/memory/${memory.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Details
                    </Link>
                    <Link
                      to={`/lane/${memory.lane_id}/memory/edit/${memory.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleShare(memory.id)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Copy link to clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {memories.map((memory) => (
              <div key={memory.id} className="bg-white p-4 rounded-lg shadow-lg">
                <div className="mt-4 relative">
                  <button className="text-xl" onClick={() => toggleDropdown(memory.id)}>
                    &#8942;  {/* Hamburger icon */}
                  </button>
                  {showDropdown === memory.id && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to={`/memories/${memory.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Details
                        </Link>
                        <Link
                          to={`list/${memory.lane_id}/memories/edit/${memory.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleShare(memory.id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Copy link to clipboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mb-4">
                  <img src={memory.image} alt={`${memory.name}`} className="w-32 h-32 object-cover rounded-lg" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">{memory.name}</h2>
                  <p className="mb-2">{memory.description}</p>
                  <p className="text-gray-500 text-sm">{new Date(memory.timestamp).toLocaleDateString()}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoriesList;

