'use strict' 
import Item from './items.model';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import config from '../../config/environment';
import multiparty from 'multiparty';
import _ from 'lodash';
import  shortid from 'shortid';

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
var readAndWriteFile = (file, fields, counter,item_image) => {
  return new Promise (function (resolve, reject) {
    var ext = path.extname(file.path),
    old_path = file.path,
    index = old_path.lastIndexOf('/') + 1,
    uid=shortid.generate(),
    file_name = old_path.substr(index),
    new_name = path.join(config.root, 'client/assets/images/uploads/'+ fields.name.toString() + '_' + fields.chef_id.toString() + '_' + uid + ext),
    new_path = path.join(config.root, 'client/assets/images/uploads/', file_name );
    let img_path= '/assets/images/uploads/'+ fields.name.toString() + '_' + fields.chef_id.toString() + '_' + uid + ext;
   
    fs.readFile(old_path, function(err, data) {
      if (err){
         return reject(err);
      }
      fs.writeFile(new_path, data, function(err) {
        if (err) {
          return reject(err);
          
        }
          fs.rename(new_path, new_name, function (err) {
            if (err) {
              return reject(err);
            }
            return resolve(img_path);
          });
      });
    });
  })
}
export function create(req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({success: false})
    }
    var counter = 0;
    Promise.all(
      _.map(files, function (file) {
        counter++;
        return readAndWriteFile(file[0], fields, counter);
      })
    )
    .then(function (names) {
      var items=new Item({
      itemname: fields.name.toString(),
      description:fields.description.toString(),
      category:fields.category.toString(),
      itemtype:fields.itemtype.toString(),
      chef_id:fields.chef_id.toString(),
      subcategory:fields.subcategory.toString(),
      item_price:fields.item_price.toString(),
      item_image:names,
      active:true
      });
        return items.save()
          .then((item) => {            
            res.json(item)
          })
          .catch(validationError(res));
    }).catch(function (err) {
      console.log(err)
      return res.json({success: false})
    });
  });
}



export function find(req, res, next) {
  var chef_id = req.query.chef_id;
  return Item.find({chef_id:chef_id}).exec()
    .then(items => {
      if (!items) {
        return res.status(404).end();
      }
      res.json(items);
    })
    .catch(err => next(err));
}

export function disable(req, res) {
  return Item.findById(req.params.id).exec()
    .then(item => {
      item.active = !item.active;
      return item.save()
      .then(() => {
        res.status(201).end();
      })
    })
    .catch(handleError(res));
}
export function getOne(req, res) {
  return Item.findById(req.params.id).exec()
    .then(item => {
        res.json(item);
    })
    .catch(handleError(res));
}

export function updateDetails(req, res, next) {
  var itemId = req.body._id;
  if(req.body.featured){
    return Item.findById(itemId).exec()
      .then(item => {// don't ever give out the password or salt
        if (!item) {
          return res.status(401).end();
        }else{
          item.featured=req.body.featured;
          item.featured_dscrptn=req.body.featured_dscrptn;
          return item.save()
            .then(result => {
              res.json(result);
            })
            .catch(validationError(res));
        }
      }).catch(err => next(err));
  }else{
    let images=req.headers.item_image;
    var item_image = images.split(",")
    var form = new multiparty.Form();
      form.parse(req, function(err, fields, files) {

        let itemId=fields.id.toString();
        if (err) {
          console.log(err)
          return res.json({success: false})
        }
        var counter = 0;
        Promise.all(

          _.map(files, function (file) {
             for(let img of item_image){
            counter++;
            return readAndWriteFile(file[0], fields, counter,img);
          }
          })
        )
      .then(function (names) {  
        return Item.findById(itemId).exec()
          .then(item => {// don't ever give out the password or salt
            if (!item) {
              return res.status(401).end();
            }else{
              let all_item_img=names.push(...item_image);
              item.itemname=fields.name.toString();
              item.description=fields.description.toString();
              item.category=fields.category.toString();
              item.itemtype=fields.itemtype.toString(); 
              item.subcategory=fields.subcategory.toString();
              item.item_price=fields.item_price.toString();
              item.item_image=names           
              return item.save()
                .then(result => {
                  res.json(result);
                })
                .catch(validationError(res));
            }
          })
          .catch(err => next(err));
      })
    })
  }
  
    
}

export function getFeatured(req, res) {
  return Item.find({featured:'yes'}).exec()
    .then(item => {
      res.json(item)
      })
    .catch(handleError(res));
}
export function updateFeatured(req, res, next) {
  var itemId = req.body._id;
    return Item.findById(itemId).exec()
      .then(item => {
        if (!item) {
          return res.status(401).end();
        }else{
          if(req.body.comment){
            item.rating=req.body.rating;
            item.comment_title=req.body.comment_title;
            item.comment=req.body.comment
          }else{

          item.featured='no';
          item.featured_dscrptn='';
          }
          return item.save()
            .then(result => {
              res.json(result);
            })
            .catch(validationError(res));
        }
      }).catch(err => next(err));
    }
  export function featured(req, res, next) {
    var form = new formidable.IncomingForm();
    var itemId=req.headers.id;
    let name=req.headers.name;
    form.parse(req, function(err, fields, files) {
      var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_name = path.join(config.root, 'client/assets/images/uploads/',  name+ '.thumbnail'+'.'+ file_ext),
        new_path = path.join(config.root, 'client/assets/images/uploads/', file_name + '.' + file_ext);
       
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log(err, '@@@@@@@ERROR@@@@@@@');
              return res.status(500).json({'success': false});
            } 
            fs.renameSync(new_path, new_name);
            return Item.findById(itemId).exec()
            .then(item => {
              if (!item) {
                return res.status(401).end();
              }else{
                item.featured='yes';
                item.featured_dscrptn=req.headers.data;
                item.thumb_img='/assets/images/uploads/'+ name + '.thumbnail'+'.'+ file_ext;
                return item.save()
                .then((item) => {
                  res.json(item)
                })
                .catch(validationError(res));
                }
              })
              .catch(err => next(err));
            });
          });
      });
    });

    }