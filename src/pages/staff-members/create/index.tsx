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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createStaffMembers } from 'apiSdk/staff-members';
import { Error } from 'components/error';
import { StaffMembersInterface } from 'interfaces/staff-members';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function StaffMembersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StaffMembersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStaffMembers(values);
      resetForm();
      router.push('/staff-members');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StaffMembersInterface>({
    initialValues: {
      work_schedule: '',
      user_id: null,
      restaurant_id: null,
    },
    validationSchema: staffMembersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Staff Members
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="work_schedule" mb="4" isInvalid={!!formik.errors.work_schedule}>
            <FormLabel>Work Schedule</FormLabel>
            <Input
              type="text"
              name="work_schedule"
              value={formik.values.work_schedule}
              onChange={formik.handleChange}
            />
            {formik.errors.work_schedule && <FormErrorMessage>{formik.errors.work_schedule}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UsersInterface>
            formik={formik}
            name={'user_id'}
            label={'User'}
            placeholder={'Select Users'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />
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
      </Box>
    </AppLayout>
  );
}

export default StaffMembersCreatePage;
