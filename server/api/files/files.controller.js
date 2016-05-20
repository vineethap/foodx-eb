'use strict';
 import formidable from 'formidable';
 import path from 'path';
 import fs from 'fs';
 import User from '../user/user.model';
 import config from '../../config/environment'

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
export function fileupload(req, res,next) {
    var form = new formidable.IncomingForm();
    var  userId=req.headers.id;
    form.parse(req, function(err, fields, files) {
      var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_name = path.join(config.root, 'client/assets/images/uploads/', req.headers.id + '.profile'+'.'+ file_ext),
        new_path = path.join(config.root, 'client/assets/images/uploads/', file_name + '.' + file_ext);
       
      fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
          fs.unlink(old_path, function(err) {
            if (err) {
              console.log(err, '@@@@@@@ERROR@@@@@@@');
              return res.status(500).json({'success': false});
            } 
            fs.renameSync(new_path, new_name);
            return User.findById(userId).exec()
            .then(user => {
              if (!user) {
                return res.status(401).end();
              }else{
                user.profile_img='/assets/images/uploads/'+ req.headers.id + '.profile'+'.'+ file_ext;
                return user.save()
                .then((user) => {
                  res.json(user)
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
