import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getOrderItems } from 'apiSdk/order-items';
import { OrderItemsInterface } from 'interfaces/order-items';
import { Error } from 'components/error';

function OrderItemsListPage() {
  const { data, error, isLoading } = useSWR<OrderItemsInterface[]>(
    () => '/order-items',
    () =>
      getOrderItems({
        relations: ['orders', 'menu_items'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Order Items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Quantity</Th>
                  <Th>Order</Th>
                  <Th>Menu Item</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.quantity}</Td>
                    <Td>{record.orders?.id}</Td>
                    <Td>{record.menu_items?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default OrderItemsListPage;
