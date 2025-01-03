import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { snippetService, type Snippet } from '../services/snippetService';
import { SnippetCard } from '../components';
import {
  AnimatedPage,
  containerVariants,
  itemVariants,
} from '../components/AnimatedPage';
import { SEO } from '../components/SEO';

export function Home() {
  const [recentSnippets, setRecentSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const snippets = await snippetService.getAllSnippets();
        setRecentSnippets(snippets.slice(0, 6));
      } catch (error) {
        console.error("Error loading snippets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSnippets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-dark-300">Loading snippets...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="CodeCandy - Your Personal Code Snippet Manager"
        description="Save, organize, and share your code snippets with syntax highlighting, collections, and instant search. The modern way to manage your code snippets."
      />

      <AnimatedPage className="flex flex-col w-full p-4 md:p-6">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 mb-4 md:gap-8 md:flex-row md:items-center">
            <div className="w-full max-w-prose">
              <motion.h1
                variants={itemVariants}
                className="mb-2 text-2xl font-bold sm:text-3xl text-dark-100"
              >
                Welcome to CodeCandy
              </motion.h1>

              <motion.p variants={itemVariants} className="text-sm text-dark-300 sm:text-base">
                Your personal code snippet manager. Save, organize, and share
                your code snippets.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Link
                to="/create"
                className="flex items-center justify-center w-full px-4 py-2 text-white truncate rounded-md shadow-lg sm:w-auto bg-primary-500 hover:bg-primary-600 transition-smooth hover:shadow-xl"
                rel="noopener noreferrer"
              >
                <FiPlus className="mr-2" />
                New Snippet
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={containerVariants}>
          <div className="flex items-center justify-between mb-4">
            <motion.h2
              variants={itemVariants}
              className="text-xl font-semibold text-dark-200"
            >
              Recent Snippets
            </motion.h2>

            {recentSnippets.length > 0 && (
              <motion.div variants={itemVariants}>
                <Link
                  to="/search"
                  className="text-primary-400 hover:text-primary-300 transition-smooth"
                  rel="noopener noreferrer"
                >
                  View all snippets
                </Link>
              </motion.div>
            )}
          </div>

          {recentSnippets.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center w-full p-8 text-center border rounded-lg bg-dark-800 border-dark-700"
            >
              <p className="mb-4 text-dark-400">
                No snippets yet. Create your first snippet to get started!
              </p>

              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 text-white truncate rounded-md bg-primary-500 hover:bg-primary-600 transition-smooth"
                rel="noopener noreferrer"
              >
                <FiPlus className="mr-2" />
                Create Snippet
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {recentSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatedPage>
    </>
  );
}

export default Home;
