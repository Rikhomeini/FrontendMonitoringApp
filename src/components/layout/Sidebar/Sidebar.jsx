import React from 'react';
import './Sidebar.css';

// Pastikan menggunakan export default
const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <h3>Machine List</h3>
      <ul>
        <li>Machine 1</li>
        <li>Machine 2</li>
        <li>Machine 3</li>
      </ul>
    </aside>
  );
};

export default Sidebar; // PASTIKAN INI export default