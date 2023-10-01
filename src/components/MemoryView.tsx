import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Memory } from '../models/Memory';

const MemoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4001/memories/${id}`)
      .then(response => response.json())
      .then(data => setMemory(data.memory));
  }, [id]);

  if (!memory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-7xl mt-10">
      {memory.image && (
        <div className="md:w-1/2 h-64 md:h-auto">
          <img src={memory.image} alt={`${memory.name}`} className="object-cover w-full h-full" />
        </div>
      )}
      <div className="p-8 md:w-1/2">
        <h2 className="text-xl font-bold mb-2">{memory.name}</h2>
        <p className="mb-4">{memory.description}</p>
        <p className="text-gray-500 text-sm">{new Date(memory.timestamp).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MemoryView;

