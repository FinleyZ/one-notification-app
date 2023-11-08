import { useState } from 'react';
import ExtendedSidebarLayout from 'src/client/layouts/ExtendedSidebarLayout';
import { Authenticated } from 'src/client/components/Authenticated';

import Head from 'next/head';
import PageHeader from 'src/client/content/Applications/Mailbox/create/PageHeader';
import {
  Box,
  Drawer,
  Grid,
  Hidden,
  useTheme,
  IconButton,
  styled
} from '@mui/material';
import Scrollbar from 'src/client/components/Scrollbar';

import Sidebar from 'src/client/content/Applications/Mailbox/create/Sidebar';

import GeneralSection from 'src/client/content/Applications/Mailbox/create/GeneralSection';
import SettingsIcon from '@mui/icons-material/Settings';

const DrawerWrapper = styled(Drawer)(
  ({ theme }) => `
    width: 400px;
    flex-shrink: 0;
    z-index: 3;

    & > .MuiPaper-root {
        width: 400px;
        height: calc(100% - ${theme.header.height});
        position: absolute;
        top: ${theme.header.height};
        right: 0;
        z-index: 3;
        background: ${theme.colors.alpha.white[10]};
    }
`
);

const DrawerWrapperMobile = styled(Drawer)(
  ({ theme }) => `
    width: 360px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 360px;
        z-index: 3;
        background: ${theme.colors.alpha.white[30]};
  }
`
);

const MainContentWrapper = styled(Box)(
  () => `
  flex-grow: 1;
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

function ManagementProductCreate() {
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Scrollbar>
      <Sidebar />
    </Scrollbar>
  );

  return (
    <>
      <Head>
        <title>Create Notification</title>
      </Head>
      <Box mb={3} display="flex">
        <MainContentWrapper>
          <Grid
            sx={{ px: 4 }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <PageHeader />
                <Hidden lgUp>
                  <IconButtonToggle
                    sx={{ ml: 2 }}
                    color="primary"
                    onClick={handleDrawerToggle}
                    size="small"
                  >
                    <SettingsIcon />
                  </IconButtonToggle>
                </Hidden>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <GeneralSection />
            </Grid>
          </Grid>
        </MainContentWrapper>
        <Hidden lgUp>
          <DrawerWrapperMobile
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            {sidebarContent}
          </DrawerWrapperMobile>
        </Hidden>
        <Hidden lgDown>
          <DrawerWrapper
            variant="permanent"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open
          >
            {sidebarContent}
          </DrawerWrapper>
        </Hidden>
      </Box>
    </>
  );
}

ManagementProductCreate.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default ManagementProductCreate;
