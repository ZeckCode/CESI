import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParentDashboard from './ParentDashboard';
import Grades from './Grades';
import Ledgers from './Ledgers';
import Profile from './Profile';

const ParentWebsite = () => {
  return (
    <Routes>
      <Route path="/" element={<ParentDashboard />} />
      <Route path="dashboard" element={<ParentDashboard />} />
      <Route path="grades" element={<Grades />} />
      <Route path="ledger" element={<Ledgers />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<ParentDashboard />} />
    </Routes>
  );
};

export default ParentWebsite;
