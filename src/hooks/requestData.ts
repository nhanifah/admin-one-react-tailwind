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

export const useStudentClients = (progress: string) => {
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

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    updateData,
    deleteData,
    updateProgress,
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

export const useStudentPhyscotestAnswerClients = () => {
  const { data, error } = useSWR('/api/result', fetcher)

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
