import { FC } from 'react';
import Head from 'next/head';

const Home: FC = () => {
  const emailData = {
    recipient: 'recipient@example.com',
    subject: 'Email Subject',
    content: 'Email body text',
  };

  return (
    <div>
      <Head>
        <title>Email API Documentation</title>
      </Head>
      <h1>One Notification: Email API Documentation</h1>
      <h2>Endpoints</h2>

      <h3>POST /email-api/send-email</h3>
      <p>Sends an email.</p>
      <h4>Request Body:</h4>
      <pre>{JSON.stringify(emailData, null, 2)}</pre>

      <h3>GET /email-api/emails/:id</h3>
      <p>Retrieves an email by its ID.</p>
      <h4>Parameters:</h4>
      <ul>
        <li>
          <strong>id</strong>: The ID of the email to retrieve.
        </li>
      </ul>
    </div>
  );
};

export default Home;
