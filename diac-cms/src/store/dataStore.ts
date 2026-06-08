import type { User, Case, Hearing, Reminder, DashboardStats, Notification } from '../types';

const STORAGE_KEYS = {
  USER: 'diac_user',
  CASES: 'diac_cases',
  HEARINGS: 'diac_hearings',
  REMINDERS: 'diac_reminders',
  NOTIFICATIONS: 'diac_notifications',
} as const;

// Default credentials
export const DEFAULT_CREDENTIALS = {
  userId: 'admin',
  password: 'admin123',
  name: 'Admin User',
  role: 'ADMIN' as const,
  jobTitle: 'System Administrator',
  code: 'ADM01',
  email: 'admin@diac.in',
};

// Seed data
const seedCases: Case[] = Array.from({ length: 50 }, (_, i) => {
  const num = 6086 + i;
  const month = String((i % 12) + 1).padStart(2, '0');
  const year = i < 12 ? '23' : i < 24 ? '24' : '25';
  const statuses: Case['caseStatus'][] = ['Pre-Hearing', 'Under Hearing', 'Award-Termination', 'Other'];
  const modes: Case['modeOfReference'][] = ['Direct', 'Court', 'Other'];
  const types: Case['typeOfArbitration'][] = ['Domestic', 'International'];
  const strengths: Case['arbitralTribunalStrength'][] = ['Sole', '3', '5'];

  return {
    id: `case-${i + 1}`,
    caseNo: String(num),
    caseNoPrefix: 'DIAC',
    caseNoYear: `${month}-${year}`,
    caseTitle: `Case ${num} - Claimant vs Respondent`,
    referenceNo: `REF/${num}/20${year}`,
    dateOfReference: `20${year}-${month}-${String((i % 28) + 1).padStart(2, '0')}`,
    modeOfReference: modes[i % 3],
    referredBy: i % 2 === 0 ? 'Justice Smith' : 'Justice Kumar',
    dateOfRegistration: `20${year}-${month}-${String((i % 28) + 1).padStart(2, '0')}`,
    typeOfArbitration: types[i % 2],
    caseStatus: statuses[i % 4],
    statusChangeDate: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    arbitratorName: ['Mr. Rajesh Gautam', 'Mr. Milan Goel', 'Ms. Priya Sharma', 'Dr. Amit Verma'][i % 4],
    arbitralTribunalStrength: strengths[i % 3],
    claimantName: `Claimant ${num}`,
    respondentName: `Respondent ${num}`,
    counsels: [],
    arbitrators: [],
    orders: [],
    noting: [],
    createdAt: new Date(2023, 0, 1).toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

const seedHearings: Hearing[] = [
  { id: 'h1', caseId: 'case-1', caseNo: 'DIAC/6086/01-23', hearingDate: new Date().toISOString().split('T')[0], room: 'Room 1', time: '10:00 AM', status: 'Scheduled' },
  { id: 'h2', caseId: 'case-2', caseNo: 'DIAC/6087/01-23', hearingDate: new Date().toISOString().split('T')[0], room: 'Room 2', time: '11:30 AM', status: 'Scheduled' },
  { id: 'h3', caseId: 'case-3', caseNo: 'DIAC/6088/02-23', hearingDate: new Date().toISOString().split('T')[0], room: 'Room 3', time: '2:00 PM', status: 'Scheduled' },
  { id: 'h4', caseId: 'case-4', caseNo: 'DIAC/6089/02-23', hearingDate: new Date().toISOString().split('T')[0], room: 'Room 1', time: '3:30 PM', status: 'Scheduled' },
  { id: 'h5', caseId: 'case-5', caseNo: 'DIAC/6090/03-23', hearingDate: new Date().toISOString().split('T')[0], room: 'Room 4', time: '4:00 PM', status: 'Scheduled' },
];

const seedReminders: Reminder[] = [
  { id: 'r1', date: new Date().toISOString().split('T')[0], note: 'Review case documents', createdAt: new Date().toISOString() },
];

const seedNotifications: Notification[] = [
  { id: 'n1', title: 'New Case Assigned', message: 'DIAC/12090/12-25 has been assigned to you', date: new Date().toISOString(), read: false },
  { id: 'n2', title: 'Hearing Scheduled', message: 'Hearing for DIAC/6086/01-23 at 10:00 AM', date: new Date().toISOString(), read: false },
];

function getStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function initializeData(): void {
  if (!localStorage.getItem(STORAGE_KEYS.CASES)) {
    setStorage(STORAGE_KEYS.CASES, seedCases);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HEARINGS)) {
    setStorage(STORAGE_KEYS.HEARINGS, seedHearings);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REMINDERS)) {
    setStorage(STORAGE_KEYS.REMINDERS, seedReminders);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setStorage(STORAGE_KEYS.NOTIFICATIONS, seedNotifications);
  }
}

export function login(userId: string, password: string): User | null {
  if (userId === DEFAULT_CREDENTIALS.userId && password === DEFAULT_CREDENTIALS.password) {
    const user: User = {
      id: '1',
      userId: DEFAULT_CREDENTIALS.userId,
      name: DEFAULT_CREDENTIALS.name,
      role: DEFAULT_CREDENTIALS.role,
      jobTitle: DEFAULT_CREDENTIALS.jobTitle,
      code: DEFAULT_CREDENTIALS.code,
      email: DEFAULT_CREDENTIALS.email,
    };
    setStorage(STORAGE_KEYS.USER, user);
    return user;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function getCurrentUser(): User | null {
  return getStorage<User | null>(STORAGE_KEYS.USER, null);
}

export function getCases(): Case[] {
  return getStorage<Case[]>(STORAGE_KEYS.CASES, []);
}

export function getCaseById(id: string): Case | undefined {
  return getCases().find(c => c.id === id);
}

export function addCase(caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>): Case {
  const cases = getCases();
  const newCase: Case = {
    ...caseData,
    id: `case-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cases.push(newCase);
  setStorage(STORAGE_KEYS.CASES, cases);
  return newCase;
}

export function updateCase(id: string, updates: Partial<Case>): Case | null {
  const cases = getCases();
  const index = cases.findIndex(c => c.id === id);
  if (index === -1) return null;
  cases[index] = { ...cases[index], ...updates, updatedAt: new Date().toISOString() };
  setStorage(STORAGE_KEYS.CASES, cases);
  return cases[index];
}

export function deleteCase(id: string): void {
  const cases = getCases().filter(c => c.id !== id);
  setStorage(STORAGE_KEYS.CASES, cases);
}

export function getHearings(): Hearing[] {
  return getStorage<Hearing[]>(STORAGE_KEYS.HEARINGS, []);
}

export function getTodaysHearings(): Hearing[] {
  const today = new Date().toISOString().split('T')[0];
  return getHearings().filter(h => h.hearingDate === today);
}

export function getReminders(): Reminder[] {
  return getStorage<Reminder[]>(STORAGE_KEYS.REMINDERS, []);
}

export function addReminder(reminder: Omit<Reminder, 'id' | 'createdAt'>): Reminder {
  const reminders = getReminders();
  const newReminder: Reminder = {
    ...reminder,
    id: `r-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  reminders.push(newReminder);
  setStorage(STORAGE_KEYS.REMINDERS, reminders);
  return newReminder;
}

export function deleteReminder(id: string): void {
  const reminders = getReminders().filter(r => r.id !== id);
  setStorage(STORAGE_KEYS.REMINDERS, reminders);
}

export function getNotifications(): Notification[] {
  return getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
}

export function getDashboardStats(): DashboardStats {
  const cases = getCases();
  const hearings = getTodaysHearings();
  const reminders = getReminders();

  return {
    allottedCases: cases.length,
    registeredCases: 12005 + cases.length,
    todaysHearings: hearings.length,
    pendingWork: reminders.length,
    totalRooms: 19,
  };
}
