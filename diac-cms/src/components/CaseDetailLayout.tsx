import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CaseDetailLayoutProps {
  caseId: string;
  caseNo: string;
  caseTitle: string;
  children: ReactNode;
}

const topLinks = [
  { label: 'Allotted Case', path: '/allotted-case' },
  { label: 'Status of Pleadings', suffix: 'status-of-pleadings' },
  { label: 'Claimant & Respondent', suffix: 'claimant-respondent' },
  { label: 'Counsels', suffix: 'counsels' },
  { label: 'Arbitral Tribunal', suffix: 'arbitral-tribunals' },
  { label: 'Noting', suffix: 'noting' },
  { label: 'Fees Details', suffix: 'case-fee' },
  { label: 'Case Orders', suffix: 'case-orders' },
  { label: 'Termination', suffix: 'termination' },
  { label: 'Draft Letters', suffix: 'draft-letters' },
];

export default function CaseDetailLayout({ caseId, caseNo, caseTitle, children }: CaseDetailLayoutProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          {caseNo} ({caseTitle})
        </h1>
        <Link to="/allotted-case" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm flex items-center gap-2">
          ← Go Back
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {topLinks.map(link => (
          <Link
            key={link.label}
            to={link.suffix ? `/${link.suffix}/${caseId}` : (link.path || '#')}
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
