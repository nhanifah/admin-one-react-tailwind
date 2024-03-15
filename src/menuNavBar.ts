import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiHelpCircle,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'
import { signOut } from 'next-auth/react'

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile/edit',
      },
      // {
      //   icon: mdiCogOutline,
      //   label: 'Settings',
      // },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
        onClick: () => {
          console.log('signing out')
          signOut({ callbackUrl: '/login' })
        },
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiHelpCircle,
    label: 'Help & Support',
    isDesktopNoLabel: true,
    href: 'https://youtu.be/8s1YEA7aG4s',
    target: '_blank',
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true,
    onClick: () => {
      console.log('signing out')
      signOut({ callbackUrl: '/login' })
    },
  },
]

export default menuNavBar
