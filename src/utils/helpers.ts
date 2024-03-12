export const getContractFiles = (attachments: any[]) => {
  let files = attachments.filter((attachment) => attachment.file_name.includes('contract_'))

  return files
}

export const getExtFile = (filename: string) => {
  const myArray = filename.split('.')
  return myArray[myArray.length - 1]
}

export const getTranskripFiles = (attachments: any[]) => {
  let files = attachments.filter((attachment) => attachment.file_name.includes('transkrip_'))

  return files
}

export const getPunishmentFiles = (attachments: any[]) => {
  let files = attachments.filter(
    (attachment) =>
      attachment.file_name.includes('suspension_') ||
      attachment.file_name.includes('warning_') ||
      attachment.file_name.includes('expulsion_') ||
      attachment.file_name.includes('other_')
  )

  return files
}
