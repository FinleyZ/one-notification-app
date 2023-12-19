import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import Link from 'src/client/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`,
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`,
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`,
);

const ListItemWrapper = styled(Box)(
  () => `
    display: flex;
    align-items: center;
`,
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`,
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`,
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[50]
        : theme.colors.alpha.black[10]
    };
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`,
);

function Hero() {
  return (
    <Container maxWidth="lg">
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={6} pr={{ xs: 0, md: 3 }}>
          {/* i18n */}
          <LabelWrapper color="success">Beta 1.0</LabelWrapper>
          <TypographyH1
            sx={{
              mb: 2,
            }}
            variant="h1"
          >
            One Notefictation for all
          </TypographyH1>
          <TypographyH2
            sx={{
              lineHeight: 1.5,
              pb: 4,
            }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            An ongoing project simplifies email notification configuration and
            management. With an intuitive dashboard, developers can easily
            customize settings and trigger notifications using the powerful API
            or library. Monitor delivery status and track performance for
            seamless email communication.
          </TypographyH2>
          <Button
            component={Link}
            href="auth/login/cover?demo=true"
            size="large"
            variant="contained"
          >
            Login(demo)
          </Button>
          <ListItemWrapper sx={{ mt: 5, mb: 2 }}>
            <NextJsAvatar>
              <img src="/static/images/logo/next-js.svg" alt="NextJS" />
            </NextJsAvatar>
            <Typography variant="h6">
              <b>Built with Next.js </b>
              <Typography component="span" variant="subtitle2">
                - Next.js gives the best developer experience with all the
                features need for production.
              </Typography>
            </Typography>
          </ListItemWrapper>
          <ListItemWrapper sx={{ mt: 5, mb: 2 }}>
            <NextJsAvatar>
              <img src="/static/images/logo/nest-js.svg" alt="NestJS" />
            </NextJsAvatar>
            <Typography variant="h6">
              <b>Built with Nest.js </b>
              <Typography component="span" variant="subtitle2">
                - Nest.js leverages a powerful and structured framework for
                building scalable server-side applications.
              </Typography>
            </Typography>
          </ListItemWrapper>
          <ListItemWrapper
            sx={{
              mt: 5,
              mb: 2,
            }}
          >
            <MuiAvatar>
              <img
                src="/static/images/logo/material-ui.svg"
                alt="MUI (Material-UI)"
              />
            </MuiAvatar>
            <Typography variant="h6">
              <b>Powered by MUI (Material-UI)</b>
              <Typography component="span" variant="subtitle2">
                - A simple and customizable component library to build faster,
                beautiful, and accessible React apps.
              </Typography>
            </Typography>
          </ListItemWrapper>
          <ListItemWrapper>
            <TsAvatar>
              <img src="/static/images/logo/typescript.svg" alt="Typescript" />
            </TsAvatar>
            <Typography variant="h6">
              <b>Built with Typescript</b>
              <Typography component="span" variant="subtitle2">
                - Features a modern technology stack and is built with React +
                Typescript.
              </Typography>
            </Typography>
          </ListItemWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
