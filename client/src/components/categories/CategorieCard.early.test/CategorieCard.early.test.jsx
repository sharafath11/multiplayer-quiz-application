
// Unit tests for: CategorieCard

import React from 'react'
import CategorieCard from '../CategorieCard';


import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';


describe('CategorieCard() CategorieCard method', () => {
  // Happy Path Tests
  describe('Happy Path Tests', () => {
    test('renders the component with all categories', () => {
      // Render the component within a Router to handle Link components
      render(
        <Router>
          <CategorieCard />
        </Router>
      );

      // Check if the main heading is rendered
      expect(screen.getByText('Select Your Quiz Category')).toBeInTheDocument();

      // Check if all category names are rendered
      const categoryNames = [
        'JavaScript', 'React', 'Paython', 'MongoDB', 'Node.js', 'MERN Stack',
        'IT', 'DSA', 'TypeScript', 'SQL', 'Sports', 'General Knowledge',
        'Science', 'History', 'Music', 'Movies'
      ];

      categoryNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    test('renders category descriptions correctly', () => {
      render(
        <Router>
          <CategorieCard />
        </Router>
      );

      // Check if all category descriptions are rendered
      const categoryDescriptions = [
        'Test your knowledge about JavaScript and its features.',
        'Answer questions related to React, its components, and hooks.',
        'Answer questions related to Python,',
        'Challenge your understanding of MongoDB and NoSQL databases.',
        'Test your knowledge of Node.js and its asynchronous nature.',
        'Learn and challenge yourself on the MERN stack (MongoDB, Express, React, Node.js).',
        'General questions related to IT concepts and technologies.',
        'Test your understanding of data structures and algorithms.',
        'Learn and challenge yourself on TypeScript and its features.',
        'Test your knowledge of SQL and relational databases.',
        'Test your knowledge about various sports.',
        'Answer general knowledge questions from various fields.',
        'Explore questions about physics, chemistry, and biology.',
        'Challenge your history knowledge from different eras.',
        'How well do you know music and songs?',
        'Trivia questions about movies and actors.'
      ];

      categoryDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    test('renders "Start Quiz" button for each category', () => {
      render(
        <Router>
          <CategorieCard />
        </Router>
      );

      // Check if the "Start Quiz" button is rendered for each category
      const startQuizButtons = screen.getAllByText('Start Quiz');
      expect(startQuizButtons.length).toBe(16); // There are 16 categories
    });
  });

  // Edge Case Tests
  describe('Edge Case Tests', () => {
    test('handles empty categories array gracefully', () => {
      // Mock the categories array to be empty
      const originalCategories = CategorieCard.prototype.categories;
      CategorieCard.prototype.categories = [];

      render(
        <Router>
          <CategorieCard />
        </Router>
      );

      // Check if the component still renders the main heading
      expect(screen.getByText('Select Your Quiz Category')).toBeInTheDocument();

      // Check that no category cards are rendered
      expect(screen.queryByText('Start Quiz')).not.toBeInTheDocument();

      // Restore the original categories
      CategorieCard.prototype.categories = originalCategories;
    });

    test('handles incorrect category href gracefully', () => {
      // Mock a category with an incorrect href
      const originalCategories = CategorieCard.prototype.categories;
      CategorieCard.prototype.categories = [
        { name: 'Test', description: 'Test description', href: '/incorrect-path' }
      ];

      render(
        <Router>
          <CategorieCard />
        </Router>
      );

      // Check if the category with incorrect href is rendered
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();

      // Restore the original categories
      CategorieCard.prototype.categories = originalCategories;
    });
  });
});

// End of unit tests for: CategorieCard
