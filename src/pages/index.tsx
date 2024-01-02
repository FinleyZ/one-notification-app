// import { FC } from 'react';
// import Head from 'next/head';
// import styles from './Home.module.css';

// const Home: FC = () => {
//   const emailData = {
//     recipient: 'recipient@example.com',
//     subject: 'Email Subject',
//     content: 'Email body text',
//   };

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Email API Documentation</title>
//       </Head>
//       <h1 className={styles.title}>
//         One Notification: Email API Documentation
//       </h1>
//       <h2 className={styles.subtitle}>Endpoints</h2>

//       <section className={styles.endpoint}>
//         <h3>POST /email-api/send-email</h3>
//         <p>
//           Sends an email. This endpoint requires an API key to be provided in
//           the 'email-api-key' header.
//         </p>
//         <h4>Request Headers:</h4>
//         <pre className={styles.code}>{'email-api-key: your-api-key'}</pre>
//         <h4>Request Body:</h4>
//         <pre className={styles.code}>{JSON.stringify(emailData, null, 2)}</pre>
//       </section>

//       <section className={styles.endpoint}>
//         <h3>GET /email-api/emails/:id</h3>
//         <p>
//           Retrieves an email by its ID. This endpoint requires an API key to be
//           provided in the 'email-api-key' header.
//         </p>
//         <h4>Request Headers:</h4>
//         <pre className={styles.code}>{'email-api-key: your-api-key'}</pre>
//         <h4>Parameters:</h4>
//         <ul className={styles.parameters}>
//           <li>
//             <strong>id</strong>: The ID of the email to retrieve.
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default Home;

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
