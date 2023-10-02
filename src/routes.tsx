import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MemoryForm from './components/MemoryForm';
import MemoryView from './components/MemoryView';
import LaneForm from './components/LaneForm';
import LaneView from './components/LaneView';
import LaneList from './components/LaneList';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LaneList />} />
      <Route path="lane/:id/create" element={<MemoryForm />} />
      <Route path="lane/:id/memory/edit/:memoryid" element={<MemoryForm />} />
      <Route path="memory/:id" element={<MemoryView />} />

      <Route path="/lane/create" element={<LaneForm />} />
      <Route path="/lane/edit/:id" element={<LaneForm />} />
      <Route path="/lane/:id" element={<LaneView />} />
    </Routes>
  );
};

export default RoutesComponent;

