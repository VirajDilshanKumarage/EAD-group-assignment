import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface FormData {
  customerId: string;
  orderdate: string;
  deliveryAddress: string;
  status: string;
  order_id: string;
  estimated_date: string;
  id?: string;
}

interface DeliveryData {
  customer_id: string;
  date: string;
  address: string;
  status: string;
  order_id: string;
  estimated_date: string;
  _id: string;
}

const schema = yup
  .object({
    customerId: yup.string().required('Customer id is a required'),
    orderdate: yup.string().required('Date is a required'),
    deliveryAddress: yup.string().required('Address is a required'),
    status: yup.string().required('Status is a required'),
    order_id: yup.string().required('Order id is a required'),
    estimated_date: yup.string().required('Estimated date is a required'),
  })
  .required()

const DeliveryDashboard = () => {
  const [delivery, setDelivery] = useState<any>([]);
  const [deliveryId, setDeliveryId] = useState<string>('');

  useEffect(() => {
    getDeliveryLists();
  }, []);

  const getDeliveryLists = async () => {
    try {
      const delivery = await fetch("http://localhost:8888/delivery");
      const { data } = await delivery.json();
      setDelivery(data)
    } catch (error) {
      console.log(error);
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      customerId: '',
      orderdate: '',
      deliveryAddress: '',
      status: '',
      order_id: '',
      estimated_date: '',
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: FormData) => {
    if (deliveryId === '') {
      try {
        const response = await fetch('http://localhost:8888/delivery/modify-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        alert('record created');
        getDeliveryLists();
        resetData();
      } catch (error) {
        console.log(error)
      }

      return;
    }

    try {
      const updateResponse = {
        customer_id: data.customerId,
        date: data.orderdate,
        address: data.deliveryAddress,
        status: data.status,
        order_id: data.order_id,
        estimated_date: data.estimated_date,
      }
      const response = await fetch(`http://localhost:8888/delivery/update/${data.order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updateResponse }),
      });
      resetData();
      setDeliveryId('');
      getDeliveryLists();
      alert('record updated');
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDelivery = async (order_id: string) => {
    try {
      const response = await fetch(`http://localhost:8888/delivery/${order_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      getDeliveryLists();
    } catch (error) {
      console.log(error);
    }
  }

  const resetData = () => {
    reset({
      customerId: '',
      orderdate: '',
      deliveryAddress: '',
      status: '',
      order_id: '',
      estimated_date: ''
    });
  }

  const updateDelivery = async (data: DeliveryData) => {
    setDeliveryId(data._id);
    const values: any = {
      customerId: data.customer_id,
      orderdate: new Date(data.date).toISOString().slice(0, 10),
      deliveryAddress: data.address,
      status: data.status,
      order_id: data.order_id,
      estimated_date: new Date(data.estimated_date).toISOString().slice(0, 10),
    }
    reset(values);
  }


  return (
    <div className='customer-details-page'>
      <h2>Delivery Dashboard</h2>

      <div className='back-ground2'>
        <div className='customer-details-container'>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Customer ID:</label>
            <input type="number" {...register("customerId")} />
            <p>{errors.customerId?.message}</p>
            <label>Date:</label>
            <input type="date" {...register("orderdate")} />
            <p>{errors.orderdate?.message}</p>

            <label>Address:</label>
            <input type="text" {...register("deliveryAddress")} />
            <p>{errors.deliveryAddress?.message}</p>

            <label>Status:</label>
            <select {...register("status")}>
              <option disabled selected>Select Status</option>
              <option value='In Progress'>In Progress</option>
              <option value='Delivered'>Delivered</option>
            </select>
            <p>{errors.status?.message}</p>

            <label>Order ID:</label>
            <input type="text" {...register("order_id")} />
            <p>{errors.order_id?.message}</p>

            <label>Estimated Date:</label>
            <input type="date" {...register("estimated_date")} />
            <p>{errors.estimated_date?.message}</p>

            <button type='submit'>Save</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Date</th>
                <th>Address</th>
                <th>Status</th>
                <th>Order ID</th>
                <th>Estimated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {delivery.map((value: any) => (
                <tr key={value._id}>
                  <td>{value.customer_id}</td>
                  <td>{value.date}</td>
                  <td>{value.address}</td>
                  <td>{value.status}</td>
                  <td>{value.order_id}</td>
                  <td>{value.estimated_date}</td>
                  <td>
                    <button style={{ backgroundColor: 'red' }} onClick={() => deleteDelivery(value.order_id)}>Delete</button>
                    <button style={{ marginLeft: '10px' }} onClick={() => updateDelivery(value)}>Edit</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;