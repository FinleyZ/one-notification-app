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
  Divider,
  FormControlLabel,
  Grid,
  Alert,
  Checkbox,
  CircularProgress,
  Typography,
  Zoom
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import type { Message } from 'src/client/models/message';
import { useDispatch } from 'src/client/store';
import { createEvent, updateEvent } from 'src/client/slices/calendar';
import { useTranslation } from 'react-i18next';

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
`
);

interface AddEditEventModalProps {
  message?: Message;
  onAddComplete?: () => void;
  onCancel?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  range?: { start: number; end: number };
}

const getInitialValues = (
  message?: Message,
  range?: { start: number; end: number }
) => {
  if (message) {
    return _.merge(
      {},
      {
        allDay: false,
        color: '',
        description: '',
        end: setHours(setMinutes(subDays(new Date(), 3), 30), 10),
        start: setHours(setMinutes(subDays(new Date(), 3), 60), 8),
        title: '',
        submit: null
      },
      message
    );
  }

  if (range) {
    return _.merge(
      {},
      {
        allDay: false,
        color: '',
        description: '',
        end: new Date(range.end),
        start: new Date(range.start),
        title: '',
        submit: null
      },
      message
    );
  }

  return {
    allDay: false,
    color: '',
    description: '',
    end: setHours(setMinutes(subDays(new Date(), 1), 35), 20),
    start: setHours(setMinutes(subDays(new Date(), 1), 25), 17),
    title: '',
    submit: null
  };
};

const MessageDrawer: FC<AddEditEventModalProps> = ({
  message,
  onAddComplete,
  onCancel,
  onEditComplete,
  range
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isCreating = !message;

  const { t }: { t: any } = useTranslation();

  return (
    <Formik
      initialValues={getInitialValues(message, range)}
      validationSchema={Yup.object().shape({
        allDay: Yup.bool(),
        description: Yup.string().max(5000),
        end: Yup.date().when(
          'start',
          (start: Date, schema: any) =>
            start &&
            schema.min(start, t('The end date should be after start date'))
        ),
        start: Yup.date(),
        title: Yup.string().max(255).required(t('The title field is required'))
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          const data = {
            allDay: values.allDay,
            description: values.description,
            end: values.end,
            start: values.start,
            title: values.title
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
              horizontal: 'center'
            },
            TransitionComponent: Zoom
          });

          if (isCreating) {
            onAddComplete();
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
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography variant="h4">
              Creating a new email message
            </Typography>
          </Box>
          <Divider />
          <Box px={3} py={2}>
{/* From OAuth: should have a OAuth button here and show email after OAuthed*/}

{/* To*/}
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label={"To"}
              name="title"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />

            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label={t('Subject')}
              name="title"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
{/* A message text box here */}
            <TextField
              error={Boolean(touched.description && errors.description)}
              fullWidth
              multiline
              minRows={3}
              helperText={touched.description && errors.description}
              // label={t('Message description')}
              label={t('Insert your message here...')}
              name="description"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              variant="outlined"
            />
{/* A schedule send checkbox here */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.allDay}
                  onChange={handleChange}
                  name="allDay"
                  color="primary"
                />
              }
              label={t('This message lasts all day')}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  value={values.start}
                  onChange={(date) => setFieldValue('start', date)}
                  label={t('Message start date')}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  value={values.end}
                  onChange={(date) => setFieldValue('end', date)}
                  label={t('Message end date')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      name="end"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {Boolean(touched.end && errors.end) && (
              <Alert
                sx={{
                  mt: 2,
                  mb: 1
                }}
                severity="error"
              >
                {errors.end}
              </Alert>
            )}
          </Box>
          <CardActionsWrapper
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2
            }}
          >
            <Box>
              <Button
                variant="outlined"
                sx={{
                  mr: 1
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
      )}
    </Formik>
  );
};

MessageDrawer.propTypes = {
  // @ts-ignore
  // message: PropTypes.object,
  // @ts-ignore
  // range: PropTypes.object,
  onAddComplete: PropTypes.func,
  onCancel: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func
};

MessageDrawer.defaultProps = {
  onAddComplete: () => {},
  onCancel: () => {},
  onDeleteComplete: () => {},
  onEditComplete: () => {}
};

export default MessageDrawer;
