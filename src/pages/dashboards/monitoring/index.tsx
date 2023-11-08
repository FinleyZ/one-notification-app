import Head from 'next/head';

import ExtendedSidebarLayout from 'src/client/layouts/ExtendedSidebarLayout';
import { Authenticated } from 'src/client/components/Authenticated';

import DashboardMonitoringContent from 'src/client/content/DashboardPages/Monitoring';

function DashboardMonitoring() {
  return (
    <>
      <Head>
        <title>Monitoring Dashboard</title>
      </Head>
      <DashboardMonitoringContent />
    </>
  );
}

DashboardMonitoring.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardMonitoring;
