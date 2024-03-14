import React from 'react';

function TasksListColumn({ title }) {
    return (
        <div className="text-white items-center basis-1/3 m-5 text-center">
            <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-8 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h2 className="text-2xl border-2 rounded p-2 mx-0">{title}</h2>
                <div className="coluna" id="ToDo"></div>
            </div>
        </div>
    );
}

export default TasksListColumn;