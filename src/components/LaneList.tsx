import React, { useEffect, useState, useRef } from 'react';
import { Lane } from '../models/Lane';
import { Link } from 'react-router-dom';

const LaneList: React.FC = () => {
  const [lanes, setLanes] = useState<Lane[]>([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [sortField] = useState<'name'>('name');
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

    const sortedLanes = [...lanes].sort((a, b) => {
      return newDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setLanes(sortedLanes);
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  useEffect(() => {
    // Fetch memories from your API
    fetch('http://localhost:4001/lanes')
      .then(response => response.json())
      .then(data => setLanes(data.lanes));

    // Attach outside click listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Detach outside click listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-8" ref={dropdownRef}>
      <h1 className='text-6xl py-8'> Lanes </h1>
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
          {lanes.map((lane) => (
            <div key={lane.id} className="relative flex items-center justify-between mb-4 bg-white p-4 rounded shadow">
              {lane.image && (
                <div className="flex-shrink-0 mr-4">
                  <img src={lane.image} alt={`${lane.name}`} className="w-12 h-12 rounded-full" />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">{lane.name}</h2>
                <p className="mb-2">{lane.description}</p>
              </div>
              <button className="text-xl" onClick={() => toggleDropdown(lane.id)}>
                &#8942;  {/* Hamburger icon */}
              </button>
              {showDropdown === lane.id && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to={`lane/${lane.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Details
                    </Link>
                    <Link
                      to={`lane/edit/${lane.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleShare(lane.id)}
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

            {lanes.map((lane) => (
              <div key={lane.id} className="bg-white p-4 rounded-lg shadow-lg">
                <div className="mt-4 relative">
                  <button className="text-xl" onClick={() => toggleDropdown(lane.id)}>
                    &#8942;  {/* Hamburger icon */}
                  </button>
                  {showDropdown === lane.id && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to={`lane/${lane.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Details
                        </Link>
                        <Link
                          to={`lane/edit/${lane.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleShare(lane.id)}
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
                  <img src={lane.image} alt={`${lane.name}`} className="w-32 h-32 object-cover rounded-lg" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">{lane.name}</h2>
                  <p className="mb-2">{lane.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LaneList;

