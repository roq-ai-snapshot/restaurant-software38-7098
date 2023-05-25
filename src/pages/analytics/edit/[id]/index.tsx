import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getAnalyticsById, updateAnalyticsById } from 'apiSdk/analytics';
import { Error } from 'components/error';
import { analyticsValidationSchema } from 'validationSchema/analytics';
import { AnalyticsInterface } from 'interfaces/analytics';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getRestaurants } from 'apiSdk/restaurants';

function AnalyticsEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AnalyticsInterface>(() => `/analytics/${id}`, getAnalyticsById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnalyticsInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnalyticsById(id, values);
      mutate(updated);
      resetForm();
      router.push('/analytics');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AnalyticsInterface>({
    initialValues: data,
    validationSchema: analyticsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Analytics
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="report_type" mb="4" isInvalid={!!formik.errors.report_type}>
              <FormLabel>Report Type</FormLabel>
              <Input type="text" name="report_type" value={formik.values.report_type} onChange={formik.handleChange} />
              {formik.errors.report_type && <FormErrorMessage>{formik.errors.report_type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="data" mb="4" isInvalid={!!formik.errors.data}>
              <FormLabel>Data</FormLabel>
              <Input type="text" name="data" value={formik.values.data} onChange={formik.handleChange} />
              {formik.errors.data && <FormErrorMessage>{formik.errors.data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default AnalyticsEditPage;
