import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Checkout = () => {
  const service = useLoaderData();
  const { title, _id,price ,img} = service;
  const {user}= useContext(AuthContext);

  const handleCheckout = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const order = {
        customerName: name,
        email,
        date,
        img,
        service: title,
        service_id: _id,
        price: price
    }
    console.log(order);
    fetch('https://car-doctor-server-swart-seven.vercel.app/bookings',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res=> res.json())
    .then(data=>{
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: 'Success',
                text: 'Added successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }
    })

  }
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Book service: {title}</h1>
      
            <div className="card-body">
              <form onSubmit={handleCheckout}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  name="name"
                  defaultValue={user?.displayName}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  placeholder="email"
                  name="date"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  defaultValue={user?.email}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Due Amount</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name="dueAmount"
                  defaultValue={'$' + price}
                  className="input input-bordered"
                />
              </div>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Order Confirm" />
              </div>
              </form>
            </div>
          </div>
       
  );
};

export default Checkout;
