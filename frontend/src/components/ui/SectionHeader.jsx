import React from 'react';

export const SectionHeader = ({ eyebrow, title, description, rightElement }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-mono font-black tracking-widest text-cyan-400 uppercase mb-1">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="text-xl font-extrabold tracking-tight text-slate-100">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default SectionHeader;
