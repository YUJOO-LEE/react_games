import React from 'react';
import { createRoot } from 'react-dom/client';
import Minesweeper from './Minesweeper';

createRoot(document.querySelector('#root')).render(<Minesweeper />);