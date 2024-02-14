import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { mdiUpload, mdiGithub } from '@mdi/js'
import { Form, Formik } from 'formik'
import { S3 } from 'aws-sdk';
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import Divider from '../components/Divider'
import CardBox from '../components/CardBox'
// import FormField from '../components/Form/Field'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'

const s3 = new S3({
  endpoint: 'https://nos.jkt-1.neo.id',
  accessKeyId: '00aee5df47f9f22e4752',
  secretAccessKey: '8hDu/FKGYLS31YM7wq9sA4m3VTeM3uuoBdxxL7Ww',
  region: 'idn',
});

const FormsPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // Declare and initialize uploadedFile state
  const [loading, setLoading] = useState(false); // Declare and initialize loading state

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Head>
        <title>{getPageTitle('Cloud Storage')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiUpload} title="Uploading file to cloud" main>
          <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={{
              file: null,
            }}
            onSubmit={async () => {
              // set button to loading state
              setLoading(true);
              
              // check if file is exist
              if (!uploadedFile) {
                toast.error('Please select a file');
                setLoading(false);
                return;
              }
              toast.loading('Uploading file...');

              const file = uploadedFile;
            
              const uploadParams = {
                Bucket: 'lpk-harehare',
                Key: `${file.name}`,
                Body: file,
                ContentType: file.type,
              };
            
              try {
                const response = await s3.upload(uploadParams).promise();
                toast.dismiss();
                // Handle the response accordingly
                console.log('File uploaded successfully:', response);
                toast.success('File uploaded successfully', { duration: 3000 });
                setLoading(false);
                // redirect new tab to the uploaded file after 3 seconds
                setTimeout(() => {
                  window.open(`https://lpk-harehare.nos.jkt-1.neo.id/${file.name}`, '_blank');
                }, 3000);
              } catch (error) {
                // Handle errors
                setLoading(false);
                toast.dismiss();
                console.error('Error uploading file:', error);
                toast.error('Error uploading file');
              }
            }}
          >
            <Form>
              {/* <FormField> */}
                <div {...getRootProps()} className={`file-picker ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
                </div>
                {uploadedFile && <p>File selected: {uploadedFile.name}</p>}
              {/* </FormField> */}

              <Divider />

              <Buttons>
                {/* disable and add loading icon when uploading file */}
                <Button type="submit" label="Upload" color="info" disabled={loading} />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
