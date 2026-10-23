/**
 * Experience Data
 * Contains real career history and internship records.
 * Supports adding multiple positions with optional description, highlights, and skills.
 */

/**
 * Calculates dynamic duration between start date and end date (or current date if 'Present').
 * Formats as "X mos" or "Y yrs Z mos".
 *
 * @param {string} startDateStr - ISO date string (e.g. '2026-09-01')
 * @param {string} [endDateStr='Present'] - ISO date string or 'Present'
 * @returns {string} - Formatted duration string (e.g. '2 mos')
 */
export function calculateDuration(startDateStr, endDateStr = 'Present') {
  const start = new Date(startDateStr);
  const end = endDateStr === 'Present' ? new Date() : new Date(endDateStr);

  const years = end.getFullYear() - start.getFullYear();
  // Month is 0-indexed; +1 counts the starting month inclusively
  const months = end.getMonth() - start.getMonth() + 1;
  const totalMonths = years * 12 + months;

  if (totalMonths <= 0) return '1 mo';
  if (totalMonths < 12) return `${totalMonths} mos`;

  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} yr${y > 1 ? 's' : ''}`;
  return `${y} yr${y > 1 ? 's' : ''} ${m} mo${m > 1 ? 's' : ''}`;
}

export const EXPERIENCES = [
  {
    id: 'slt-mobitel',
    role: 'Intern Software Engineer',
    company: 'Sri Lanka Telecom (SLT-MOBITEL)',
    companyShort: 'SLT-MOBITEL',
    type: 'Internship',
    startDate: '2026-09-01',
    endDate: 'Present',
    periodText: 'Sep 2026 - Present',
    location: 'Colombo, Western Province, Sri Lanka',
    locationShort: 'Colombo, Sri Lanka',
    workMode: 'Hybrid',
    logo: '/logos/slt-mobitel.png',
    logoInitials: 'SLT',
    current: true,

    // Optional fields: left empty until provided.
    // The component will render nothing for these when empty.
    description: '',
    highlights: [],
    skills: [],
  },
];
