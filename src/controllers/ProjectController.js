const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;

      const countObject = knex("projects").count();

      const query = knex("projects")
        .limit(5)
        .offset((page - 1) * 5);

      if (user_id) {
        query
          .where({ user_id })
          .join("user", "user.id", "=", "projects.user_id")
          .select("projects.*", "users.username");

        countObject.where({ user_id });
      }

      const [count] = await countObject;
      res.header("X-Total-Count", count["count"]);

      const results = await query;

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;

      await knex("projects").insert({
        title,
        user_id,
      });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
