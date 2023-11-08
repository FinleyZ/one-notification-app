import { Box, Grid, Typography, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import Link from 'src/client/components/Link';

const RootWrapper = styled(Box)(
  () => `
    flex: 1;
`
);

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <RootWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Send new notification
              </Typography>
              <Typography variant="subtitle2">
                Fill in the fields below to send a new notification with yor configuration.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            component={Link}
            startIcon={<ArrowBackTwoToneIcon />}
            href="/dashboards/monitoring"
            variant="contained"
          >
            {t('Go back to Overview')}
          </Button>
        </Grid>
      </Grid>
    </RootWrapper>
  );
}

export default PageHeader;
