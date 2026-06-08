export interface User {
  id: string;
  userId: string;
  name: string;
  role: UserRole;
  jobTitle: string;
  code: string;
  email: string;
}

export type UserRole = 'ADMIN' | 'DEPUTY_COUNSEL' | 'COORDINATOR' | 'JUDICIAL_ASSISTANT';

export interface Case {
  id: string;
  caseNo: string;
  caseNoPrefix: string;
  caseNoYear: string;
  caseTitle: string;
  referenceNo: string;
  dateOfReference: string;
  modeOfReference: 'Direct' | 'Court' | 'Other';
  referredBy: string;
  dateOfRegistration: string;
  typeOfArbitration: 'Domestic' | 'International';
  caseStatus: 'Pre-Hearing' | 'Under Hearing' | 'Award-Termination' | 'Other';
  statusChangeDate: string;
  arbitratorName: string;
  arbitralTribunalStrength: 'Sole' | '3' | '5';
  claimantName: string;
  respondentName: string;
  counsels: Counsel[];
  arbitrators: Arbitrator[];
  orders: CaseOrder[];
  noting: Noting[];
  createdAt: string;
  updatedAt: string;
}

export interface Counsel {
  id: string;
  name: string;
  email: string;
  contact: string;
  category: string;
}

export interface Arbitrator {
  id: string;
  name: string;
  category: string;
  email: string;
  contact: string;
  isEmpanelled: boolean;
}

export interface CaseOrder {
  id: string;
  caseId: string;
  orderDate: string;
  orderDetails: string;
  createdBy: string;
}

export interface Noting {
  id: string;
  caseId: string;
  notingDate: string;
  notingText: string;
  markedBy: string;
  markedTo: string;
  nextDate: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  caseNo: string;
  hearingDate: string;
  room: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Reminder {
  id: string;
  date: string;
  note: string;
  createdAt: string;
}

export interface DashboardStats {
  allottedCases: number;
  registeredCases: number;
  todaysHearings: number;
  pendingWork: number;
  totalRooms: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
