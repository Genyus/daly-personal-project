const { ObjectId } = require('mongodb');
// ! DO NOT DELETE THE COMMENT BLOCK BELOW
/**
 * @param {import('express').Express} app - The Express instance
 * @param {import('mongodb').Db} db - The Db instance.
 */
const profilesRoutes = (app, db) => {
  /**
   * Retrieves the profiles collection from Mongo db
   * @returns Collection<Document>
   */
  const profilesCollection = () => db.collection("profiles");

  /**
   * Middleware handler for GET requests to /api/profile path
   */
  app.get(`/api/profile`, async (req, res) => {
    // Waits for asynchronous `find()` operation to complete and converts results to array
    const profiles = await profilesCollection().find({}).toArray();

    return res.status(200).send(profiles);
  });

  /**
   * Middleware handler for POST requests to /api/profile path
   */
  app.post(`/api/profile`, async (req, res) => {
    const profile = await profilesCollection().insertOne(req.body);

    return res.status(201).send({
      error: false,
      profile,
    });
  });

  /**
   * Middleware handler for PUT requests to /api/profile/:id path
   */
  app.put(`/api/profile/:id`, async (req, res) => {
    // Captures target id from URL
    const { id } = req.params;
    // Builds query matching `_id` field value matching captured id. `ObjectId()` is needed to convert string value to correct type
    const query = { _id: new ObjectId(id) };
    const profile = await profilesCollection().replaceOne(query, req.body);

    return res.status(202).send({
      error: false,
      profile,
    });
  });

  /**
   * Middleware handler for DELETE requests to /api/profile/:id path
   */
  app.delete(`/api/profile/:id`, async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const profile = await profilesCollection().deleteOne(query);

    return res.status(202).send({
      error: false,
      profile,
    });
  });
};

module.exports = profilesRoutes;
