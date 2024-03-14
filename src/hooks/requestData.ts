import axios from 'axios'
import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useBankQuestionClients = () => {
  const { data, error } = useSWR('/api/questionBank', fetcher)

  const createData = async (data: object) => {
    try {
      const response = await axios.post('/api/questionBank', data)
      mutate('/api/questionBank')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi kesalahan',
      }
    }
  }

  const updateData = async (data: object) => {
    try {
      const response = await axios.put('/api/questionBank', data)
      mutate('/api/questionBank')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete('/api/questionBank', { data: { id: id } })
      mutate('/api/questionBank')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error?.response?.data ?? 'Terjadi kesalahan',
      }
    }
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    createData,
    updateData,
    deleteData,
  }
}

export const useBatchInterviewClients = () => {
  const { data, error } = useSWR('/api/batch/interview', fetcher)

  const updateStudentsSchedule = async (data: object) => {
    try {
      const response = await axios.put('/api/batch/interview/studentsSchedules', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    updateStudentsSchedule,
  }
}

export const useMasterRoleClients = () => {
  const { data, error } = useSWR('/api/role', fetcher)

  const updateStudentsSchedule = async (data: object) => {
    try {
      const response = await axios.put('/api/batch/interview/studentsSchedules', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    updateStudentsSchedule,
  }
}

export const useUserManagerClients = () => {
  const { data, error } = useSWR('/api/user', fetcher)

  const updateUserManager = async (data: object) => {
    try {
      const response = await axios.put('/api/user', data)
      mutate('/api/user')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const createUserManager = async (data: object) => {
    try {
      const response = await axios.post('/api/user', data)
      mutate('/api/user')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi kesalahan',
      }
    }
  }

  const deleteUserManager = async (id: string) => {
    try {
      const response = await axios.delete('/api/user', { data: { id: id } })
      mutate('/api/user')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error?.response?.data ?? 'Terjadi kesalahan',
      }
    }
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    updateUserManager,
    createUserManager,
    deleteUserManager,
  }
}

export const useStudentClients = (progress: string = 'success') => {
  const { data, error } = useSWR(`/api/student/${progress}`, fetcher)

  const updateData = async (data: object) => {
    try {
      const response = await axios.put('/api/student', data)
      mutate('/api/student')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  const uploadContractFile = async (data: any) => {
    try {
      const response = await axios.post('/api/student/uploadContract', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      mutate('/api/student/contract')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  const uploadTranskripFile = async (data: any) => {
    try {
      const response = await axios.post('/api/student/uploadTranskrip', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      mutate('/api/student/dataSiswa')
      mutate('/api/student/registering')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  const updateProgress = async (data: object) => {
    try {
      const response = await axios.put('/api/student/progress', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete('/api/student', { data: { id: id } })
      mutate('/api/student')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error?.response?.data ?? 'Terjadi kesalahan',
      }
    }
  }

  const postFile = async (formData: FormData) => {
    const res = await fetch('/api/student/upload', {
      method: 'POST',
      body: formData,
    })
    mutate(`/api/student/${progress}`)
    return res.json()
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    updateData,
    deleteData,
    updateProgress,
    uploadContractFile,
    uploadTranskripFile,
    postFile,
  }
}

export const useInstallmentClients = () => {
  const handlePay = async (installmentId: string) => {
    try {
      const response = await axios.put(`/api/installments/${installmentId}`)
      mutate('/api/student/dataSiswa')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  return {
    handlePay,
  }
}

export const useAffiliateClients = () => {
  const { data, error } = useSWR(`/api/affiliate`, fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useBatchClients = () => {
  const { data, error } = useSWR('/api/batch', fetcher)

  const createData = async (batch) => {
    const response = await axios.post('/api/batch', batch)
    mutate('/api/batch')
    return {
      status: response.status,
      data: response.data,
    }
  }

  const editData = async (id: string, data: any) => {
    try {
      const response = await axios.put(`/api/batch/${id}`, data)
      mutate('/api/batch')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const getBatchStudents = async (id: string) => {
    // const response = await axios.get(`api/batch/${id}`){
    const response = await axios.get(`/api/batch/${id}`)
    return response

    // }
  }
  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    createData,
    getBatchStudents,
    editData,
  }
}

export const useBatchStudentsClients = (id: string) => {
  const { data, error } = useSWR(`/api/batch/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  })

  return {
    clients: data?.data[0] ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useStudentPhyscotestAnswerClients = (checked: string = 'no') => {
  const { data, error } = useSWR(`/api/result?checked=${checked}`, fetcher)

  const getAnswerByStudent = async (id: string) => {
    const response = await axios.get(`/api/answer/${id}`)
    return {
      status: response.status,
      data: response.data,
    }
  }

  const createResult = async (studentAnswer) => {
    const response = await axios.put('/api/result', studentAnswer)
    mutate('/api/result')
    try {
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error.response.data)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi kesalahan',
      }
    }
  }

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    getAnswerByStudent,
    createResult,
  }
}

export const useSampleClients = () => {
  const { data, error } = useSWR('/data-sources/clients.json', fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useInterviewScheduleClients = () => {
  const createInterview = async (data) => {
    try {
      const response = await axios.post('/api/interview', data)
      mutate('/api/batch/interview')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const getInterviewById = async (id: any) => {
    try {
      const response = await axios.get(`/api/interview/${id}`)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const editInterview = async (id: string, data: any) => {
    try {
      const response = await axios.put(`/api/interview/${id}`, data)
      mutate('/api/batch/interview')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  return {
    createInterview,
    editInterview,
    getInterviewById,
  }
}

export const useInterviewScheduleByIdClients = (id: any) => {
  const { data, error } = useSWR(`/api/interview/${id}`, fetcher)

  return {
    interviewSchedule: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useAdminClients = () => {
  const updateData = async (data: any) => {
    try {
      const response = await axios.put('/api/admin', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const updatePassword = async (data: any) => {
    try {
      const response = await axios.put('/api/admin/password', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  return {
    updateData,
    updatePassword,
  }
}

export const usePunishmentClients = () => {
  const addPunishment = async (data: any) => {
    try {
      const response = await axios.post('/api/student/punishment', data)
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }
  }

  const uploadPunishmentAttachment = async (data: any) => {
    try {
      const response = await axios.post('/api/student/punishment/attachment', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      mutate('/api/student/punishments')
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      console.log(error)
      return {
        status: error.response.status,
        data: error.response.data ?? 'Terjadi Kesalahan',
      }
    }
  }

  return {
    addPunishment,
    uploadPunishmentAttachment,
  }
}
