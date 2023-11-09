import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { format } from 'path';
import axios from 'axios';

const schema = yup
  .object({
    customer_id: yup.string().required('Customer id is a required'),
    date: yup.string().required('Date is a required'),
    address: yup.string().required('Address is a required'),
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
      const delivery = await fetch("http://localhost:5000/delivery");
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
      customer_id: '',
      date: '',
      address: '',
      status: '',
      order_id: '',
      estimated_date: ''
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: any) => {
    if (deliveryId === '') {
      const response = await fetch('http://localhost:5000/delivery/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      alert('record created');
      return;
    }

    const updateResponse = {
      ...data,
      _id: deliveryId
    }

    const response = await fetch('http://localhost:5000/delivery/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: updateResponse }),
    });

    reset({
      customer_id: '',
      date: '',
      address: '',
      status: '',
      order_id: '',
      estimated_date: ''
    });
    setDeliveryId('');
    getDeliveryLists();
    alert('record updated');
  }

  const updateDelivery = async (data: any) => {
    setDeliveryId(data._id);
    const values: any = {
      customer_id: data.customer_id,
      date: new Date(data.date).toISOString().slice(0, 10),
      address: data.address,
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
            <input type="number" {...register("customer_id")} />
            <p>{errors.customer_id?.message}</p>
            <label>Date:</label>
            <input type="date" {...register("date")} />
            <p>{errors.date?.message}</p>

            <label>Address:</label>
            <input type="text" {...register("address")} />
            <p>{errors.address?.message}</p>

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
                    <button style={{ backgroundColor: 'red' }}>Delete</button>
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