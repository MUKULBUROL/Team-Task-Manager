import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

const ProjectList = ({ projects, error, loading }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMember = () => {
    // This will trigger a re-render to show updated members
    setRefreshKey(prev => prev + 1);
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage message={error} />;

  if (!projects || projects.length === 0) {
    return <EmptyState message="No projects found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onAddMember={handleAddMember} />
      ))}
    </div>
  );
};

export default ProjectList;