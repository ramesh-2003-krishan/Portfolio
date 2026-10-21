import { PERSONAL_INFO } from './personalInfo';

const addressBox = PERSONAL_INFO.infoBoxes?.find(
  (b) => b.label.toLowerCase() === 'address'
);

export const CONTACT_TILES = [
  {
    id: 'address',
    label: 'Address',
    value: addressBox ? addressBox.value : '56/1, Thalagalla, Nagollagama',
    iconType: 'address',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: PERSONAL_INFO.contactPhone || '0702913026',
    href: `tel:${PERSONAL_INFO.contactPhone || '0702913026'}`,
    iconType: 'phone',
  },
  {
    id: 'email',
    label: 'Email',
    value: PERSONAL_INFO.contactEmail || 'sudarshanakrishan@gmail.com',
    href: `mailto:${PERSONAL_INFO.contactEmail || 'sudarshanakrishan@gmail.com'}`,
    iconType: 'email',
  },
];

export const TOPIC_CHIPS = [
  'Full Stack',
  'UI/UX Design',
  'Data Analysis',
  'Game Dev',
  'Other',
];
