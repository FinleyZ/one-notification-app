import type { ReactNode } from 'react';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CottageIcon from '@mui/icons-material/Cottage';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'General',
    items: [
      {
        name: 'Overview',
        link: '/dashboards/monitoring',
        icon: CottageIcon,
      },
      {
        name: 'Templates',
        icon: SupportTwoToneIcon,
        link: '/applications/mailbox',
      },
      {
        name: 'Automations',
        icon: PrecisionManufacturingIcon,
        link: '/',
      },
      {
        name: 'Integrations',
        icon: AutoAwesomeMotionIcon,
        link: '/',
      },
      {
        name: 'Logs',
        icon: BrandingWatermarkIcon,
        link: '/',
      },
    ],
  },
];

export default menuItems;
