export const getContractFiles = (attachments: any[]) => {
  let files = attachments.filter((attachment) => attachment.file_name.includes('contract_'))

  return files
}

export const getExtFile = (filename: string) => {
  const myArray = filename.split('.')
  return myArray[myArray.length - 1]
}
