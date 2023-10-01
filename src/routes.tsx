import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MemoryLane from './components/MemoriesList';
import MemoryForm from './components/MemoryForm';
import MemoryView from './components/MemoryView';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MemoryLane />} />
      <Route path="/create" element={<MemoryForm />} />
      <Route path="/edit/:id" element={<MemoryForm />} />
      <Route path="/:id" element={<MemoryView />} />
    </Routes>
  );
};

export default RoutesComponent;

