import db from '../../db.json';

export default function dbHandler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json([{
      'error': 'Não permitido'
    }]);
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');

  response.json(db);
}
