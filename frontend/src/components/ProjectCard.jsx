import React, { useState } from 'react';
import ProjectMemberList from './ProjectMemberList';
import AddMemberForm from './AddMemberForm';

const ProjectCard = ({ project, onAddMember }) => {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <span className="px-2 py-1 bg-gray-200 rounded text-sm">ID: {project.id}</span>
      </div>
      <p className="mt-2">{project.description}</p>
      <div className="mt-4">
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="text-blue-500 hover:underline"
        >
          {showMembers ? 'Hide Members' : 'Show Members'}
        </button>
        {showMembers && (
          <div className="mt-2">
            <ProjectMemberList members={project.members || []} />
            <AddMemberForm projectId={project.id} onAddMember={onAddMember} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;