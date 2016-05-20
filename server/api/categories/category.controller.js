'use strict';
import Category from './category.model';


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

/*creates new category */
export function create(req, res, next) {
  var newCategory = new Category(req.body);
  newCategory.active=true;
  newCategory.save()
    .then(function(category) {
    	res.json({ category:category,message:"created new user" });
      })
    .catch(validationError(res));
};

export function findAll(req, res) {
  return Category.find().exec()
    .then(category=> {
      res.json(category);
      })
    .catch(validationError(res));
};

export function getCategory(req, res) {
  return Category.findOne({_id:req.params.id}).exec()
    .then(category=> {
      res.json(category);
      })
    .catch(validationError(res));
};
// export function addNewSubCategory(req, res) {
//   return Category.findOne({_id:req.body._id}).exec()
//     .then(category=> {
//      category.subcategory.push(req.body.subcategory)
//      return category.save()
//           .then(result=> {
//             console.log(result)
//             res.json(result);
//           })
//           .catch(validationError(res));
//       })
//     .catch(validationError(res));
// };

export function updateDetails(req, res, next) {
  return Category.findOne({_id:req.body._id}).exec()
    .then(result=> {
     if (!result) {
        return res.status(401).end();
      }

      if(req.body.subcategory && req.body.status){
        result.subcategory.push(...req.body.subcategory)
      }else if(req.body.subcategory){
        result.subcategory=req.body.subcategory;
      } else {
        result.name=req.body.category;
      }
      return result.save()
      .then((category) => {
        res.json(category);
      })
      .catch(validationError(res));
    })
    .catch(err => {
      console.log(err)
      next(err)
    });
};

export function disable(req, res) {
  return Category.findById(req.params.id).exec()
    .then(category => {
      category.active = !category.active;
      return category.save()
      .then(() => {
        res.status(201).end();
      })
    })
    .catch(handleError(res));
}