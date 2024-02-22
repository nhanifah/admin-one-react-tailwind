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

export const useStudentClients = () => {
  const { data, error } = useSWR('/api/student', fetcher)

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

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
    createData,
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

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
