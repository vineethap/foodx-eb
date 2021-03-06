'use strict';
import Orders from './orders.model';


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/*creates new orders */
export function create(req, res, next) {
  var newOrders = new Orders(req.body);
  var total=0;
  let items=req.body.items;
  for(let prop in items){
  	let price=items[prop].qty * items[prop].price;
     total += price;
  }
  newOrders.total_price=total;
  newOrders.status="pending";
  newOrders.time=Date.now();
  newOrders.save()
    .then(orders=>{
    	res.json({ orders:orders,message:"created new order" });
      })
    .catch(err => {
      console.log(err)

    });
};
export function findAll(req, res) {
  return Orders.find().exec()
    .then(orders=> {
      res.json(orders);
      })
    .catch(validationError(res));
};
export function findOrder(req, res) {
  return Orders.findOne({_id:req.params.id}).exec()
    .then(order=> {
      res.json(order);
      })
    .catch(validationError(res));
};
export function findUserOrders(req, res) {
  return Orders.find({userid:req.params.id}).exec()
    .then(orders=> {
      res.json(orders);
      })
    .catch(validationError(res));
};