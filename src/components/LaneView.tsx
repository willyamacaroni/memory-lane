import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Lane } from '../models/Lane'
import MemoriesList from './MemoriesList';
import { Memory } from '../models/Memory';

const LaneView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lane, setLane] = useState<Lane | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4001/lanes/${id}`)
      .then(response => response.json())
      .then(data => setLane(data.lane));

    // Fetch memories associated with the lane
    fetch(`http://127.0.0.1:4001/lanes/${id}/memories`)
      .then(response => response.json())
      .then(data => {
        if (!data.memories) {
          setMemories([]);
        } else if (Array.isArray(data.memories)) {
          setMemories(data.memories);
        } else {
          setMemories([data.memories]);
        }
      });
  }, [id]);

  if (!lane) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden mx-auto max-w-7xl mt-10">
        {lane.image && (
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={lane.image} alt={`${lane.name}`} className="object-cover w-full h-full" />
          </div>
        )}
        <div className="p-8 md:w-1/2">
          <h2 className="text-xl font-bold mb-2">{lane.name}</h2>
          <p className="mb-4">{lane.description}</p>
        </div>
      </div>
      <div>
        <Link to={`/lane/${lane.id}/create`} className="text-white">
          <button className='my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            New memory
          </button>
        </Link>
      </div>
      <div>
        <MemoriesList memories={memories || []} />
      </div>
    </div>
  );
};

export default LaneView;

