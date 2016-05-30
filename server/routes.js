/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/files', require('./api/files'));
  app.use('/api/categories', require('./api/categories'));
  app.use('/api/items', require('./api/items'));
  app.use('/api/customer', require('./api/customers'));
  app.use('/api/item_review', require('./api/item_review'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
