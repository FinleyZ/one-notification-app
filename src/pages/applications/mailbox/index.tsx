import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

import ExtendedSidebarLayout from 'src/client/layouts/ExtendedSidebarLayout';
import { Authenticated } from 'src/client/components/Authenticated';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/client/store';

import {
  Box,
  Grid,
  Divider,
  IconButton,
  styled,
  useTheme,
  Drawer
} from '@mui/material';
import { MailboxResults } from 'src/client/content/Applications/Mailbox/Results';
import { MailboxSingle } from 'src/client/content/Applications/Mailbox/Single';
import { MailboxSidebar } from 'src/client/content/Applications/Mailbox/Sidebar';
import { getTags, openSidebar, closeSidebar } from 'src/client/slices/mailbox';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import MessageDrawer from '@/content/Applications/Mailbox/MessageDrawer';


const MainContentWrapper = styled(Box)(
  ({ theme }) => `
  flex-grow: 1;
  min-height: 100%;
  background: ${theme.colors.alpha.white[100]};
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

const ApplicationsMailbox: NextPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const { tags, sidebarOpen } = useSelector((state) => state.mailbox);

  const pageRef = useRef<HTMLDivElement | null>(null);

  const mailId = router.query.mailId as string;
  const tag = router.query.tag as string;

  const [drawer, setDrawer] = useState<any>({
    isDrawerOpen: false,
    eId: undefined,
    range: undefined
  });

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const handleDrawerToggle = (): void => {
    if (sidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleMessageClick = (): void => {
    console.log('handleMessageClick');
    setDrawer({
      isDrawerOpen: true
    });
  };

  const closeDrawer = (): void => {
    setDrawer({
      isDrawerOpen: false
    });
  };

  // const eventChosen =
  //   drawer.eId && events.find((event) => event.id === drawer.eId);

  return (
    <>
      <Head>
        <title>Mailbox - Applications</title>
      </Head>
      <Box
        ref={pageRef}
        className="Mui-FixedWrapper"
        sx={{
          minHeight: `calc(100vh - ${theme.header.height} )`
        }}
        display="flex"
      >
        <MailboxSidebar
          tag={tag}
          onClose={handleCloseSidebar}
          handleMessageEvent={handleMessageClick}
          open={sidebarOpen}
          tags={tags}
        />
        <MainContentWrapper>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: { lg: 'none', xs: 'inline-block' }
              }}
            >
              <Box
                display="flex"
                p={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <IconButtonToggle
                  color="primary"
                  onClick={handleDrawerToggle}
                  size="small"
                >
                  <MenuTwoToneIcon />
                </IconButtonToggle>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box className="Mui-FixedWrapperContent">
                {mailId ? (
                  <MailboxSingle tag={tag} mailId={mailId} />
                ) : (
                  <MailboxResults
                    toggleSidebar={handleDrawerToggle}
                    tag={tag}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </MainContentWrapper>
      </Box>
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        onClose={closeDrawer}
        open={drawer.isDrawerOpen}
        elevation={9}
      >


        {/* {drawer.isDrawerOpen && (
          <MessageDrawer
            // event={eventChosen}
            onAddComplete={closeDrawer}
            onCancel={closeDrawer}
            onDeleteComplete={closeDrawer}
            onEditComplete={closeDrawer}
            range={drawer.range}
          />
        )} */}
      </Drawer>
    </>
  );
};

ApplicationsMailbox.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);



export default ApplicationsMailbox;
