import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled,
} from '@mui/material';
import Head from 'next/head';
import { useAuth } from 'src/client/hooks/useAuth';
import { Guest } from 'src/client/components/Guest';
import { LoginAuth0 } from 'src/client/content/Auth/Login/LoginAuth0';
import { LoginFirebaseAuth } from 'src/client/content/Auth/Login/LoginFirebaseAuth';
import { LoginJWT } from 'src/client/content/Auth/Login/LoginJWT';
import { LoginAmplify } from 'src/client/content/Auth/Login/LoginAmplify';

import Logo from 'src/client/components/LogoSign';
import BaseLayout from 'src/client/layouts/BaseLayout';
import Link from 'src/client/components/Link';
import { useRouter } from 'next/router';

const icons = {
  Auth0: '/static/images/logo/auth0.svg',
  FirebaseAuth: '/static/images/logo/firebase.svg',
  JWT: '/static/images/logo/jwt.svg',
  Amplify: '/static/images/logo/amplify.svg',
};

const CardImg = styled(Card)(
  ({ theme }) => `
    width: 90px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: ${theme.colors.alpha.white[100]};
    margin: 0 ${theme.spacing(1)};
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['all'])};

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`,
);

const BottomWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
`,
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`,
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`,
);

function LoginBasic() {
  const { method } = useAuth() as any;
  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title>Login - Basic</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Logo />
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  {'Sign in'}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  {'Fill in the fields below to sign into your account.'}
                </Typography>
              </Box>
              {method === 'Auth0' && <LoginAuth0 />}
              {method === 'FirebaseAuth' && <LoginFirebaseAuth />}
              {method === 'JWT' && <LoginJWT />}
              {method === 'Amplify' && <LoginAmplify />}
              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  'Don’t have an account, yet?'
                </Typography>{' '}
                <Link
                  href={
                    demo
                      ? `/auth/register/basic?demo=${demo}`
                      : '/auth/register/basic'
                  }
                >
                  <b>Sign up here</b>
                </Link>
              </Box>
              {method !== 'Auth0' && (
                <Tooltip
                  title={'Used only for the live preview demonstration !'}
                >
                  <Alert severity="warning">
                    Use <b>demo@example.com</b> and password <b>TokyoPass1@</b>
                  </Alert>
                </Tooltip>
              )}
            </Card>
            <BottomWrapper>
              <Tooltip arrow placement="top" title="Auth0">
                <CardImg>
                  <img height={50} alt="Auth0" src={icons['Auth0']} />
                </CardImg>
              </Tooltip>
              <Tooltip arrow placement="top" title="Firebase">
                <CardImg>
                  <img height={50} alt="Firebase" src={icons['FirebaseAuth']} />
                </CardImg>
              </Tooltip>
              <Tooltip arrow placement="top" title="JSON Web Token">
                <CardImg>
                  <img height={50} alt="JSON Web Token" src={icons['JWT']} />
                </CardImg>
              </Tooltip>
              <Tooltip arrow placement="top" title="Amplify">
                <CardImg>
                  <img height={50} alt="Amplify" src={icons['Amplify']} />
                </CardImg>
              </Tooltip>
            </BottomWrapper>

            <Alert severity="error">
              'Learn how to switch between auth methods by reading the section
              we’ve prepared in the documentation.'
            </Alert>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

LoginBasic.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default LoginBasic;
