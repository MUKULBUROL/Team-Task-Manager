import React from 'react';

const ProjectMemberList = ({ members }) => {
  if (!members || members.length === 0) {
    return <div className="text-gray-500">No members found</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Members</h3>
      <ul className="list-disc pl-5">
        {members.map((member) => (
          <li key={member.id}>
            {member.user ? (member.user.name || member.user.email) : (member.userId || 'Unknown User')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectMemberList;