import React, { useState, useEffect, useContext } from 'react';
import { projectService } from '../services/projectService';
import { AuthContext } from '../contexts/AuthContext';
import ProjectList from '../components/ProjectList';
import CreateProjectForm from '../components/CreateProjectForm';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load projects');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {user && user.role === 'ADMIN' && (
        <div className="mb-6">
          <CreateProjectForm onProjectCreated={fetchProjects} />
        </div>
      )}

      <ProjectList projects={projects} error={error} loading={loading} onProjectUpdated={fetchProjects} />
    </div>
  );
};

export default Projects;