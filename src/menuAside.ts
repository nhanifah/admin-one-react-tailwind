import {
  // mdiAccountCircle,
  mdiMonitor,
  mdiUpload,
  // mdiGithub,
  // mdiLock,
  // mdiAlertCircle,
  mdiSquareEditOutline,
  // mdiTable,
  // mdiViewList,
  // mdiTelevisionGuide,
  // mdiResponsive,
  // mdiPalette,
  // mdiVuejs,
  mdiAccountBoxMultiple,
  mdiListBox,
  mdiAccountArrowUp,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Home',
  },
  {
    href: '/upload',
    icon: mdiUpload,
    label: 'Upload',
  },
  {
    label: 'Psikotes',
    icon: mdiSquareEditOutline,
    menu: [
      {
        label: 'Bank Soal',
        href: '/psikotes/questionBank',
      },
      {
        label: 'Jawaban Peserta',
        href: '/psikotes/userAnswer',
      },
    ],
  },
  {
    label: 'Batch',
    icon: mdiListBox,
    menu: [
      {
        label: 'Daftar Batch',
        href: '/batch/list',
      },
      {
        label: 'Interview',
        href: '/batch/interview',
      },
      {
        label: 'Daftar Calon Siswa',
        href: '/batch/student',
      },
    ],
  },
  {
    label: 'Peserta',
    icon: mdiAccountBoxMultiple,
    menu: [
      {
        label: 'Daftar Siswa',
        href: '/student/list',
      },
      {
        label: 'Kontrak Siswa',
        href: '/student/agreement',
      },
      {
        label: 'Cicilan Siswa',
        href: '/student/installment',
      },
      {
        label: 'Sanksi Siswa',
        href: '/student/penalty',
        disabled: true,
      },
    ],
  },
  {
    href: '/affiliate/list',
    label: 'Affiliate',
    icon: mdiAccountArrowUp,
  },
  // {
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   href: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   href: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   href: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   href: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   href: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'GitHub',
  //   icon: mdiGithub,
  //   target: '_blank',
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //   label: 'Vue version',
  //   icon: mdiVuejs,
  //   target: '_blank',
  // },
]

export default menuAside
