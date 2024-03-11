import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { fileTypeFromBuffer, fileTypeFromStream } from 'file-type'
import moment from 'moment/moment'

type S3Config = {
  region: any
  credentials: any
  endpoint: any
}

const config: S3Config = {
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
  endpoint: process.env.AWS_S3_ENDPOINT,
}

const client: any = new S3Client(config)

export const uploadFile = async (
  file: any,
  fileName: string | null | undefined,
  category: string,
  name: string | null | undefined = null
) => {
  try {
    // const buffer = Buffer.from(await file)
    const stream = require('fs').createReadStream(file.filepath)
    const fileType: any = await fileTypeFromStream(require('fs').createReadStream(file.filepath))
    const path = `${category}_${moment().format('DDMMYY')}_${fileName}.${fileType.ext}`
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: name ? name : path,
      Body: stream,
      ContentType: fileType.mime,
    }

    const command = new PutObjectCommand(params)
    await client.send(command)

    return {
      path: name ? name : path,
      url: `${process.env.AWS_S3_URL_ACCESS}${name ? name : path}`,
    }
  } catch (error) {
    console.log(error)
    return 'Failed Upload'
  }
}
