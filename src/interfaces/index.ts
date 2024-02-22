export type UserPayloadObject = {
  name: string
  email: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed' | 'light'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Quest = {
  id: string
  type: string
  exam_id: string
  weight: number
  question_text: string
  option_text: string
  answer: string
  created_at: Date
  updated_at: Date
}

export type Student = {
  id: string
  full_name: string
  email: string
  nik: string
  province: string
  city: string
  subdistrict: string
  village: string
  address_detail: string
  batch_id: string
  interview_schedule: string
  dormitory: string
  installment: string
  referral_id?: string
  guardian_name: string
  guardian_phone: string
  progress: string
}

export type StudentSikotes = {
  id: string
  student_id: string
  students: Student
  total_points: number
  checked: string
  created_at: number
  updated_at: number
}

export type studentAnswer = {
  id: string
  exam_id: string
  type: string
  question_text: string
  option_text: string
  answer: string
  weight: number
  selected_option: string
  checked: boolean
  student_id: string
}

export type Students = {
  id: string
  full_name: string
  whatsapp_number: string
  email: string
  nik: string
  province: string
  city: string
  subdistrict: string
  village: string
  address_detail: string
  batch_id: string
  interview_schedule: string
  dormitory: string
  guardian_name: string
  guardian_phone: string
  progress: number
  created_at: Date
  updated_at: Date
  batch_registration: {
    id: string
    batch_name: string
  }
  master_referral: {
    id: string
    referral_name: string
  }
}

export type Client = {
  id: number
  avatar: string
  login: string
  name: string
  company: string
  city: string
  progress: number
  created: string
  created_mm_dd_yyyy: string
}

export type UserForm = {
  name: string
  email: string
}
