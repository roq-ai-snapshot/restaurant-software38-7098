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
import { createOrders } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrdersInterface } from 'interfaces/orders';
import { ordersValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getMenuItems } from 'apiSdk/menu-items';
import { MenuItemsInterface } from 'interfaces/menu-items';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrdersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrders(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: {
      order_status: '',
      special_instructions: '',
      payment_method: '',
      customer_id: null,
      restaurant_id: null,
      order_items: [],
    },
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="order_status" mb="4" isInvalid={!!formik.errors.order_status}>
            <FormLabel>Order Status</FormLabel>
            <Input type="text" name="order_status" value={formik.values.order_status} onChange={formik.handleChange} />
            {formik.errors.order_status && <FormErrorMessage>{formik.errors.order_status}</FormErrorMessage>}
          </FormControl>
          <FormControl id="special_instructions" mb="4" isInvalid={!!formik.errors.special_instructions}>
            <FormLabel>Special Instructions</FormLabel>
            <Input
              type="text"
              name="special_instructions"
              value={formik.values.special_instructions}
              onChange={formik.handleChange}
            />
            {formik.errors.special_instructions && (
              <FormErrorMessage>{formik.errors.special_instructions}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="payment_method" mb="4" isInvalid={!!formik.errors.payment_method}>
            <FormLabel>Payment Method</FormLabel>
            <Input
              type="text"
              name="payment_method"
              value={formik.values.payment_method}
              onChange={formik.handleChange}
            />
            {formik.errors.payment_method && <FormErrorMessage>{formik.errors.payment_method}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UsersInterface>
            formik={formik}
            name={'customer_id'}
            label={'Customer'}
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

          <ArrayFormField
            values={formik.values.order_items}
            errors={formik.errors.order_items}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'quantity', label: 'quantity' },
              { fieldName: 'menu_item_id', label: 'menu_items' },
            ]}
            title={'Order Items'}
            name="order_items"
            rowInitialValues={{ quantity: 0, menu_item_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'quantity' && (
                  <FormControl id="quantity" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'menu_item_id' && (
                  <AsyncSelect<MenuItemsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Menu Items'}
                    fetcher={getMenuItems}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
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

export default OrdersCreatePage;
