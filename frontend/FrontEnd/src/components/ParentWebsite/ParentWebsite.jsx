import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Grades from './Grades';
import Ledgers from './Ledgers';
import Profile from './Profile';

const ParentWebsite = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="grades" element={<Grades />} />
      <Route path="ledger" element={<Ledgers />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default ParentWebsite;
