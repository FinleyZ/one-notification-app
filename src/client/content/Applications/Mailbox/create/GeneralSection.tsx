import type { FC } from 'react';
import PropTypes from 'prop-types';
import { setHours, setMinutes, subDays } from 'date-fns';
import _ from 'lodash';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import {
  styled,
  Box,
  Card,
  TextField,
  Button,
  FormControlLabel,
  Grid,
  Alert,
  Checkbox,
  CircularProgress,
  Zoom,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import type { Message } from 'src/client/models/message';
import { useDispatch } from 'src/client/store';
import { createEvent, updateEvent } from 'src/client/slices/calendar';
import { useTranslation } from 'react-i18next';
import { validate } from 'numeral';

// const IconButtonError = styled(IconButton)(
//   ({ theme }) => `
//      background: ${theme.colors.error.lighter};
//      color: ${theme.colors.error.main};

//      &:hover {
//       background: ${lighten(theme.colors.error.lighter, 0.4)};
//      }
// `
// );

const CardActionsWrapper = styled(Card)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
     margin: 0 ${theme.spacing(3)};
`,
);

interface AddEditEventModalProps {
  message?: Message;
  onSendComplete?: () => void;
  onCancel?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  // schedule?: number;
}

const getInitialValues = (message?: Message) => {
  if (message) {
    // return _.merge({}, message);
  }

  return {
    email: '',
    to: '',
    subject: '',
    message: '',
    schedule: setHours(setMinutes(subDays(new Date(), 1), 25), 17),
    submit: null,
  };
};

const MessageDrawer: FC<AddEditEventModalProps> = ({
  message,
  onSendComplete,
  onCancel,
  onEditComplete,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isCreating = !message;

  const { t }: { t: any } = useTranslation();

  return (
    <Formik
      initialValues={getInitialValues(message)}
      validationSchema={Yup.object().shape({
        to: Yup.string().email().required(t('The title field is required')),
        subject: Yup.string()
          .max(255)
          .required(t('The subject field is required')),
        message: Yup.string()
          .max(5000)
          .required('The message field is required'),
        // todo: check schedule validate not before current time
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting },
      ) => {
        try {
          const data = {
            email: values.email,
            to: values.to,
            subject: values.subject,
            message: values.message,
            schedule: values.schedule,
          };

          if (message) {
            dispatch(updateEvent(message.id, data));
          } else {
            dispatch(createEvent(data));
          }

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(t('The calendar has been successfully updated!'), {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            TransitionComponent: Zoom,
          });

          if (isCreating) {
            onSendComplete();
          } else {
            onEditComplete();
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values,
      }) => (
        <Card
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box>
              {/* From OAuth: should have a OAuth button/email selection here and show email after OAuthed*/}
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="email_account">
                  Authenticated email
                </InputLabel>
                <Select
                  native
                  fullWidth
                  label="Authenticated email"
                  inputProps={{
                    name: 'email_account',
                  }}
                  // onChange={handleChange}
                >
                  <option aria-label="None" value="" />
                  <option value={1}> Authenticated email</option>
                </Select>
              </FormControl>

              {/* To*/}
              <TextField
                error={Boolean(touched.to && errors.to)}
                fullWidth
                helperText={touched.to && errors.to}
                label={'To'}
                name="title"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.to}
                variant="outlined"
              />
              {/* Subject*/}
              <TextField
                error={Boolean(touched.subject && errors.subject)}
                fullWidth
                helperText={touched.subject && errors.subject}
                label={t('Subject')}
                name="title"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subject}
                variant="outlined"
              />
              {/* A message text box here */}
              <TextField
                error={Boolean(touched.message && errors.message)}
                fullWidth
                multiline
                minRows={3}
                helperText={touched.message && errors.message}
                label={t('Insert your message here...')}
                name="description"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                variant="outlined"
              />
              {/* A schedule send checkbox here */}
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="allDay"
                    color="primary"
                  />
                }
                label="Schedule send"
              />

              {/* <DateTimePicker
              value={values.schedule}
              onChange={(date) => setFieldValue('schedule', date)}
              label={t('Message schedule send time')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  name="start"
                />
              )}
            />

            {Boolean(touched.schedule) && (
              <Alert
                sx={{
                  mt: 2,
                  mb: 1
                }}
                severity="error"
              >
                {errors.schedule}
              </Alert>
            )} */}
            </Box>
            <CardActionsWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
              }}
            >
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    mr: 1,
                  }}
                  color="secondary"
                  onClick={onCancel}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  color="primary"
                >
                  {/* Schedule send or Send*/}
                  {/* {isCreating ? t('Add meeting') : t('Save modifications')} */}
                  Send
                </Button>
              </Box>
            </CardActionsWrapper>
          </form>
        </Card>
      )}
    </Formik>
  );
};

MessageDrawer.propTypes = {
  // @ts-ignore
  // message: PropTypes.object,
  // @ts-ignore
  // range: PropTypes.object,
  onSendComplete: PropTypes.func,
  onCancel: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func,
};

MessageDrawer.defaultProps = {
  onSendComplete: () => {},
  onCancel: () => {},
  onDeleteComplete: () => {},
  onEditComplete: () => {},
};

export default MessageDrawer;
